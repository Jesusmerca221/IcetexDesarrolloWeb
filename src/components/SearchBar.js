import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <form className="mt-4">
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar productos"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <button type="button" className="btn btn-primary" onClick={handleSearch}>
        Buscar
      </button>
    </form>
  );
}

export default SearchBar;
