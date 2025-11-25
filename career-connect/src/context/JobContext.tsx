import axios from "axios";
import { createContext, useContext, useEffect, useState, ReactNode, useMemo } from "react";
import type { Job } from "../types/job";

interface JobContextType {
    filteredJobs: Job[];
    loading: boolean;
    error: string | null;

    filterText: string;
    setFilterText: (text: string) => void;

    categoryFilter: string;
    locationFilter: string;
    experienceFilter: string;

    setCategoryFilter: (text: string) => void;
    setLocationFilter: (text: string) => void;
    setExperienceFilter: (text: string) => void;
}

const JobContext = createContext<JobContextType>({
    filteredJobs: [],
    loading: false,
    error: null,
    
    filterText: "",
    setFilterText: () => {}, 
    
    categoryFilter: "",
    locationFilter: "",
    experienceFilter: "",
    
    setCategoryFilter: () => {},
    setLocationFilter: () => {},
    setExperienceFilter: () => {},
});

export const JobProvider = ({ children }: { children: ReactNode }) => {
    const [allJobs, setAllJobs] = useState<Job[]>([]); 
    
    const [filterText, setFilterText] = useState(""); 
    const [categoryFilter, setCategoryFilter] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const [experienceFilter, setExperienceFilter] = useState("");
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const API_URL = import.meta.env.VITE_JSEARCH_URL;
    const API_KEY = import.meta.env.VITE_RAPID_API_KEY;
    const API_HOST = import.meta.env.VITE_RAPID_API_HOST;

    useEffect(() => {
        const fetchJobs = async () => {
            const queryTerm = [
                filterText,
                categoryFilter,
                experienceFilter,
            ].filter(Boolean).join(' ') || "developer jobs";
            
            const locationTerm = locationFilter || "us";
            
            try {
                setLoading(true);

                const { data } = await axios.get(API_URL, {
                    params: { 
                        query: queryTerm,
                        num_pages: 5, 
                        country: locationTerm,
                        date_posted: "all" 
                    },
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
                    location: [job.job_city, job.job_state, job.job_country].filter(Boolean).join(', '),
                    category: job.job_title?.split(' ')[0] || "General",
                    experienceLevel: job.job_required_experience?.experience_level?.replace(/_/g, ' ') || "Entry-Level",
                    description: job.job_description,
                    salary_min: job.salary_min,
                    salary_max: job.salary_max,
                    salary_currency: job.salary_currency,
                    posted_at: job.job_posted_date,
                    job_url: job.job_apply_link,
                }));

                setAllJobs(formattedJobs);
                setError(null); 

            } catch (err: any) {
                console.error("API Error:", err);
                setError(err.response?.data?.message || err.message || "Failed to fetch jobs");
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(() => {
            fetchJobs();
        }, 300); 

        return () => clearTimeout(debounceTimer);
    }, [filterText, categoryFilter, locationFilter, experienceFilter]); 


    const filteredJobs = useMemo(() => {
        let currentJobs = allJobs;
        
        currentJobs = currentJobs.filter(job => {
            const matchesCategory = !categoryFilter || job.category.toLowerCase().includes(categoryFilter.toLowerCase());
            const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
            const matchesExperience = !experienceFilter || job.experienceLevel.toLowerCase() === experienceFilter.toLowerCase();
            
            return matchesCategory && matchesLocation && matchesExperience;
        });
        
        if (filterText) {
            currentJobs = currentJobs.filter(job =>
                job.title.toLowerCase().includes(filterText.toLowerCase()) ||
                job.company.toLowerCase().includes(filterText.toLowerCase())
            );
        }

        return currentJobs;
    }, [allJobs, categoryFilter, locationFilter, experienceFilter, filterText]); 


    return (
        <JobContext.Provider 
            value={{ 
                filteredJobs,
                loading, 
                error,
                filterText, 
                setFilterText,
                categoryFilter, 
                locationFilter, 
                experienceFilter,
                setCategoryFilter, 
                setLocationFilter, 
                setExperienceFilter,
            }}
        >
            {children}
        </JobContext.Provider>
    );
};

export const useJobs = () => useContext(JobContext);