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
export const articles = recognitionData.articles;
