import type { Job } from "../types/job";

interface Props {
  job: Job;
}

const JobCard = ({ job }: Props) => {
  return (
    <div className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition">
      <h3 className="text-lg font-bold">{job.title}</h3>
      <p className="text-gray-700">{job.company}</p>
      <p className="text-sm text-gray-500">{job.location}</p>
      <p className="mt-2 text-blue-600 font-semibold">{job.experienceLevel}</p>
    </div>
  );
};

export default JobCard;
