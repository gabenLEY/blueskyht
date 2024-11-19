"use client";

import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const clearSearch = () => {
    setSearchText("");
  };

  return (
    <div className="flex items-center gap-2 border rounded-xl px-2 w-full">
      {/* Search Icon */}
      <FiSearch className="text-gray-500 text-xl" />
      {/* Input Field */}
      <input
        type="text"
        className="text-lg p-2 w-full outline-none"
        placeholder="Search..."
        value={searchText}
        onChange={handleSearchChange}
      />
      {/* Clear Icon */}
      {searchText && (
        <IoClose
          className="text-gray-500 text-2xl cursor-pointer"
          onClick={clearSearch}
        />
      )}
    </div>
  );
};

export default SearchBar;
