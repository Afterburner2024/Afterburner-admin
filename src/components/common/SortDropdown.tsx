import React from 'react';

interface SortDropdownProps {
  sortOption: string;
  setSortOption: (option: string) => void;
  options: { value: string; label: string }[];
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  sortOption,
  setSortOption,
  options,
}) => {
  return (
    <select
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
      className="border p-2 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow"
    >
      <option value="">정렬 선택</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SortDropdown;
