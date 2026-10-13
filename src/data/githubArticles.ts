import type { PortfolioArticle } from "./recognition";

const repositoryApiUrl = "https://api.github.com/repos/shubham-pandey12/Articles/contents";
const repositoryPagesApiUrl = "https://api.github.com/repos/shubham-pandey12/Articles/pages";
const repositoryUrl = "https://github.com/shubham-pandey12/Articles";
const publishedSiteUrl = "https://shubham-pandey12.github.io/Articles/";
const cacheKey = "portfolio-github-articles-v4";
const cacheDurationMs = 15 * 60 * 1000;

type GitHubFile = {
  name: string;
  path: string;
  type: "file" | "dir";
  download_url: string | null;
};

type CachedArticles = { savedAt: number; articles: PortfolioArticle[] };
type GitHubPages = { html_url: string };

function readCache(): CachedArticles | undefined {
  try {
    const cached = localStorage.getItem(cacheKey);
    if (!cached) return undefined;
    const value = JSON.parse(cached) as CachedArticles;
    return Date.now() - value.savedAt < cacheDurationMs ? value : undefined;
  } catch {
    return undefined;
  }
}

function cleanMarkdown(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]*>/g, " ")
    .replace(/[*_`>#~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractMetadata(text: string, key: string): string | undefined {
  const match = text.match(
    new RegExp(`^\\s*(?:\\*\\*)?(?:${key})(?:\\*\\*)?:\\s*(.+?)\\s*$`, "im"),
  );
  return match?.[1]?.trim();
}

function extractDescription(text: string): string {
  const intro = text.match(/^#{1,3}\s*Introduction\s*$([\s\S]*?)(?=^#{1,3}\s|\s*$)/im)?.[1];
  const paragraphs = (intro || text)
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(
      (part) => part && !/^#|^\*\*(?:Category|Reading time|Tags|Date|Published):/i.test(part),
    );
  const summary = cleanMarkdown(paragraphs[0] || "Read this article on GitHub.");
  return summary.length > 240 ? `${summary.slice(0, 237).trimEnd()}…` : summary;
}

function parseMarkdownArticle(file: GitHubFile, markdown: string): PortfolioArticle {
  const title = markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() || file.name.replace(/\.md$/i, "");
  const category = extractMetadata(markdown, "Category") || "Article";
  const date = extractMetadata(markdown, "Published|Date") || "Published on GitHub";

  return {
    title,
    date,
    category,
    description: extractDescription(markdown),
    url: `${repositoryUrl}/blob/main/${file.path.split("/").map(encodeURIComponent).join("/")}`,
  };
}

function parseHtmlArticle(file: GitHubFile, html: string, pagesUrl: string): PortfolioArticle {
  const document = new DOMParser().parseFromString(html, "text/html");
  const title =
    document.querySelector("h1")?.textContent?.trim() ||
    document.querySelector("title")?.textContent?.trim() ||
    file.name.replace(/\.html?$/i, "");
  const description =
    document.querySelector('meta[name="description"]')?.getAttribute("content")?.trim() ||
    document.querySelector("main p, article p, p")?.textContent?.trim() ||
    "Read this article on the published site.";
  const category =
    document
      .querySelector('meta[name="article:section"], meta[name="category"]')
      ?.getAttribute("content")
      ?.trim() || "Article";
  const date =
    document.querySelector('meta[property="article:published_time"]')?.getAttribute("content") ||
    document.querySelector("time[datetime]")?.getAttribute("datetime") ||
    "Published on GitHub Pages";
  const baseUrl = pagesUrl.endsWith("/") ? pagesUrl : `${pagesUrl}/`;
  const articlePath = file.path.split("/").map(encodeURIComponent).join("/");

  return {
    title,
    date,
    category,
    description: description.length > 240 ? `${description.slice(0, 237).trimEnd()}…` : description,
    url: new URL(articlePath, baseUrl).toString(),
  };
}

function isMarkdownArticleFile(file: GitHubFile): boolean {
  if (file.type !== "file" || !file.download_url) return false;
  const name = file.name.toLowerCase();
  if (name === "readme.md" || name === "readme" || name === "articles.json") return false;
  return name.endsWith(".md") || !name.includes(".");
}

function isHtmlArticleFile(file: GitHubFile): boolean {
  return (
    file.type === "file" &&
    Boolean(file.download_url) &&
    file.name.toLowerCase() !== "index.html" &&
    /\.html?$/i.test(file.name)
  );
}

function isPortfolioArticle(value: unknown): value is PortfolioArticle {
  if (!value || typeof value !== "object") return false;
  const article = value as Partial<PortfolioArticle>;
  return (
    typeof article.title === "string" &&
    typeof article.date === "string" &&
    typeof article.category === "string" &&
    typeof article.description === "string" &&
    typeof article.url === "string" &&
    (article.image === undefined || typeof article.image === "string")
  );
}

function deduplicateArticles(articles: PortfolioArticle[]): PortfolioArticle[] {
  const byTitle = new Map<string, PortfolioArticle>();
  for (const article of articles) {
    const key = article.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "")
      .trim();
    const current = byTitle.get(key);
    if (!current || (article.url.includes("github.io") && !current.url.includes("github.io"))) {
      byTitle.set(key, article);
    }
  }
  return [...byTitle.values()];
}

export async function fetchPortfolioArticles(
  fallback: PortfolioArticle[],
): Promise<PortfolioArticle[]> {
  const cached = readCache();
  if (cached) return cached.articles;

  try {
    const response = await fetch(`${repositoryApiUrl}?ref=main`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!response.ok) throw new Error(`Articles repository returned ${response.status}`);
    const files = (await response.json()) as GitHubFile[];
    const pagesResponse = await fetch(repositoryPagesApiUrl, {
      headers: { Accept: "application/vnd.github+json" },
    });
    const pages = pagesResponse.ok ? ((await pagesResponse.json()) as GitHubPages) : undefined;
    const pagesUrl = pages?.html_url || publishedSiteUrl;
    const articlesFile = files.find(
      (file) => file.type === "file" && file.name === "articles.json",
    );
    let articles: PortfolioArticle[] = [];

    if (articlesFile?.download_url) {
      const manifestResponse = await fetch(articlesFile.download_url);
      if (manifestResponse.ok) {
        const data: unknown = await manifestResponse.json();
        if (Array.isArray(data) && data.every(isPortfolioArticle)) articles = data;
      }
    }

    const markdownFiles = files.filter(isMarkdownArticleFile);
    const markdownArticles = await Promise.all(
      markdownFiles.map(async (file) => {
        const markdownResponse = await fetch(file.download_url as string);
        if (!markdownResponse.ok) return undefined;
        return parseMarkdownArticle(file, await markdownResponse.text());
      }),
    );
    articles = [...articles, ...markdownArticles.filter((article) => article !== undefined)];

    const htmlFiles = files.filter(isHtmlArticleFile);
    const htmlArticles = await Promise.all(
      htmlFiles.map(async (file) => {
        const htmlResponse = await fetch(file.download_url as string);
        if (!htmlResponse.ok) return undefined;
        return parseHtmlArticle(file, await htmlResponse.text(), pagesUrl);
      }),
    );
    articles = [...articles, ...htmlArticles.filter((article) => article !== undefined)];
    const uniqueArticles = deduplicateArticles(articles);
    try {
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ savedAt: Date.now(), articles: uniqueArticles }),
      );
    } catch {
      // Continue without browser caching when storage is unavailable.
    }
    return uniqueArticles;
  } catch {
    return fallback;
  }
}
