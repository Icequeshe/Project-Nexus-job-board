import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-4">
      <input
        type="text"
        placeholder="Search job titles (e.g. React Developer)"
        className="border p-3 rounded w-80"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-3 rounded"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
