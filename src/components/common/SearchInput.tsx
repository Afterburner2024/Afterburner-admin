import React from 'react';

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchQuery, setSearchQuery, placeholder = "Search..." }) => {
  return (
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder={placeholder}
      className="border p-2 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow"
    />
  );
};

export default SearchInput;
