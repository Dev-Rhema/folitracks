import React from "react";

function SearchBar({ placeholder = "", value = "", onChange, className = "" }) {
  return (
    <div
      className={`flex items-center gap-2 bg-[#EEF1F8] rounded-md px-4 py-2.5 ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4.5 h-4.5 text-gray-400 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
        />
      </svg>
      <input
        type="text"
        {...(onChange ? { value } : { defaultValue: value })}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-transparent outline-none text-md text-gray-400 placeholder-gray-400 w-full"
      />
    </div>
  );
}

export default SearchBar;
