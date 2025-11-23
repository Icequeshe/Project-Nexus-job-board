export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  experience: "Entry-Level" | "Mid-Level" | "Senior";
  description: string;
}
