import { useEffect, useState, type ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { DetailPanel } from "../../components/PortfolioUI";
import { fetchGitHubReadme } from "../../data/githubReadme";

type ReadmeData = { content: string; rawUrl: string };
type ReadmeBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; text: string; language?: string }
  | { type: "image"; src: string; alt: string };

function safeUrl(value: string, baseUrl: string): string | undefined {
  try {
    const url = new URL(value, baseUrl);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function parseReadme(content: string, baseUrl: string): ReadmeBlock[] {
  const lines = content.replace(/\r/g, "").split("\n");
  const blocks: ReadmeBlock[] = [];
  let index = 0;
  let skippedMainTitle = false;

  while (index < lines.length) {
    let line = lines[index].trim();
    if (!line || /^---+$/.test(line) || /^<!--/.test(line)) {
      index += 1;
      continue;
    }

    const htmlImages = [...line.matchAll(/<img\b[^>]*>/gi)];
    if (htmlImages.length) {
      htmlImages.forEach(([tag]) => {
        const source = tag.match(/\bsrc=["']([^"']+)["']/i)?.[1];
        const alt = tag.match(/\balt=["']([^"']*)["']/i)?.[1] || "Project image";
        const src = source && safeUrl(source, baseUrl);
        if (src && !/shields\.io|badge/i.test(src)) blocks.push({ type: "image", src, alt });
      });
      line = line.replace(/<img\b[^>]*>/gi, "").trim();
      if (!line.replace(/<\/?(?:div|p|br|details|summary)[^>]*>/gi, "").trim()) {
        index += 1;
        continue;
      }
    }

    const fence = line.match(/^```\s*([\w+-]*)/);
    if (fence) {
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !/^\s*```/.test(lines[index])) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push({ type: "code", text: code.join("\n"), language: fence[1] });
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*$/);
    if (heading) {
      index += 1;
      if (heading[1].length === 1 && !skippedMainTitle) {
        skippedMainTitle = true;
        continue;
      }
      blocks.push({ type: "heading", level: Math.min(heading[1].length, 4), text: heading[2] });
      continue;
    }

    const imageOnly = line.match(/^!\[([^\]]*)\]\(([^)]+)\)(?:\s*"[^"]*")?$/);
    if (imageOnly) {
      const source = imageOnly[2];
      const alt = imageOnly[1] || "Project image";
      const src = safeUrl(source, baseUrl);
      if (src && !/shields\.io|badge/i.test(src)) blocks.push({ type: "image", src, alt });
      index += 1;
      continue;
    }

    if (/^\s*[-*+]\s+/.test(line) || /^\s*\d+[.)]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\s*(?:[-*+]|\d+[.)])\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*(?:[-*+]|\d+[.)])\s+/, "").trim());
        index += 1;
      }
      blocks.push({ type: "list", items });
      continue;
    }

    const paragraph = [line];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(#{1,6})\s|^```|^\s*(?:[-*+]|\d+[.)])\s+|^!\[|^<img\b|^---+$/.test(lines[index].trim())
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    const text = paragraph
      .join(" ")
      .replace(/<\/?(?:div|p|br|details|summary)[^>]*>/gi, "")
      .trim();
    const inlineImages = [...text.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)];
    const paragraphText = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "").trim();
    if (paragraphText && !/^<img\b/i.test(paragraphText)) {
      blocks.push({ type: "paragraph", text: paragraphText });
    }
    inlineImages.forEach((match) => {
      const src = safeUrl(match[2], baseUrl);
      if (src && !/shields\.io|badge/i.test(src)) {
        blocks.push({ type: "image", src, alt: match[1] || "Project image" });
      }
    });
  }
  return blocks;
}

function renderInline(text: string, baseUrl: string): ReactNode[] {
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    if (match[1]) {
      const href = safeUrl(match[2], baseUrl);
      parts.push(
        href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" key={key++}>
            {match[1]}
          </a>
        ) : (
          match[1]
        ),
      );
    } else if (match[3]) parts.push(<code key={key++}>{match[3]}</code>);
    else if (match[4]) parts.push(<strong key={key++}>{match[4]}</strong>);
    else if (match[5]) parts.push(<em key={key++}>{match[5]}</em>);
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

function ReadmeContent({ data, sourceUrl }: { data: ReadmeData; sourceUrl: string }) {
  const blocks = parseReadme(data.content, data.rawUrl);
  return (
    <div className="github-readme-content">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const Heading = `h${block.level}` as keyof JSX.IntrinsicElements;
          return <Heading key={index}>{renderInline(block.text, data.rawUrl)}</Heading>;
        }
        if (block.type === "paragraph") {
          return <p key={index}>{renderInline(block.text, data.rawUrl)}</p>;
        }
        if (block.type === "list") {
          return (
            <ul key={index}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{renderInline(item, data.rawUrl)}</li>
              ))}
            </ul>
          );
        }
        if (block.type === "code") {
          return (
            <pre key={index}>
              <code>{block.text}</code>
            </pre>
          );
        }
        return (
          <a
            className="github-readme-image-link"
            href={block.src}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
          >
            <img src={block.src} alt={block.alt} loading="lazy" decoding="async" />
          </a>
        );
      })}
      <a
        className="github-readme-source"
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        View README on GitHub <ExternalLink size={14} />
      </a>
    </div>
  );
}

export function GitHubReadme({ repositoryUrl }: { repositoryUrl?: string }) {
  const [data, setData] = useState<ReadmeData>();
  useEffect(() => {
    let cancelled = false;
    setData(undefined);
    if (!repositoryUrl) return;
    void fetchGitHubReadme(repositoryUrl)
      .then((readme) => {
        if (!cancelled && readme) setData(readme);
      })
      .catch(() => {
        // Curated project details remain available when GitHub cannot be reached.
      });
    return () => {
      cancelled = true;
    };
  }, [repositoryUrl]);

  if (!data) return null;
  return (
    <DetailPanel title="Repository README">
      <ReadmeContent
        data={data}
        sourceUrl={repositoryUrl ? `${repositoryUrl}#readme` : data.rawUrl}
      />
    </DetailPanel>
  );
}
