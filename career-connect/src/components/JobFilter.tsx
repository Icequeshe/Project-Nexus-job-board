import { ChangeEvent } from "react";

interface Props {
  category: string;
  location: string;
  experience: string;
  setCategory: (value: string) => void;
  setLocation: (value: string) => void;
  setExperience: (value: string) => void;
}

const JobFilter = ({ category, location, experience, setCategory, setLocation, setExperience }: Props) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
        className="p-2 border rounded"
      />
      <select
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">All Levels</option>
        <option value="Entry-Level">Entry-Level</option>
        <option value="Mid-Level">Mid-Level</option>
        <option value="Senior">Senior</option>
      </select>
    </div>
  );
};

export default JobFilter;
