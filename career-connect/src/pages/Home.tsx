import { useJobs } from "../context/JobContext";
import JobCard from "../components/JobCard";

const Home = () => {
  const { jobs, loading, error } = useJobs();

  if (loading) return <p className="text-center mt-10">Loading jobs...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Latest Jobs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Home;
