
import React from 'react';

interface SortDropdownProps {
  sortOption: string;
  setSortOption: (option: string) => void;
  options: { value: string; label: string }[];
}

const SortDropdown: React.FC<SortDropdownProps> = ({ sortOption, setSortOption, options }) => {
  return (
    <select
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
      className="border p-2 rounded"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SortDropdown;
