import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TickerTape from './components/layout/TickerTape';
import TopNavBar from './components/layout/TopNavBar';
import SideNavBar from './components/layout/SideNavBar';
import Home from './pages/Home';
import MarketDashboard from './pages/MarketDashboard';
import DetailedAnalysis from './pages/DetailedAnalysis';
import Portfolio from './pages/Portfolio';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-on-background">
        <TickerTape />
        <TopNavBar />
        <main className="pt-32 relative z-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<MarketDashboard />} />
            {/* Add more routes as they are implemented */}
            <Route path="/markets" element={<div className="p-margin text-on-surface">Markets (Work in Progress)</div>} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/analysis" element={<DetailedAnalysis />} />
            <Route path="/analysis/:ticker" element={<DetailedAnalysis />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
