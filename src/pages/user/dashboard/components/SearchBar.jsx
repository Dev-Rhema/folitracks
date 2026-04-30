import React from "react";

function SearchBar({ placeholder = "", value = "", onChange, onSearch, className = "" }) {
  return (
    <div
      className={`flex items-center gap-1 bg-[#F1F5F9] border border-[#CBD5E1] rounded-md px-1 py-1 lg:py-1.5 ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4.5 h-4.5 text-[#A5A5A5] shrink-0"
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
        type="search"
        {...(onChange ? { value } : { defaultValue: value })}
        onChange={onChange}
        onKeyDown={(e) => e.key === "Enter" && onSearch?.()}
        placeholder={placeholder}
        className="bg-transparent outline-none text-sm lg:text-md text-[#A5A5A5] placeholder-[#A5A5A5] w-full"
      />
    </div>
  );
}

export default SearchBar;
