const cacheDurationMs = 15 * 60 * 1000;
const cache = new Map<string, { savedAt: number; content: string; rawUrl: string }>();

type GitHubReadme = {
  content?: string;
  encoding?: string;
  download_url?: string | null;
};

function decodeBase64Utf8(value: string): string {
  const binary = atob(value.replace(/\s/g, ""));
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function repositoryFromUrl(value: string): { owner: string; repository: string } | undefined {
  try {
    const url = new URL(value);
    if (url.hostname !== "github.com") return undefined;
    const [owner, repository] = url.pathname.split("/").filter(Boolean);
    if (!owner || !repository) return undefined;
    return { owner, repository: repository.replace(/\.git$/i, "") };
  } catch {
    return undefined;
  }
}

export async function fetchGitHubReadme(
  repositoryUrl: string,
): Promise<{ content: string; rawUrl: string } | undefined> {
  const repository = repositoryFromUrl(repositoryUrl);
  if (!repository) return undefined;

  const key = `${repository.owner}/${repository.repository}`.toLowerCase();
  const cached = cache.get(key);
  if (cached && Date.now() - cached.savedAt < cacheDurationMs) {
    return { content: cached.content, rawUrl: cached.rawUrl };
  }

  const apiUrl = `https://api.github.com/repos/${encodeURIComponent(repository.owner)}/${encodeURIComponent(repository.repository)}/readme`;
  const response = await fetch(apiUrl, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!response.ok) throw new Error(`GitHub README request returned ${response.status}`);

  const readme = (await response.json()) as GitHubReadme;
  if (readme.encoding !== "base64" || !readme.content || !readme.download_url) return undefined;

  const result = {
    content: decodeBase64Utf8(readme.content),
    rawUrl: readme.download_url,
  };
  cache.set(key, { ...result, savedAt: Date.now() });
  return result;
}
