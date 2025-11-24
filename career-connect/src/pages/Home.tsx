import { useState, useEffect } from "react";
import { useJobs } from "../context/JobContext";
import JobCard from "../components/JobCard";
import JobFilter from "../components/JobFilter";
import type { Job } from "../types/job";

const Home = () => {
  const { jobs, loading, error } = useJobs();

  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  useEffect(() => {
    let result = jobs;

    if (category) {
      result = result.filter((job) =>
        job.category?.toLowerCase().includes(category.toLowerCase())
      );
    }
    if (location) {
      result = result.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    if (experience) {
      result = result.filter((job) => job.experienceLevel === experience);
    }

    setFilteredJobs(result);
  }, [category, location, experience, jobs]);

  if (loading) return <p className="text-center mt-10">Loading jobs...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Latest Jobs</h1>

      <JobFilter
        category={category}
        location={location}
        experience={experience}
        setCategory={setCategory}
        setLocation={setLocation}
        setExperience={setExperience}
      />

      {filteredJobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
