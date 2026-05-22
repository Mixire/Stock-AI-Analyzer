import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import GlassPanel from '../components/ui/GlassPanel';

const Portfolio = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/portfolio')
      .then(res => setData(res.data))
      .catch(console.error);
  }, []);

  if (!data) return <div className="p-margin text-primary">Loading portfolio...</div>;

  const growthData = Array.from({ length: 20 }, (_, i) => ({ 
    date: i, 
    value: 100000 + i * 2000 + (Math.random() - 0.5) * 5000 
  }));

  return (
    <div className="p-gutter space-y-gutter">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
        {[
          { label: 'Total Value', value: `$${data.summary.total_value.toLocaleString()}`, color: 'border-primary' },
          { label: 'Total Gain', value: `+$${data.summary.total_gain.toLocaleString()}`, color: 'border-secondary-fixed' },
          { label: "Today's P&L", value: `-$${Math.abs(data.summary.today_pnl).toLocaleString()}`, color: 'border-tertiary-container' },
          { label: 'Sharpe Ratio', value: data.summary.sharpe_ratio.toFixed(2), color: 'border-primary-container' },
        ].map((stat, idx) => (
          <GlassPanel key={idx} className={`p-md border-l-4 ${stat.color}`}>
            <p className="font-data-label text-[10px] text-on-surface-variant uppercase mb-xs">{stat.label}</p>
            <p className="font-data-display text-xl">{stat.value}</p>
          </GlassPanel>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-gutter">
        {/* Growth Chart */}
        <div className="col-span-12 lg:col-span-8">
          <GlassPanel className="h-[400px] p-gutter flex flex-col">
            <h3 className="font-headline-md text-lg mb-md">Portfolio Performance</h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData}>
                  <defs>
                    <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#b7c4ff" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#b7c4ff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="#b7c4ff" fill="url(#growthGradient)" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassPanel>
        </div>

        {/* Predictive Alerts */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
          <GlassPanel className="p-gutter space-y-md flex-1">
            <h3 className="font-headline-md text-lg">Predictive Alerts</h3>
            <div className="space-y-sm">
              {data.alerts.map((alert, idx) => (
                <div key={idx} className={`p-sm border-l-4 ${alert.type === 'bullish' ? 'border-secondary-fixed' : 'border-tertiary-container'} bg-surface-container-high rounded-r`}>
                  <div className="flex items-center gap-xs mb-1">
                    <span className="material-symbols-outlined text-sm">{alert.type === 'bullish' ? 'trending_up' : 'trending_down'}</span>
                    <span className="font-bold text-xs">{alert.ticker}</span>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface-variant">{alert.text}</p>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>

      {/* Holdings Table */}
      <GlassPanel className="overflow-hidden">
        <div className="p-gutter border-b border-outline-variant/20">
          <h3 className="font-headline-md text-lg">Holdings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm">
            <thead className="bg-surface-container-high text-[10px] text-on-surface-variant uppercase tracking-widest">
              <tr>
                <th className="px-gutter py-md">Asset</th>
                <th className="px-gutter py-md">Shares</th>
                <th className="px-gutter py-md">Avg Cost</th>
                <th className="px-gutter py-md">Current Price</th>
                <th className="px-gutter py-md text-right">Gain/Loss</th>
                <th className="px-gutter py-md">AI Signal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {data.holdings.map((h, idx) => (
                <tr key={idx} className="hover:bg-surface-container-low transition-colors">
                  <td className="px-gutter py-md font-bold text-primary">{h.asset}</td>
                  <td className="px-gutter py-md font-data-label">{h.shares}</td>
                  <td className="px-gutter py-md font-data-label">${h.avg_cost.toFixed(2)}</td>
                  <td className="px-gutter py-md font-data-label">${h.current_price.toFixed(2)}</td>
                  <td className={`px-gutter py-md font-data-label text-right ${h.gain_loss > 0 ? 'text-secondary-fixed' : 'text-tertiary-container'}`}>
                    {h.gain_loss > 0 ? '+' : ''}${h.gain_loss.toLocaleString()}
                  </td>
                  <td className="px-gutter py-md">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${h.signal === 'BUY MORE' ? 'bg-secondary-fixed/10 text-secondary-fixed' : h.signal === 'REDUCE' ? 'bg-tertiary-container/10 text-tertiary-container' : 'bg-primary/10 text-primary'}`}>
                      {h.signal}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </div>
  );
};

export default Portfolio;
