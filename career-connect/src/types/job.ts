export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  
  category: string;
  experienceLevel: string;
  
  description?: string;
  salary_min?: number;
  salary_max?: number;
  salary_currency?: string;
  posted_at?: string;
  job_url?: string;
}