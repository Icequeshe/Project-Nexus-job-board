import axios from "axios";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Job } from "../types/job";

interface JobContextType {
  jobs: Job[];
  loading: boolean;
  error: string | null;
}

const JobContext = createContext<JobContextType>({
  jobs: [],
  loading: false,
  error: null,
});

export const JobProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_JSEARCH_URL;
  const API_KEY = import.meta.env.VITE_RAPID_API_KEY;
  const API_HOST = import.meta.env.VITE_RAPID_API_HOST;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(API_URL, {
          params: { query: "software developer", num_pages: 1, country: "us", date_posted: "all" },
          headers: {
            "x-rapidapi-key": API_KEY,
            "x-rapidapi-host": API_HOST,
          },
        });

        const jobsList = data.data;

        const formattedJobs: Job[] = jobsList.map((job: any) => ({
          id: job.job_id,
          title: job.job_title,
          company: job.employer_name,
          location: job.job_city || job.job_country,
          experienceLevel: job.job_required_experience?.experience_level || "N/A",
        }));

        setJobs(formattedJobs);
      } catch (err: any) {
        setError(err.message || "Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [API_URL, API_KEY, API_HOST]);

  return <JobContext.Provider value={{ jobs, loading, error }}>{children}</JobContext.Provider>;
};

export const useJobs = () => useContext(JobContext);
