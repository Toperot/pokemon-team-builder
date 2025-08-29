import React from "react";

export default function SearchBar({ value, onChange, placeholder = "Search by name or type..." }) {
  return (
    <div className="mb-4">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:ring focus:outline-none"
        placeholder={placeholder}
        aria-label="Search Pokémon"
      />
    </div>
  );
}
