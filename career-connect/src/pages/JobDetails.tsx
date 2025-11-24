import ApplyForm from "../components/ApplyForm";

const JobDetails = () => {
  const { id } = useParams();
  const { jobs, loading } = useJobs();

  const job = jobs.find((j) => j.id === id);

  if (loading) return <p className="mt-10 text-center text-gray-600">Loading job...</p>;
  if (!job) return <p className="mt-10 text-center text-red-500">Job not found.</p>;

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold">{job.title}</h1>
      <p className="text-gray-700 mt-2">{job.company}</p>
      <p className="text-gray-500">{job.location}</p>

      <p className="mt-6">{job.description}</p>

      {/* ---------- Apply Form Here ---------- */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Apply for this job</h2>
        <ApplyForm jobTitle={job.title} />
      </div>
    </div>
  );
};

export default JobDetails;
