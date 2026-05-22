import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getMarketOverview } from '../api/client';
import GlassPanel from '../components/ui/GlassPanel';

const StatCard = ({ label, value, change, colorClass, chartData }) => (
  <GlassPanel className={`p-md glow-primary border-t-2 ${colorClass}`}>
    <p className="font-data-label text-on-surface-variant mb-xs uppercase">{label}</p>
    <div className="flex items-end justify-between">
      <h3 className="font-headline-md text-on-surface">{value}</h3>
      <span className={`font-data-display ${change.startsWith('+') ? 'text-secondary-fixed' : 'text-tertiary-container'}`}>
        {change}
      </span>
    </div>
    <div className="h-8 mt-md opacity-30">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <Area type="monotone" dataKey="v" stroke={change.startsWith('+') ? '#52ffac' : '#ffb3ac'} fill="none" strokeWidth={1.5} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </GlassPanel>
);

const AISignalCard = ({ ticker, signal, confidence, entry, colorClass, icon }) => (
  <GlassPanel className={`p-md border-l-4 ${colorClass}`}>
    <div className="flex items-center justify-between mb-xs">
      <span className="font-data-label text-[10px] text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded">
        {confidence > 0.9 ? 'HIGH PROBABILITY' : 'MID PROBABILITY'}
      </span>
      <span className="material-symbols-outlined text-on-surface-variant text-[18px]">{icon}</span>
    </div>
    <h4 className="font-headline-md text-md mb-xs">{ticker}: {signal}</h4>
    <p className="font-body-sm text-xs text-on-surface-variant">Signal Strength: {Math.round(confidence * 100)}%</p>
    <div className="mt-md flex justify-between items-center">
      <span className="font-data-display text-sm">Entry: ${entry}</span>
      <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">Execute</button>
    </div>
  </GlassPanel>
);

const MarketDashboard = () => {
  const [marketData, setMarketData] = useState(null);
  const [error, setError] = useState(null);
  
  const dummyChartData = Array.from({ length: 20 }, (_, i) => ({ v: Math.random() * 20 + 80 }));
  const mainChartData = Array.from({ length: 50 }, (_, i) => ({ 
    time: i, 
    price: 150 + Math.sin(i / 5) * 20 + Math.random() * 10 
  }));

  useEffect(() => {
    getMarketOverview()
      .then(setMarketData)
      .catch(err => {
        console.error(err);
        setError("Failed to fetch market data. Ensure backend is running.");
      });
  }, []);

  if (error) return <div className="p-margin text-tertiary-container font-bold">{error}</div>;
  if (!marketData) return <div className="p-margin text-primary animate-pulse">Synchronizing market data...</div>;

  return (
    <div className="p-gutter space-y-gutter">
      {/* Header Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
        <GlassPanel className="p-md border-t-2 border-primary">
          <p className="font-data-label text-on-surface-variant mb-xs uppercase">AI MARKET SENTIMENT</p>
          <div className="flex items-end justify-between">
            <h3 className="font-headline-md text-primary italic">Bullish</h3>
            <span className="font-data-display text-secondary-fixed">84%</span>
          </div>
          <div className="w-full bg-surface-container-highest h-1 mt-md rounded-full overflow-hidden">
            <div className="bg-primary h-full" style={{ width: '84%' }}></div>
          </div>
        </GlassPanel>
        
        <StatCard 
          label="S&P 500" 
          value={marketData.indices.SP500.value.toLocaleString()} 
          change={`+${marketData.indices.SP500.change_pct}%`} 
          colorClass="border-secondary-fixed"
          chartData={dummyChartData}
        />
        <StatCard 
          label="NASDAQ 100" 
          value={marketData.indices.NASDAQ.value.toLocaleString()} 
          change={`+${marketData.indices.NASDAQ.change_pct}%`} 
          colorClass="border-secondary-fixed"
          chartData={dummyChartData}
        />
        <StatCard 
          label="BITCOIN (BTC)" 
          value={marketData.indices.BTC_USD.value.toLocaleString()} 
          change={`${marketData.indices.BTC_USD.change_pct}%`} 
          colorClass="border-tertiary-container"
          chartData={dummyChartData}
        />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-12 gap-gutter">
        {/* Main Chart Area */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-gutter">
          <GlassPanel className="flex-1 p-gutter min-h-[400px] flex flex-col node-bg">
            <div className="flex justify-between items-center mb-md">
              <div>
                <h2 className="font-headline-md text-on-surface">Advanced Market Analysis</h2>
                <p className="font-body-sm text-on-surface-variant">Real-time aggregate data flow across 15+ exchanges</p>
              </div>
              <div className="flex gap-xs">
                {['1H', '4H', '1D', '1W'].map(t => (
                  <button key={t} className={`px-3 py-1 text-xs font-data-label rounded ${t === '1H' ? 'bg-surface-container-high border border-outline-variant/30 text-on-surface' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex-1 relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mainChartData}>
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#b7c4ff" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#b7c4ff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#b7c4ff" 
                    fill="url(#chartGradient)" 
                    strokeWidth={3} 
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
              
              <div className="absolute right-gutter top-gutter glass-panel p-xs rounded border border-primary/40">
                <p className="font-data-label text-[10px] text-primary">LIVE AT 800ms</p>
                <p className="font-data-display text-md">$67,241.15</p>
              </div>
            </div>
          </GlassPanel>

          {/* AI Signals Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {marketData.ai_signals.map((signal, idx) => (
              <AISignalCard 
                key={idx}
                {...signal}
                colorClass={signal.signal === 'LONG' ? 'border-secondary-fixed' : signal.signal === 'SHORT' ? 'border-tertiary-container' : 'border-primary'}
                icon={signal.signal === 'LONG' ? 'psychology' : signal.signal === 'SHORT' ? 'trending_down' : 'rocket_launch'}
              />
            ))}
          </div>
        </div>

        {/* Right Sidebar: Watchlist */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
          <GlassPanel className="flex-1 p-gutter overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-md">
              <h3 className="font-headline-md text-lg">Watchlist</h3>
              <button className="p-1 hover:bg-surface-container-high rounded transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant">add</span>
              </button>
            </div>
            <div className="flex-1 space-y-xs">
              {[
                { symbol: 'MSFT', name: 'Microsoft Corp', price: '415.28', change: '+1.4%' },
                { symbol: 'ETH', name: 'Ethereum', price: '3,521.10', change: '-2.1%' },
                { symbol: 'META', name: 'Meta Platforms', price: '496.12', change: '+0.8%' },
                { symbol: 'AMZN', name: 'Amazon.com', price: '178.22', change: '0.0%' },
                { symbol: 'GOOG', name: 'Alphabet Inc', price: '152.42', change: '+0.4%' },
              ].map((item, idx) => (
                <div key={idx} className="p-sm rounded hover:bg-surface-container-high transition-colors cursor-pointer group border border-transparent hover:border-outline-variant/30 flex items-center justify-between">
                  <div className="flex items-center gap-sm">
                    <div className="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center font-bold text-[10px]">{item.symbol}</div>
                    <div>
                      <p className="font-body-sm font-bold">{item.name}</p>
                      <p className="text-[10px] font-data-label text-on-surface-variant uppercase">Vol: 12.4M</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-data-display text-sm">{item.price}</p>
                    <p className={`text-[10px] font-data-label ${item.change.startsWith('+') ? 'text-secondary-fixed' : item.change.startsWith('-') ? 'text-tertiary-container' : 'text-on-surface-variant'}`}>{item.change}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
};

export default MarketDashboard;
