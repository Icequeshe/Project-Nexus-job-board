import { useParams } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import ApplyForm from '../components/ApplyForm';
import type { Job } from '../types/job'; 

const JobDetails = () => {
    const { id } = useParams<{ id: string }>(); 
    const { filteredJobs, loading, error } = useJobs(); 

    const job: Job | undefined = filteredJobs.find((j) => j.id === id); 

    if (loading) {
        return <p className="mt-10 text-center text-lg text-gray-600">Loading job details...</p>;
    }

    if (error) {
        return <p className="mt-10 text-center text-red-600">Error retrieving job details. Please try again later.</p>;
    }

    if (!job) {
        return <p className="mt-10 text-center text-xl font-medium text-red-500">Job posting not found.</p>;
    }
    
    const salaryRange = (job.salary_min && job.salary_max) 
        ? `${job.salary_currency || '$'}${job.salary_min} - ${job.salary_max}`
        : 'Competitive';

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            
            <div className="mb-8 p-6 bg-white border-b border-gray-100 rounded-t-lg shadow-sm">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{job.title}</h1>
                <h2 className="text-2xl font-semibold text-blue-700">{job.company}</h2>
                
                <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-4">
                    <span className="bg-gray-100 px-3 py-1 rounded-full">{job.location}</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full">{job.experienceLevel}</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full">{job.category}</span>
                    {job.posted_at && <span className="bg-gray-100 px-3 py-1 rounded-full">Posted: {new Date(job.posted_at).toLocaleDateString()}</span>}
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                
                <div className="md:col-span-2 p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">Job Description</h3>
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{job.description || "Detailed description is not available for this posting."}</p>
                    
                    <h4 className="text-xl font-semibold mt-6 mb-2 text-gray-800 border-t pt-4">Compensation</h4>
                    <p className="text-gray-700">Salary: <span className="font-medium text-green-700">{salaryRange}</span></p>
                    
                    {job.job_url && (
                        <a href={job.job_url} target="_blank" rel="noopener noreferrer" 
                           className="mt-6 inline-block text-blue-600 hover:text-blue-800 font-medium transition duration-150 border-b border-blue-600">
                            View original posting (External Link)
                        </a>
                    )}
                </div>

                <div className="md:col-span-1">
                    <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Apply Now</h2>
                        <ApplyForm jobTitle={job.title} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;