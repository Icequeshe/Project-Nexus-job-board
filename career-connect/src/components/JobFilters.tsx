import React from "react";

const EXPERIENCE_LEVELS = [
  { value: "", label: "All Levels" },
  { value: "Entry-Level", label: "Entry Level" },
  { value: "Mid-Level", label: "Mid Level" },
  { value: "Senior", label: "Senior Level" },
];

const CATEGORIES = [
  "Technology",
  "Finance",
  "Marketing",
  "Healthcare",
  "Engineering",
];

interface JobFiltersProps {
  onCategoryChange: (category: string) => void;
  onLocationChange: (location: string) => void;
  onExperienceChange: (experience: string) => void;
  currentCategory: string;
  currentLocation: string;
  currentExperience: string;
}

const JobFilters: React.FC<JobFiltersProps> = ({
  onCategoryChange,
  onLocationChange,
  onExperienceChange,
  currentCategory,
  currentLocation,
  currentExperience,
}) => {
  return (
    <div className="flex flex-col gap-4"> 
      
      <label htmlFor="category-filter" className="sr-only">Job Category</label>
      <select
        id="category-filter"
        className="border p-3 rounded w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        value={currentCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">Select Category</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <label htmlFor="location-filter" className="sr-only">Job Location</label>
      <input
        id="location-filter"
        type="text"
        placeholder="Filter by Location (City, State, or Country)"
        className="border p-3 rounded w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        value={currentLocation}
        onChange={(e) => onLocationChange(e.target.value)}
      />

      <label htmlFor="experience-filter" className="sr-only">Experience Level</label>
      <select
        id="experience-filter"
        className="border p-3 rounded w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        value={currentExperience}
        onChange={(e) => onExperienceChange(e.target.value)}
      >
        {EXPERIENCE_LEVELS.map((level) => (
          <option key={level.value} value={level.value}>
            {level.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default JobFilters;