import axios from "axios";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Job } from "../types/job";

interface JobContextType {
  jobs: Job[]; 
  loading: boolean;
  error: string | null;
  filterText: string;
  setFilterText: (text: string) => void;
}

const JobContext = createContext<JobContextType>({
  jobs: [],
  loading: false,
  error: null,
  filterText: "",
  setFilterText: () => {}, 
});

export const JobProvider = ({ children }: { children: ReactNode }) => {
  const [allJobs, setAllJobs] = useState<Job[]>([]); 
  const [filterText, setFilterText] = useState(""); 
  
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

        setAllJobs(formattedJobs);
        setError(null); 

      } catch (err: any) {
        setError(err.message || "Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [API_URL, API_KEY, API_HOST]);

  const jobs = allJobs.filter((job) => {
    const lowerCaseFilter = filterText.toLowerCase();
    return job.title.toLowerCase().includes(lowerCaseFilter);
  });

  return (
    <JobContext.Provider 
      value={{ 
        jobs, 
        loading, 
        error,
        filterText, 
        setFilterText 
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => useContext(JobContext);