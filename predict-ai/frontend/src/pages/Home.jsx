import React from 'react';
import { Link } from 'react-router-dom';
import GlassPanel from '../components/ui/GlassPanel';

const FeatureCard = ({ icon, title, description, label, labelColor }) => (
  <div className="bg-surface-container-low border border-outline-variant/30 p-lg rounded-xl space-y-md group hover:border-primary/50 transition-colors">
    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-lg">
      <span className="material-symbols-outlined text-primary text-3xl">{icon}</span>
    </div>
    <h3 className="font-headline-md text-headline-md text-on-surface">{title}</h3>
    <p className="font-body-sm text-body-sm text-on-surface-variant">{description}</p>
    <div className="pt-sm border-t border-outline-variant/20 flex items-center gap-xs">
      {labelColor === 'secondary-fixed' && <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>}
      <span className={`font-data-label text-data-label ${labelColor || 'text-on-surface-variant'} uppercase tracking-widest`}>
        {label}
      </span>
    </div>
  </div>
);

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center py-xl px-margin overflow-hidden node-bg">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary-fixed/5 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="max-w-5xl w-full text-center relative z-10 space-y-md">
          <div className="inline-flex items-center gap-xs px-sm py-xs bg-primary-container/10 border border-primary/20 rounded-full">
            <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
            <span className="font-data-label text-data-label text-primary uppercase tracking-widest">Next-Gen Predictive Engine Live</span>
          </div>
          
          <h1 className="font-headline-lg text-6xl md:text-8xl text-on-surface font-extrabold tracking-tighter leading-[1.1]">
            Predict the <span className="text-primary italic">Pulse</span> of the Market
          </h1>
          
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Institutional-grade AI forecasting for the modern analyst. Process 40PB of daily data with sub-millisecond latency. Stay ahead of volatility with algorithmic precision.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-md justify-center pt-md">
            <button className="px-xl py-md bg-primary text-on-primary font-bold rounded-lg hover:shadow-[0px_8px_24px_rgba(105,137,255,0.15)] transition-all active:scale-95">
              Launch Terminal
            </button>
            <button className="px-xl py-md border border-primary text-primary font-bold rounded-lg hover:bg-primary/10 transition-all active:scale-95">
              Request API Access
            </button>
          </div>
        </div>

        {/* Floating Data Preview */}
        <div className="mt-xl w-full max-w-6xl relative z-10 p-xs">
          <GlassPanel className="p-xs">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
            <img 
              className="w-full h-auto rounded-lg" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0zx9u4oNmdvcySTh8YjkU67mnvo-O5GJsp5GKOQy83HXmdhEEB2Iz9wiA-S3FA9IXBORJfA4e2Ps2NE6NvDn_xPzvFWbITvawrqYjTfaQasQTZK17Z9wT9Ew79YradalSocP1J2bR2BN1hXUnmbJZbEWysfpuHmAS3QBcd76bzTneTlgatmJPMmsQPbKCsv-l_7JAC9RfsLZC2y9yHQ7Fe_BKNognbD0rClE64ZKANujN5Of2CCItJoL39PElh2nygHEs7OlHD2o" 
              alt="Dashboard Preview"
            />
          </GlassPanel>
        </div>
      </section>

      {/* Why PREDICT Section */}
      <section className="py-xl px-margin max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          <FeatureCard 
            icon="verified"
            title="99.8% Precision"
            description="Our models are trained on historical tick-data since 1972, providing unparalleled predictive accuracy for short-term and long-term positions."
            label="INSTITUTIONAL GRADE"
            labelColor="text-secondary-fixed"
          />
          <FeatureCard 
            icon="speed"
            title="Sub-ms Latency"
            description="Execute and adjust strategy in real-time. Our proprietary edge-nodes process global exchange signals before they reach standard terminals."
            label="Live Stream Connected"
            labelColor="secondary-fixed"
          />
          <FeatureCard 
            icon="neurology"
            title="LLM-Enhanced"
            description="Beyond numbers, our AI parses sentiment from 50,000+ sources including earnings calls, filings, and dark-pool activities."
            label="Transformer Model v4.2"
            labelColor="text-on-surface-variant"
          />
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="py-xl px-margin bg-surface-container-lowest w-full">
        <div className="max-w-7xl mx-auto space-y-lg">
          <div className="text-center space-y-sm">
            <h2 className="font-headline-lg text-headline-lg text-on-surface">The Invisible Analyst</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto">
              A command center designed for clarity. High information density without the noise.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-md">
            {/* Large Bento Item */}
            <div className="col-span-12 md:col-span-8 bg-surface-container-low border border-outline-variant/30 rounded-xl overflow-hidden flex flex-col h-[400px]">
              <div className="p-gutter border-b border-outline-variant/20 flex justify-between items-center">
                <span className="font-data-label text-data-label text-on-surface-variant uppercase">Volatility Clustering Analysis</span>
                <div className="flex gap-xs">
                  <span className="px-xs py-[2px] bg-secondary-container/10 text-secondary-fixed text-[10px] border border-secondary-fixed/20 rounded">LIVE</span>
                </div>
              </div>
              <div 
                className="flex-1 p-gutter bg-cover bg-center" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1611974717535-7c446a3c60ad?auto=format&fit=crop&q=80&w=1200')" }}
              ></div>
            </div>

            {/* Small Bento Item 1 */}
            <div className="col-span-12 md:col-span-4 bg-surface-container-low border border-outline-variant/30 rounded-xl p-gutter flex flex-col justify-between">
              <div>
                <span className="font-data-label text-data-label text-on-surface-variant uppercase">Risk Appetite</span>
                <div className="mt-md text-4xl font-headline-lg text-primary">High Conviction</div>
              </div>
              <div className="space-y-sm">
                <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[85%]"></div>
                </div>
                <div className="flex justify-between font-data-label text-data-label text-on-surface-variant">
                  <span>CONSERVATIVE</span>
                  <span>AGGRESSIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-xl px-margin relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-primary/5 -z-10"></div>
        <div className="max-w-4xl mx-auto glass-panel p-xl rounded-2xl text-center space-y-md border-primary/30">
          <h2 className="font-headline-lg text-4xl md:text-5xl text-on-surface font-bold">Deploy institutional alpha.</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto">
            Leveraged by over 1,400 hedge funds and independent analysts to secure market dominance.
          </p>
          <div className="pt-md flex flex-col items-center gap-sm">
            <button className="w-full sm:w-auto px-xl py-md bg-primary text-on-primary font-bold rounded-lg hover:shadow-[0px_0px_30px_rgba(105,137,255,0.4)] transition-all">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant/20 w-full py-lg flex flex-col items-center justify-center gap-sm px-margin text-center">
        <span className="font-data-display text-data-display text-primary">PREDICT AI</span>
        <div className="flex flex-wrap justify-center gap-md">
          <a className="font-data-label text-data-label text-on-surface-variant hover:text-secondary-fixed transition-colors uppercase tracking-widest" href="#">Privacy Policy</a>
          <a className="font-data-label text-data-label text-on-surface-variant hover:text-secondary-fixed transition-colors uppercase tracking-widest" href="#">Terms of Service</a>
          <a className="font-data-label text-data-label text-on-surface-variant hover:text-secondary-fixed transition-colors uppercase tracking-widest" href="#">SEC Disclosures</a>
          <a className="font-data-label text-data-label text-on-surface-variant hover:text-secondary-fixed transition-colors uppercase tracking-widest" href="#">Risk Warning</a>
        </div>
        <p className="font-data-label text-data-label text-on-surface-variant uppercase tracking-widest mt-sm">
          © 2024 Predict AI Financial. Institutional-grade forecasting.
        </p>
      </footer>
    </div>
  );
};

export default Home;
me;
