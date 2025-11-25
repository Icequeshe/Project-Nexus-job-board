import { useJobs } from "/src/context/JobContext.tsx";
import JobCard from "../components/JobCard";
import SearchBar from "../components/SearchBar";
import JobFilters from "../components/JobFilters";
import Loader from "../components/Loader";

const Home = () => {
  const {
    filteredJobs,
    loading,
    error,
    setFilterText,

    categoryFilter,
    locationFilter,
    experienceFilter,

    setCategoryFilter,
    setLocationFilter,
    setExperienceFilter,

    loadMore,
  } = useJobs();

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
        Career Connect: Latest Job Opportunities
      </h1>

      <div className="flex flex-col md:flex-row md:gap-8">
        <div className="md:w-1/4 mb-6 md:mb-0">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            Filter Jobs
          </h2>

          <SearchBar onSearch={(query) => setFilterText(query)} />

          <div className="mt-4 p-4 border rounded-lg bg-gray-50">
            <JobFilters
              onLocationChange={setLocationFilter}
              onExperienceChange={setExperienceFilter}
              onCategoryChange={setCategoryFilter}
              currentCategory={categoryFilter}
              currentLocation={locationFilter}
              currentExperience={experienceFilter}
            />
          </div>
        </div>

        <div className="md:w-3/4">
          {error && (
            <div className="text-center py-10 text-red-600 font-semibold border border-red-200 bg-red-50 p-4 rounded-md">
              Error fetching jobs: {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {!loading && filteredJobs.length === 0 && (
              <p className="text-gray-600 col-span-full text-center py-10 text-lg">
                No jobs found matching your criteria.
              </p>
            )}

            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          {/* Pagination Button */}
          <div className="mt-10 text-center">
            {loading ? (
              <Loader />
            ) : (
              <button
                onClick={loadMore}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Load More Jobs
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
