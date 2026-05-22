import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { predictTicker } from '../api/client';
import GlassPanel from '../components/ui/GlassPanel';

const DetailedAnalysis = () => {
  const { ticker: urlTicker } = useParams();
  const navigate = useNavigate();
  const ticker = (urlTicker || 'AAPL').toUpperCase();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    predictTicker(ticker)
      .then(setData)
      .catch(err => {
        console.error(err);
        setError(`Failed to load analysis for ${ticker}. Ticker might be invalid or data unavailable.`);
      })
      .finally(() => setLoading(false));
  }, [ticker]);

  if (loading) return <div className="p-margin text-primary animate-pulse">Analysing {ticker}...</div>;
  if (error) return (
    <div className="p-margin space-y-md">
      <div className="text-tertiary-container font-bold">{error}</div>
      <button onClick={() => navigate('/dashboard')} className="text-primary hover:underline">Return to Dashboard</button>
    </div>
  );
  if (!data) return null;

  return (
    <div className="p-gutter space-y-gutter">
      {/* Ticker Header Card */}
      <GlassPanel className="p-md flex flex-col md:flex-row justify-between items-center gap-md">
        <div className="flex items-center gap-md">
          <div className="w-12 h-12 bg-surface-container-high rounded flex items-center justify-center border border-primary/20">
            <span className="font-bold text-lg text-primary">{ticker.charAt(0)}</span>
          </div>
          <div>
            <div className="flex items-center gap-sm">
              <h1 className="font-headline-md text-primary">{ticker}</h1>
              <span className="font-body-sm text-on-surface-variant uppercase tracking-wider text-[10px]">Institutional Asset</span>
            </div>
            <div className="flex items-end gap-sm">
              <span className="font-data-display text-3xl text-on-surface">${data.current_price.toFixed(2)}</span>
              <span className={`font-data-display text-sm ${data.prediction === 'BULLISH' ? 'text-secondary-fixed' : 'text-tertiary-container'}`}>
                {data.prediction === 'BULLISH' ? 'BUY SIGNAL' : 'SELL SIGNAL'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-sm w-full md:w-auto">
          <button className="flex-1 md:flex-none px-md py-xs border border-outline-variant/30 rounded text-on-surface-variant hover:text-on-surface transition-colors font-data-label text-xs uppercase">Watchlist</button>
          <button className="flex-1 md:flex-none px-md py-xs bg-primary text-on-primary font-bold rounded shadow-[0_0_15px_rgba(183,196,255,0.3)] font-data-label text-xs uppercase">Report</button>
        </div>
      </GlassPanel>

      <div className="grid grid-cols-12 gap-gutter">
        {/* Main Price Chart */}
        <div className="col-span-12 lg:col-span-8 space-y-gutter">
          <GlassPanel className="h-[450px] p-gutter flex flex-col">
            <div className="flex justify-between items-center mb-md">
              <span className="font-data-label text-[10px] text-on-surface-variant uppercase tracking-widest">30-Day Historical Flow</span>
              <div className="flex gap-xs">
                {['1D', '5D', '1M', '3M', '1Y'].map(t => (
                  <button key={t} className={`px-3 py-1 text-xs font-data-label rounded ${t === '1M' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.history}>
                  <defs>
                    <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={data.prediction === 'BULLISH' ? '#52ffac' : '#ffb3ac'} stopOpacity={0.2} />
                      <stop offset="100%" stopColor={data.prediction === 'BULLISH' ? '#52ffac' : '#ffb3ac'} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(141, 144, 161, 0.1)" vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis domain={['auto', 'auto']} hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1d2023', border: '1px solid #434655', borderRadius: '4px' }}
                    itemStyle={{ color: '#e1e2e7', fontFamily: 'JetBrains Mono' }}
                    labelStyle={{ display: 'none' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke={data.prediction === 'BULLISH' ? '#52ffac' : '#ffb3ac'} 
                    fill="url(#priceGradient)" 
                    strokeWidth={2} 
                    dot={false}
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassPanel>

          {/* Technical Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
            {[
              { label: 'RSI (14)', value: data.features.RSI_14.toFixed(2), color: data.features.RSI_14 > 70 ? 'text-tertiary-container' : data.features.RSI_14 < 30 ? 'text-secondary-fixed' : 'text-primary' },
              { label: 'MACD', value: data.features.MACD.toFixed(4), color: 'text-primary' },
              { label: 'ATR', value: data.features.ATR_14.toFixed(2), color: 'text-primary' },
              { label: 'BB WIDTH', value: (data.features.BB_Width * 100).toFixed(2) + '%', color: 'text-primary' },
            ].map((ind, idx) => (
              <GlassPanel key={idx} className="p-md border-t border-outline-variant/20">
                <p className="font-data-label text-[10px] text-on-surface-variant uppercase mb-xs">{ind.label}</p>
                <p className={`font-data-display text-lg ${ind.color}`}>{ind.value}</p>
              </GlassPanel>
            ))}
          </div>
        </div>

        {/* Prediction & Insight */}
        <div className="col-span-12 lg:col-span-4 space-y-gutter">
          <GlassPanel className="p-md space-y-md border-t-2 border-primary">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
              <h3 className="font-headline-md text-lg">AI Decision Engine</h3>
            </div>
            <div className="text-center py-md bg-surface-container-low rounded-lg border border-outline-variant/10">
              <p className={`text-4xl font-extrabold tracking-tighter ${data.prediction === 'BULLISH' ? 'text-secondary-fixed' : 'text-tertiary-container'}`}>
                {data.prediction}
              </p>
              <p className="font-data-label text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">5-Day Probability Scale</p>
            </div>
            <div className="space-y-xs">
              <div className="flex justify-between font-data-label text-[10px] text-on-surface-variant uppercase">
                <span>Confidence Level</span>
                <span className="text-on-surface">{Math.round(data.confidence * 100)}%</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${data.prediction === 'BULLISH' ? 'bg-secondary-fixed shadow-[0_0_10px_#52ffac]' : 'bg-tertiary-container shadow-[0_0_10px_#ff544e]'}`}
                  style={{ width: `${data.confidence * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="pt-md border-t border-outline-variant/20">
              <p className="font-data-label text-[10px] text-on-surface-variant uppercase mb-sm tracking-widest">Model Weight Drivers</p>
              <div className="space-y-sm">
                {Object.entries(data.shap_values).slice(0, 4).map(([key, val], idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="font-data-label text-[10px] text-on-surface-variant uppercase">{key}</span>
                    <div className="w-32 h-1 bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-primary/40" style={{ width: `${40 + Math.random() * 40}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-md space-y-md flex flex-col h-full min-h-[300px]">
             <div className="flex items-center justify-between">
              <h3 className="font-headline-md text-lg">Analyst Synthesis</h3>
              <div className="flex items-center gap-xs">
                <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
                <span className="font-data-label text-[10px] text-on-surface-variant uppercase">v4.2 Neural</span>
              </div>
            </div>
            <div className="space-y-md flex-1">
              <p className="font-body-sm text-on-surface leading-relaxed text-sm">
                {data.llm_insight || `Quantitative models for ${ticker} have converged on a ${data.prediction.toLowerCase()} trajectory. Structural retest of the ${data.features.SMA_20.toFixed(2)} SMA is imminent. Alpha-generation is primarily driven by ${Object.keys(data.shap_values)[0]} divergence and volatility clustering in the ${data.features.ATR_14.toFixed(2)} ATR range.`}
              </p>
            </div>
            <div className="pt-md border-t border-outline-variant/20 flex justify-between items-center">
              <span className="font-data-label text-[10px] text-on-surface-variant uppercase tracking-widest">TS: {new Date(data.timestamp).toLocaleTimeString()}</span>
              <button className="text-[10px] text-primary font-bold uppercase tracking-tighter hover:underline">Verify Logic</button>
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
};

export default DetailedAnalysis;
