import React from 'react';

export default function SearchBar({ searchTerm, setSearchTerm, onSearch, onReset }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Search for a Pokemon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">Search</button>
      {searchTerm && (
        <button
          type="button"
          className="reset-button"
          onClick={onReset}
        >
          Reset
        </button>
      )}
    </form>
  );
}

