import React from 'react';
import type { Job } from "../types/job";
import { Link } from 'react-router-dom';

interface Props {
  job: Job;
}

const JobCard = ({ job }: Props) => {
  return (
    <Link 
      to={`/jobs/${job.id}`} 
      className="block p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
    >
      <h3 className="text-xl font-bold text-blue-700 mb-1 leading-snug">{job.title}</h3>
      <p className="text-md font-semibold text-gray-800 mb-3">{job.company}</p>

      <div className="flex items-center text-sm text-gray-500 mb-4">
        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        {job.location}
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-xs font-medium bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
          {job.category}
        </span>
        <span className="text-xs font-medium bg-green-100 text-green-800 px-3 py-1 rounded-full">
          {job.experienceLevel}
        </span>
        {job.posted_at && (
          <span className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
            Posted: {new Date(job.posted_at).toLocaleDateString()}
          </span>
        )}
      </div>
    </Link>
  );
};

export default JobCard;