import { createContext, useContext, useState, ReactNode } from "react";
import type { Job } from '../types/job';
interface JobContextType {
  jobs: Job[];
  setJobs: (jobs: Job[]) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <JobContext.Provider value={{ jobs, setJobs, loading, setLoading }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobContext must be used within JobProvider");
  }
  return context;
};
