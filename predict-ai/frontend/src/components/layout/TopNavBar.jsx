import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const TopNavBar = () => {
  return (
    <header className="bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 flex justify-between items-center h-16 px-gutter w-full fixed top-10 z-50">
      <div className="flex items-center gap-lg">
        <Link to="/" className="font-headline-md text-headline-md font-bold tracking-tighter text-primary">PREDICT</Link>
        <nav className="hidden md:flex gap-md items-center">
          <Link className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" to="/dashboard">Dashboard</Link>
          <Link className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" to="/markets">Markets</Link>
          <Link className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" to="/portfolio">Portfolio</Link>
          <Link className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" to="/analysis">Analysis</Link>
        </nav>
      </div>
      <div className="flex items-center gap-md">
        <SearchBar />
        <div className="flex items-center gap-sm">
          <button className="p-xs text-on-surface-variant hover:bg-primary/10 transition-all rounded">
            <span className="material-symbols-outlined">account_balance_wallet</span>
          </button>
          <button className="p-xs text-on-surface-variant hover:bg-primary/10 transition-all rounded">
            <span className="material-symbols-outlined">notifications_active</span>
          </button>
          <button className="p-xs text-on-surface-variant hover:bg-primary/10 transition-all rounded">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <div className="h-8 w-8 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant ml-2">
            <img alt="User Analyst Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBT28pDJg-EJzobyOyzNFqYErXokG9XHVmM16wDS7SJcZadzBFxlfhqS2N1LsY3ZUT_a59fGU7Qr1zNeJLSNC1s1Yye5gCSrzlz5zN04itAzI596gq4nZi2zVDp7I6M9lN8JjsWFbA7e682XZjo0qtL0pRBiSK9quETr8YyyJZ-8AUx8uDSSGNwkiXEm09W5F83wE7XFeNBhSHq5X8P53hKf36J9_7EZvSHEu__V0EPPfzPCtcFOCN248xGqnnFP2W9444r0ubA2SY"/>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavBar;
