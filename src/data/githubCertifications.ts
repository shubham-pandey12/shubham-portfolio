import type { Recognition } from "./recognition";

const repositoryApiUrl =
  "https://api.github.com/repos/shubham-pandey12/certificates/contents/certificates.json?ref=main";
const repositoryBlobUrl = "https://github.com/shubham-pandey12/certificates/blob/main/";
const repositoryRawUrl = "https://raw.githubusercontent.com/shubham-pandey12/certificates/main/";
const cacheKey = "portfolio-github-certifications-v1";
const cacheDurationMs = 15 * 60 * 1000;

type GitHubFile = { download_url: string | null };
type CertificateManifestEntry = {
  title: string;
  issuer: string;
  issuedAt: string;
  description?: string;
  credentialId?: string;
  credentialUrl?: string;
  pdfPath?: string;
  imagePath?: string;
};
type CachedCertifications = { savedAt: number; certifications: Recognition[] };

function readCache(): CachedCertifications | undefined {
  try {
    const cached = localStorage.getItem(cacheKey);
    if (!cached) return undefined;
    const value = JSON.parse(cached) as CachedCertifications;
    return Array.isArray(value.certifications) && typeof value.savedAt === "number"
      ? value
      : undefined;
  } catch {
    return undefined;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isManifestEntry(value: unknown): value is CertificateManifestEntry {
  const optionalStringFields = [
    "description",
    "credentialId",
    "credentialUrl",
    "pdfPath",
    "imagePath",
  ];
  return (
    isRecord(value) &&
    typeof value.title === "string" &&
    value.title.trim().length > 0 &&
    typeof value.issuer === "string" &&
    typeof value.issuedAt === "string" &&
    optionalStringFields.every(
      (field) => value[field] === undefined || typeof value[field] === "string",
    )
  );
}

function githubFileUrl(base: string, path?: string): string | undefined {
  if (!path?.trim()) return undefined;
  const segments = path.replace(/^\/+/, "").split("/");
  if (segments.some((segment) => !segment || segment === "." || segment === "..")) return undefined;
  return `${base}${segments.map(encodeURIComponent).join("/")}`;
}

function safeCredentialUrl(value?: string): string | undefined {
  if (!value?.trim()) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function mapCertification(entry: CertificateManifestEntry): Recognition {
  return {
    title: entry.title.trim(),
    organization: entry.issuer.trim() || "Certificate",
    date: entry.issuedAt.trim(),
    description: entry.description?.trim() || "Professional certificate.",
    type: "Certificate",
    id: entry.credentialId?.trim() || undefined,
    verifyUrl: safeCredentialUrl(entry.credentialUrl),
    pdfUrl: githubFileUrl(repositoryBlobUrl, entry.pdfPath),
    imageUrl: githubFileUrl(repositoryRawUrl, entry.imagePath),
  };
}

export async function fetchPortfolioCertifications(
  fallback: Recognition[],
): Promise<Recognition[]> {
  const cached = readCache();
  if (cached && Date.now() - cached.savedAt < cacheDurationMs) return cached.certifications;

  try {
    const manifestResponse = await fetch(repositoryApiUrl, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!manifestResponse.ok)
      throw new Error(`Certificates repository returned ${manifestResponse.status}`);
    const manifestFile = (await manifestResponse.json()) as GitHubFile;
    if (!manifestFile.download_url) throw new Error("Certificate manifest has no download URL");

    const response = await fetch(manifestFile.download_url);
    if (!response.ok) throw new Error(`Certificate manifest returned ${response.status}`);
    const data: unknown = await response.json();
    if (!Array.isArray(data)) throw new Error("Certificate manifest must be a JSON array");

    const certifications = data.filter(isManifestEntry).map(mapCertification);
    if (certifications.length === 0 && data.length > 0) {
      throw new Error("Certificate manifest contains no valid entries");
    }

    try {
      localStorage.setItem(cacheKey, JSON.stringify({ savedAt: Date.now(), certifications }));
    } catch {
      // Continue without browser caching when storage is unavailable.
    }
    return certifications;
  } catch {
    return cached?.certifications || fallback;
  }
}
