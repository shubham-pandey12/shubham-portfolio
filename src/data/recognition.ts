import recognitionData from "./recognition.json";

export type Recognition = {
  title: string;
  organization: string;
  date: string;
  description: string;
  type: string;
  id?: string;
  verifyUrl?: string;
};
export const awards = recognitionData.awards as Recognition[];
export const certifications = recognitionData.certifications as Recognition[];
export type PortfolioArticle = {
  title: string;
  date: string;
  category: string;
  description: string;
  url: string;
  image?: string;
};
export const articles = recognitionData.articles as PortfolioArticle[];
