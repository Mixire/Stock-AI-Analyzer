import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/analysis/${query.trim().toUpperCase()}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative hidden sm:block">
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
      <input 
        className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg pl-10 pr-4 py-1.5 text-body-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 w-64 transition-all" 
        placeholder="Enter ticker (e.g. AAPL)..." 
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
