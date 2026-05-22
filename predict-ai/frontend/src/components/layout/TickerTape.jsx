import React from 'react';

const TickerItem = ({ ticker, change }) => {
  const isPositive = change.startsWith('+');
  return (
    <span className="flex items-center gap-xs font-data-label text-data-label text-on-surface-variant uppercase tracking-widest">
      {ticker} <span className={isPositive ? "text-secondary-fixed" : "text-tertiary-container"}>{change}</span>
    </span>
  );
};

const TickerTape = () => {
  const items = [
    { ticker: "BTC/USD", change: "+2.41%" },
    { ticker: "ETH/USD", change: "+1.85%" },
    { ticker: "NVDA", change: "-0.12%" },
    { ticker: "AAPL", change: "+0.44%" },
    { ticker: "S&P 500", change: "+1.24%" },
  ];

  return (
    <div className="ticker-wrap h-10 flex items-center fixed top-0 w-full z-[60]">
      <div className="ticker-move flex items-center gap-lg">
        {items.map((item, idx) => (
          <TickerItem key={`orig-${idx}`} {...item} />
        ))}
        {/* Duplicated for seamless loop */}
        {items.map((item, idx) => (
          <TickerItem key={`dup-${idx}`} {...item} />
        ))}
      </div>
    </div>
  );
};

export default TickerTape;
