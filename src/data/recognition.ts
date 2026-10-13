export const awards = [
  {
    title: "PLACEHOLDER AWARD TITLE",
    organization: "YOUR ORGANIZATION",
    date: "YOUR AWARD DATE",
    description: "PLACEHOLDER: Replace with a verified award description.",
    type: "Award",
  },
  {
    title: "PLACEHOLDER COMMUNITY RECOGNITION",
    organization: "YOUR ORGANIZATION",
    date: "YOUR AWARD DATE",
    description: "PLACEHOLDER: Replace with a verified community or professional recognition.",
    type: "Award",
  },
];
export const certifications = Array.from({ length: 8 }, (_, i) => ({
  title: `PLACEHOLDER CERTIFICATION ${String(i + 1).padStart(2, "0")}`,
  organization: "YOUR CERTIFYING ORGANIZATION",
  date: "YOUR CERTIFICATION DATE",
  id: "YOUR_CREDENTIAL_ID",
  description: "PLACEHOLDER: Add a verified certification description.",
  type: "Certification",
}));
export const articles = Array.from({ length: 15 }, (_, i) => ({
  title: `PLACEHOLDER ARTICLE ${String(i + 1).padStart(2, "0")}`,
  date: "YOUR ARTICLE DATE",
  category: "Technical Writing",
  description: "PLACEHOLDER: Add a published article title and summary.",
  url: "YOUR_ARTICLE_URL",
}));
