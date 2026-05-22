import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavItem = ({ icon, label, to, active }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-sm px-4 py-3 transition-all ${
      active 
        ? 'bg-primary-container/10 text-primary border-r-4 border-primary' 
        : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
    }`}
  >
    <span className="material-symbols-outlined">{icon}</span>
    <span className="font-body-sm text-body-sm">{label}</span>
  </Link>
);

const SideNavBar = () => {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col h-[calc(100vh-104px)] w-64 fixed left-0 top-[104px] bg-surface-container-lowest border-r border-outline-variant/30 py-md z-40">
      <div className="px-4 mb-lg">
        <div className="flex items-center gap-sm p-3 bg-surface-container-high rounded-xl border border-outline-variant/20">
          <div className="w-2 h-2 bg-secondary-fixed rounded-full animate-pulse shadow-[0_0_8px_#52ffac]"></div>
          <div>
            <p className="font-data-label text-[10px] text-on-surface-variant uppercase tracking-widest">MARKET OPEN</p>
            <p className="font-data-display text-sm text-secondary-fixed font-bold">NYSE: +1.24%</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        <NavItem icon="dashboard" label="Overview" to="/dashboard" active={location.pathname === '/dashboard'} />
        <NavItem icon="star" label="Watchlist" to="/markets" active={location.pathname === '/markets'} />
        <NavItem icon="psychology" label="AI Signals" to="/analysis" active={location.pathname === '/analysis'} />
        <NavItem icon="account_balance" label="Portfolio" to="/portfolio" active={location.pathname === '/portfolio'} />
        <NavItem icon="description" label="Reports" to="#" active={false} />
      </nav>

      <div className="px-4 mt-auto">
        <button className="w-full py-3 bg-primary text-on-primary font-body-sm font-bold rounded-lg hover:shadow-[0_0_20px_rgba(183,196,255,0.4)] transition-all uppercase tracking-tighter">
          Deploy Engine
        </button>
        <div className="mt-md pt-md border-t border-outline-variant/30 flex flex-col gap-sm">
          <Link className="flex items-center gap-sm text-on-surface-variant hover:text-on-surface px-4" to="#">
            <span className="material-symbols-outlined text-[18px]">help</span>
            <span className="font-body-sm text-xs">Support</span>
          </Link>
          <Link className="flex items-center gap-sm text-on-surface-variant hover:text-on-surface px-4" to="#">
            <span className="material-symbols-outlined text-[18px]">code</span>
            <span className="font-body-sm text-xs">API Documentation</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default SideNavBar;
