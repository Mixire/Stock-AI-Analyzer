# PREDICT AI — Stock Trend Analyzer: Full Build Guide

> **Purpose:** This document is a complete specification for an AI code-generation tool to recreate the **PREDICT AI** application from scratch — a hybrid ML + LLM stock trend analyzer with an institutional-grade dark dashboard frontend.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Repository Structure](#3-repository-structure)
4. [Design System](#4-design-system)
5. [Frontend Pages & Components](#5-frontend-pages--components)
6. [Backend Architecture](#6-backend-architecture)
7. [ML Pipeline](#7-ml-pipeline)
8. [LLM Integration](#8-llm-integration)
9. [Advanced Features](#9-advanced-features)
10. [API Reference](#10-api-reference)
11. [Environment Variables](#11-environment-variables)
12. [Data Flow Diagram](#12-data-flow-diagram)
13. [Page-by-Page Build Specs](#13-page-by-page-build-specs)

---

## 1. Project Overview

**PREDICT AI** is an institutional-grade stock trend analyzer that combines a Scikit-learn ML classification pipeline with LLM-generated natural language insights. The system ingests live OHLCV market data, engineers technical indicators, predicts short-term price direction with a confidence score, and then passes all context to an LLM which synthesizes a human-readable analyst report.

The frontend is a multi-page dark dashboard themed **"Quant-Precision Systems"** — a Technical Glassmorphism aesthetic built with Tailwind CSS.

**Core user journey:**
1. User searches for a stock ticker on the home page.
2. The backend fetches live OHLCV data, runs the ML model, and calls the LLM.
3. The Detailed Analysis page displays the prediction, confidence score, technical indicators, and LLM narrative.
4. The Market Dashboard gives a live multi-stock overview with AI signals.
5. The Portfolio page tracks held positions with predictive alerts.

---

## 2. Tech Stack

### Frontend
| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v3 (with custom `tailwind.config.js`) |
| Charts | Recharts (line, area, candlestick) |
| Icons | Google Material Symbols Outlined (via CDN) |
| Fonts | Inter (UI text) + JetBrains Mono (data/numbers) — Google Fonts |
| Animations | CSS keyframes (ticker tape, pulsing dots, glows) |
| State | React Context + useState/useEffect |

### Backend
| Layer | Technology |
|---|---|
| API Server | FastAPI (Python 3.11+) |
| ML Library | Scikit-learn (Random Forest Classifier) |
| Feature Engineering | pandas-ta |
| Data Ingestion | yfinance |
| LLM Integration | Anthropic Claude API (`claude-sonnet-4-20250514`) |
| XAI | SHAP |
| PDF Reports | ReportLab |
| Task Queue | Celery + Redis (for async prediction jobs) |
| Database | PostgreSQL (portfolio, user data) |
| Cache | Redis |

---

## 3. Repository Structure

```
predict-ai/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx              # Landing page / ticker search
│   │   │   ├── DetailedAnalysis.jsx  # Per-stock analysis (e.g. AAPL)
│   │   │   ├── MarketDashboard.jsx   # Multi-stock live dashboard
│   │   │   └── Portfolio.jsx         # User holdings + alerts
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── TopNavBar.jsx
│   │   │   │   ├── SideNavBar.jsx
│   │   │   │   └── TickerTape.jsx
│   │   │   ├── charts/
│   │   │   │   ├── PriceChart.jsx
│   │   │   │   ├── VolumeBar.jsx
│   │   │   │   └── PortfolioGrowth.jsx
│   │   │   ├── cards/
│   │   │   │   ├── MetricCard.jsx
│   │   │   │   ├── AISignalCard.jsx
│   │   │   │   ├── WatchlistItem.jsx
│   │   │   │   └── PredictiveAlert.jsx
│   │   │   └── ui/
│   │   │       ├── GlassPanel.jsx
│   │   │       ├── StatusPill.jsx
│   │   │       └── PulsingDot.jsx
│   │   ├── hooks/
│   │   │   ├── useStockData.js
│   │   │   └── usePrediction.js
│   │   ├── api/
│   │   │   └── client.js             # Axios instance + endpoints
│   │   ├── styles/
│   │   │   └── globals.css           # Scrollbar, glass-panel, ticker keyframes
│   │   └── App.jsx
│   ├── tailwind.config.js            # Full Quant-Precision design tokens
│   ├── index.html
│   └── package.json
│
├── backend/
│   ├── main.py                       # FastAPI app entry point
│   ├── routers/
│   │   ├── predict.py                # POST /predict
│   │   ├── market.py                 # GET /market/overview
│   │   ├── portfolio.py              # GET/POST /portfolio
│   │   └── reports.py                # GET /reports/{ticker}
│   ├── ml/
│   │   ├── pipeline.py               # Full sklearn pipeline
│   │   ├── features.py               # pandas-ta feature engineering
│   │   ├── train.py                  # Model training script
│   │   └── models/
│   │       └── rf_model.pkl          # Serialized trained model
│   ├── llm/
│   │   ├── insight_generator.py      # LLM prompt builder + API call
│   │   └── prompt_templates.py       # Jinja2 prompt templates
│   ├── agents/
│   │   ├── technical_agent.py
│   │   ├── sentiment_agent.py        # FinBERT news sentiment
│   │   └── portfolio_manager.py      # Synthesis agent
│   ├── data/
│   │   ├── ingestion.py              # yfinance fetcher
│   │   └── preprocessing.py          # Normalization, forward-fill
│   ├── xai/
│   │   └── shap_explainer.py         # SHAP value calculator
│   ├── reports/
│   │   └── pdf_generator.py          # ReportLab PDF builder
│   ├── db/
│   │   ├── models.py                 # SQLAlchemy models
│   │   └── session.py
│   ├── tasks/
│   │   └── celery_tasks.py           # Async prediction jobs
│   ├── requirements.txt
│   └── .env.example
│
├── docker-compose.yml
└── README.md
```

---

## 4. Design System

This is the **Quant-Precision Systems** design system. Every UI element must use these exact tokens. **Do not deviate.**

### 4.1 Color Palette

Apply all colors via the Tailwind config. The complete token map:

```js
// tailwind.config.js — colors section
colors: {
  // Base surfaces (deep charcoal "Deep Space")
  "background":                "#111417",
  "surface":                   "#111417",
  "surface-dim":               "#111417",
  "surface-bright":            "#37393d",
  "surface-container-lowest":  "#0b0e11",  // absolute floor, Level 0
  "surface-container-low":     "#191c1f",  // cards, Level 1
  "surface-container":         "#1d2023",
  "surface-container-high":    "#272a2e",
  "surface-container-highest": "#323538",
  "surface-variant":           "#323538",
  "surface-tint":              "#b7c4ff",

  // On-surfaces (text)
  "on-surface":                "#e1e2e7",
  "on-surface-variant":        "#c3c5d8",
  "on-background":             "#e1e2e7",
  "inverse-surface":           "#e1e2e7",
  "inverse-on-surface":        "#2e3134",

  // Borders
  "outline":                   "#8d90a1",
  "outline-variant":           "#434655",

  // Primary — Tech Blue (intelligence, system, neutral data)
  "primary":                   "#b7c4ff",
  "on-primary":                "#002681",
  "primary-container":         "#6989ff",
  "on-primary-container":      "#002172",
  "inverse-primary":           "#134ee4",
  "primary-fixed":             "#dce1ff",
  "primary-fixed-dim":         "#b7c4ff",
  "on-primary-fixed":          "#001551",
  "on-primary-fixed-variant":  "#0039b5",

  // Secondary — Neon Green (gains, bullish, success ONLY)
  "secondary":                 "#f5fff5",
  "on-secondary":              "#003920",
  "secondary-container":       "#00ffa3",
  "on-secondary-container":    "#007146",
  "secondary-fixed":           "#52ffac",
  "secondary-fixed-dim":       "#00e290",
  "on-secondary-fixed":        "#002111",
  "on-secondary-fixed-variant":"#005231",

  // Tertiary — Electric Red (losses, bearish, alerts ONLY)
  "tertiary":                  "#ffb3ac",
  "on-tertiary":               "#680008",
  "tertiary-container":        "#ff544e",
  "on-tertiary-container":     "#5c0006",
  "tertiary-fixed":            "#ffdad6",
  "tertiary-fixed-dim":        "#ffb3ac",
  "on-tertiary-fixed":         "#410003",
  "on-tertiary-fixed-variant": "#930010",

  // Error
  "error":                     "#ffb4ab",
  "on-error":                  "#690005",
  "error-container":           "#93000a",
  "on-error-container":        "#ffdad6",
}
```

**Color usage rules (strict):**
- `secondary-fixed` (`#52ffac`) → **only** for gains, positive %, bullish signals
- `tertiary-container` (`#ff544e`) → **only** for losses, negative %, bearish signals
- `primary` (`#b7c4ff`) → active states, neutral data, system accents
- Never use pure white or black

### 4.2 Typography

Dual-font strategy: **Inter** for narrative, **JetBrains Mono** for all numbers/tickers.

```js
// tailwind.config.js — fontSize section
fontSize: {
  "headline-lg": ["32px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
  "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
  "body-lg":     ["16px", { lineHeight: "1.6", fontWeight: "400" }],
  "body-sm":     ["14px", { lineHeight: "1.5", fontWeight: "400" }],
  "data-display":["18px", { lineHeight: "1",   letterSpacing: "-0.01em", fontWeight: "500" }], // JetBrains Mono
  "data-label":  ["12px", { lineHeight: "1",   fontWeight: "400" }],                          // JetBrains Mono
},
fontFamily: {
  "headline-lg":  ["Inter"],
  "headline-md":  ["Inter"],
  "body-lg":      ["Inter"],
  "body-sm":      ["Inter"],
  "data-display": ["JetBrains Mono"],
  "data-label":   ["JetBrains Mono"],
}
```

Google Fonts import (place in `<head>`):
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
```

### 4.3 Border Radius

```js
borderRadius: {
  "DEFAULT": "0.125rem",  // 2px — cards, inputs (sharp precision feel)
  "lg":      "0.25rem",   // 4px — buttons
  "xl":      "0.5rem",    // 8px — panels
  "full":    "0.75rem",   // 12px — pills/chips only
}
```

### 4.4 Spacing

```js
spacing: {
  "xs":     "4px",
  "sm":     "12px",
  "base":   "8px",
  "gutter": "16px",
  "md":     "24px",
  "margin": "24px",
  "lg":     "40px",
  "xl":     "64px",
}
```

### 4.5 Elevation System (Luminance Layering)

No traditional box shadows. Use background lightness + hairline borders:

| Level | Background | Border | Use |
|---|---|---|---|
| 0 — Floor | `#0b0e11` | none | Page background |
| 1 — Card | `#191c1f` | `1px solid rgba(43,47,54,0.5)` | Data cards, widgets |
| 2 — Overlay | `rgba(22,26,30,0.7)` + `backdrop-filter: blur(20px)` | `1px solid rgba(43,47,54,0.5)` | Modals, glass panels |
| 3 — Popover | Solid + `box-shadow: 0px 8px 24px rgba(105,137,255,0.15)` | Primary glow | Active interactions |

**Glass panel CSS class (global):**
```css
.glass-panel {
  background: rgba(22, 26, 30, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(43, 47, 54, 0.5);
}
```

### 4.6 Component Patterns

**Data Card with directional top-border glow:**
```css
.card-bullish  { border-top: 1px solid #52ffac; box-shadow: 0 -4px 12px -4px rgba(82,255,172,0.3); }
.card-bearish  { border-top: 1px solid #ff544e; box-shadow: 0 -4px 12px -4px rgba(255,84,78,0.3); }
.card-neutral  { border-top: 1px solid #b7c4ff; }
```

**Pulsing live status dot:**
```html
<span class="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
```

**Ticker tape animation:**
```css
.ticker-wrap  { width: 100%; overflow: hidden; background: #0b0e11; border-bottom: 1px solid rgba(67,70,85,0.3); }
.ticker-move  { display: inline-block; white-space: nowrap; animation: ticker 30s linear infinite; }
@keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
```
> Duplicate ticker items inside `.ticker-move` for a seamless infinite loop.

**Node background pattern (hero section):**
```css
.node-bg {
  background-image: radial-gradient(circle at 2px 2px, rgba(183,196,255,0.05) 1px, transparent 0);
  background-size: 32px 32px;
}
```

**Custom scrollbar:**
```css
::-webkit-scrollbar       { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: #0b0e11; }
::-webkit-scrollbar-thumb { background: #323538; border-radius: 2px; }
```

---

## 5. Frontend Pages & Components

### 5.1 Global Layout Shell

All inner pages (Dashboard, Analysis, Portfolio) share this shell:

```
TickerTape (h-10, fixed top-0)
  └── TopNavBar (h-16, fixed top-10, z-50)
        Branding: "PREDICT" (primary, headline-md, bold, tracking-tighter)
        Nav links: Dashboard | Markets | Portfolio | Analysis
        Right: wallet icon | notifications icon | settings icon | avatar (32x32, rounded-full)
  └── SideNavBar (w-64, fixed left-0, hidden on mobile, top starts at 72px)
        Market status dot (pulsing green) + "MARKET OPEN"
        Nav items: Overview | Watchlist | AI Signals (active) | Portfolio | Reports
        Bottom: "Upgrade to Pro" primary button + Support/API links
  └── <main> (lg:ml-64, pt-20, p-gutter)
```

### 5.2 Page: Home (Landing)

**Route:** `/`

**Sections (top to bottom):**

1. **TickerTape** — scrolling ticker with BTC/USD, ETH/USD, NVDA, AAPL, S&P 500. Duplicate all items for seamless loop.

2. **TopNavBar** — simplified version (no sidebar trigger on landing).

3. **Hero Section** (`min-h-screen`, `node-bg`, centered column):
   - Badge pill: `psychology` icon + "Next-Gen Predictive Engine Live" (primary, data-label, uppercase, tracking-widest, rounded-full border border-primary/20 bg-primary-container/10)
   - H1: `"Predict the "` + `<span class="text-primary italic">Pulse</span>` + `" of the Market"` — 6xl/8xl, extrabold, tracking-tighter
   - Subtitle paragraph (body-lg, on-surface-variant, max-w-2xl)
   - CTA buttons: "Start Free Trial" (solid primary) + "View Demo" (border primary)
   - Background blobs: `absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]` + similar secondary blob
   - Dashboard preview card (glass-panel, rounded-xl) with a top gradient line `bg-gradient-to-r from-transparent via-primary to-transparent opacity-50`

4. **"Why PREDICT" section** — 3-column grid of feature cards:
   - Card 1: `verified` icon — "99.8% Precision" — "INSTITUTIONAL GRADE" label (secondary-fixed)
   - Card 2: `speed` icon — "Sub-ms Latency" — pulsing dot + "Live Stream Connected"
   - Card 3: `neurology` icon — "LLM-Enhanced" — "Transformer Model v4.2" label
   - Each card: bg-surface-container-low, border-outline-variant/30, hover:border-primary/50, rounded-xl, p-lg

5. **Bento Grid preview** (`bg-surface-container-lowest` section):
   - 12-column grid
   - Large (col-span-8): Volatility Clustering Analysis chart — full-height bg-cover chart image
   - Small (col-span-4): "Risk Appetite" card with progress bar (85% width, bg-primary)

**Key interaction:** Ticker search input on hero → navigates to `/analysis/:ticker`

### 5.3 Page: Detailed Analysis

**Route:** `/analysis/:ticker` (example: `/analysis/AAPL`)

**Layout:** TopNavBar + SideNavBar + 12-column main grid

**Components in grid:**

1. **Ticker Header Card** (col-span-12, glass-panel, p-md, rounded-xl):
   - Company logo (32x32 img, filter invert opacity-80) + ticker symbol (headline-md, primary) + company name
   - Current price (data-display, large) + day change % (secondary-fixed if positive, tertiary-container if negative)
   - Action buttons: "Add to Watchlist" | "Set Alert" | "Generate Report"

2. **Main Price Chart** (col-span-12 lg:col-span-8):
   - Time range selector tabs: 1D | 5D | 1M | 3M | 1Y (active state: bg-primary/10 text-primary)
   - Recharts `AreaChart` with:
     - 2px stroke width
     - `linearGradient` fill: top 10% opacity → 0% at baseline
     - Bullish = secondary-fixed stroke, Bearish = tertiary-container stroke
     - Monotone curve type
   - Overlaid: SMA20, EMA50 as separate `Line` elements (dashed)
   - Volume bars at bottom (separate `BarChart`, lower height)

3. **Technical Indicators Panel** (col-span-12 lg:col-span-4):
   - RSI gauge (current value, color-coded: >70 overbought tertiary, <30 oversold secondary, else primary)
   - MACD signal (histogram bars, green/red)
   - Bollinger Band position
   - ATR (Average True Range)
   - Each indicator: label (data-label, on-surface-variant, uppercase) + value (data-display, JetBrains Mono)

4. **ML Prediction Card** (col-span-12 lg:col-span-4, glass-panel):
   - Header: `psychology` icon + "AI Prediction"
   - Large verdict: "BULLISH" (secondary-fixed) or "BEARISH" (tertiary-container) or "NEUTRAL" (primary)
   - Confidence meter: horizontal progress bar (bg-primary, width = confidence%)
   - Confidence label: e.g. "72% Confidence" (data-display)
   - Horizon: "5-Day Forecast"
   - SHAP top drivers list (3 items): feature name + contribution bar (micro bars, green/red)

5. **LLM Insight Card** (col-span-12 lg:col-span-8, glass-panel):
   - Header: "Analyst AI Report" + timestamp (data-label, on-surface-variant)
   - Streaming text area (body-sm, on-surface, line-height 1.6)
   - Loading state: animated shimmer skeleton
   - "Regenerate" button (secondary, small)
   - Sentiment bar: Bullish ←→ Bearish slider (CSS gradient)

6. **News Sentiment Row** (col-span-12):
   - 3 news cards side by side (col-span-4 each)
   - Each: source tag (data-label chip) + headline (body-sm) + sentiment badge (POSITIVE/NEGATIVE/NEUTRAL pill)

### 5.4 Page: Market Dashboard

**Route:** `/dashboard`

**Layout:** TopNavBar + SideNavBar + full-bleed main

**Components:**

1. **Summary Stats Row** (4-column grid):
   - Card 1: AI Trend ("Bullish") — `border-t-2 border-primary` — progress bar 84%
   - Card 2: S&P 500 value — `border-t-2 border-secondary-fixed`
   - Card 3: NASDAQ value — `border-t-2 border-secondary-fixed`
   - Card 4: BTC/USD value — `border-t-2 border-tertiary` (red, currently down)

2. **Main Chart Area** (col-span-8, glass-panel, flex-1):
   - Title: "Advanced Market Analysis"
   - Chart type selector: Line | Candlestick | Area | Heatmap
   - Full-height Recharts chart with price tag overlay (glass-panel, position absolute, border-primary/40)

3. **AI Signals Row** (3 cards below chart, each col-span-4):
   - AAPL: Long — `border-l-4 border-secondary-fixed` — confidence 88% — entry $187.42
   - TSLA: Short — `border-l-4 border-tertiary` — confidence 74% — entry $242.10
   - NVDA: Accumulate — `border-l-4 border-primary` — confidence 91% — entry $621.50

4. **Watchlist Sidebar** (col-span-4, glass-panel):
   - Items: MSFT | ETH | GOOGL | AMZN | SPY
   - Each item: ticker chip (8x8, bg-surface-container-highest) + name + current price + % change
   - % change: secondary-fixed if positive, tertiary-container if negative

### 5.5 Page: Portfolio

**Route:** `/portfolio`

**Layout:** TopNavBar + SideNavBar

**Components:**

1. **Summary Cards** (4-column grid):
   - Total Value: `border-l-4 border-primary`
   - Total Gain: `border-l-4 border-secondary-fixed`
   - Today's P&L: `border-l-4 border-tertiary`
   - Sharpe Ratio: `border-l-4 border-primary-container`
   - Each: label (data-label, on-surface-variant, uppercase) + value (data-display) + sub-label

2. **Portfolio Growth Chart** (col-span-8, glass-panel):
   - SVG-based area chart (or Recharts) showing portfolio value over time
   - Benchmark line (dashed, on-surface-variant/30)
   - Main performance path (primary stroke, gradient fill)
   - Pulsing dot at current endpoint
   - Y-axis: dollar values | X-axis: dates

3. **Predictive Alerts** (col-span-4, glass-panel):
   - 3 alert items:
     - Alert 1 (bullish): green left border, `trending_up` icon, ticker + action recommendation
     - Alert 2 (bearish): red left border, `trending_down` icon
     - Alert 3 (neutral): primary left border, `swap_horiz` icon

4. **Holdings Table** (full width, glass-panel):
   - Columns: Asset | Shares | Avg Cost | Current Price | Value | Gain/Loss | AI Signal | Action
   - Row colors: positive gain rows subtly tinted secondary/5, negative tinted tertiary/5
   - AI Signal column: colored pill (HOLD / BUY MORE / REDUCE)

---

## 6. Backend Architecture

### FastAPI Application (`main.py`)

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import predict, market, portfolio, reports

app = FastAPI(title="PREDICT AI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict.router,   prefix="/api/v1", tags=["Prediction"])
app.include_router(market.router,    prefix="/api/v1", tags=["Market"])
app.include_router(portfolio.router, prefix="/api/v1", tags=["Portfolio"])
app.include_router(reports.router,   prefix="/api/v1", tags=["Reports"])
```

### Key Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/v1/predict` | Full prediction pipeline for a ticker |
| `GET` | `/api/v1/market/overview` | Multi-stock market summary |
| `GET` | `/api/v1/market/{ticker}/ohlcv` | Raw OHLCV + indicators |
| `GET` | `/api/v1/market/{ticker}/indicators` | Technical indicators only |
| `GET` | `/api/v1/portfolio` | User portfolio summary |
| `POST` | `/api/v1/portfolio/holdings` | Add/update holding |
| `GET` | `/api/v1/reports/{ticker}` | Generate/fetch PDF report |

---

## 7. ML Pipeline

### 7.1 Data Ingestion (`data/ingestion.py`)

```python
import yfinance as yf
import pandas as pd

def fetch_ohlcv(ticker: str, period: str = "1y", interval: str = "1d") -> pd.DataFrame:
    """
    Fetch OHLCV data from Yahoo Finance.
    Returns a DataFrame with columns: Open, High, Low, Close, Volume
    """
    df = yf.download(ticker, period=period, interval=interval, progress=False)
    # Forward-fill missing trading days
    df = df.ffill()
    return df.dropna()
```

### 7.2 Feature Engineering (`ml/features.py`)

Use `pandas-ta` to generate all technical indicators. These become the feature matrix `X` for the ML model.

```python
import pandas as pd
import pandas_ta as ta

def engineer_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Generate technical indicator features from OHLCV data.
    """
    # --- Trend ---
    df['SMA_20']   = ta.sma(df['Close'], length=20)
    df['SMA_50']   = ta.sma(df['Close'], length=50)
    df['EMA_12']   = ta.ema(df['Close'], length=12)
    df['EMA_26']   = ta.ema(df['Close'], length=26)

    # --- Momentum ---
    df['RSI_14']   = ta.rsi(df['Close'], length=14)
    macd = ta.macd(df['Close'], fast=12, slow=26, signal=9)
    df['MACD']     = macd['MACD_12_26_9']
    df['MACD_Signal'] = macd['MACDs_12_26_9']
    df['MACD_Hist']   = macd['MACDh_12_26_9']

    # --- Volatility ---
    bb = ta.bbands(df['Close'], length=20, std=2)
    df['BB_Upper'] = bb['BBU_20_2.0']
    df['BB_Lower'] = bb['BBL_20_2.0']
    df['BB_Width'] = (df['BB_Upper'] - df['BB_Lower']) / df['Close']
    df['ATR_14']   = ta.atr(df['High'], df['Low'], df['Close'], length=14)

    # --- Volume ---
    df['OBV']      = ta.obv(df['Close'], df['Volume'])
    df['VWAP']     = ta.vwap(df['High'], df['Low'], df['Close'], df['Volume'])

    # --- Label: will price be higher in N days? ---
    FORECAST_HORIZON = 5
    df['target'] = (df['Close'].shift(-FORECAST_HORIZON) > df['Close']).astype(int)

    return df.dropna()
```

### 7.3 Model Training (`ml/train.py`)

```python
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.model_selection import TimeSeriesSplit, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
import joblib

FEATURE_COLS = [
    'SMA_20', 'SMA_50', 'EMA_12', 'EMA_26',
    'RSI_14', 'MACD', 'MACD_Signal', 'MACD_Hist',
    'BB_Width', 'ATR_14', 'OBV', 'VWAP'
]

def train_model(df):
    X = df[FEATURE_COLS]
    y = df['target']

    pipeline = Pipeline([
        ('scaler', StandardScaler()),
        ('clf', RandomForestClassifier(
            n_estimators=200,
            max_depth=10,
            min_samples_split=10,
            random_state=42,
            n_jobs=-1
        ))
    ])

    # Time-series cross-validation (NEVER use random split for financial data)
    tscv = TimeSeriesSplit(n_splits=5)
    scores = cross_val_score(pipeline, X, y, cv=tscv, scoring='accuracy')
    print(f"CV Accuracy: {scores.mean():.3f} ± {scores.std():.3f}")

    pipeline.fit(X, y)
    joblib.dump(pipeline, 'ml/models/rf_model.pkl')
    return pipeline

def predict(ticker: str) -> dict:
    import joblib
    from data.ingestion import fetch_ohlcv
    from ml.features import engineer_features

    df = engineer_features(fetch_ohlcv(ticker))
    model = joblib.load('ml/models/rf_model.pkl')

    latest = df[FEATURE_COLS].iloc[[-1]]
    prediction = model.predict(latest)[0]
    confidence = model.predict_proba(latest)[0].max()

    return {
        "ticker": ticker,
        "prediction": "BULLISH" if prediction == 1 else "BEARISH",
        "confidence": round(float(confidence), 4),
        "features": latest.to_dict(orient='records')[0]
    }
```

---

## 8. LLM Integration

### 8.1 Prompt Construction (`llm/prompt_templates.py`)

```python
ANALYST_PROMPT = """
You are a senior quantitative analyst at an institutional trading desk.
Analyze the following data for {ticker} and produce a concise, high-conviction analyst note.

## Market Data
- Current Price: ${current_price}
- 5-Day Forecast: {prediction} ({confidence}% confidence)
- RSI (14): {rsi}
- MACD Signal: {macd_signal}
- Bollinger Band Position: {bb_position}
- ATR (Volatility): {atr}

## ML Model Decision Drivers (SHAP Values)
{shap_summary}

## Instructions
1. Open with a one-sentence verdict (Bullish/Bearish/Neutral).
2. Cite the 2-3 most significant technical factors from the SHAP values.
3. Identify the primary risk to this thesis.
4. Suggest a 5-day price target range.
5. Tone: Concise, institutional, data-first. No disclaimers.
"""
```

### 8.2 LLM API Call (`llm/insight_generator.py`)

```python
import anthropic

client = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY from env

def generate_insight(prediction_data: dict, shap_values: dict) -> str:
    shap_summary = "\n".join([
        f"- {feat}: {'+' if val > 0 else ''}{val:.3f} contribution"
        for feat, val in sorted(shap_values.items(), key=lambda x: abs(x[1]), reverse=True)[:5]
    ])

    prompt = ANALYST_PROMPT.format(
        ticker=prediction_data['ticker'],
        current_price=prediction_data['current_price'],
        prediction=prediction_data['prediction'],
        confidence=round(prediction_data['confidence'] * 100),
        rsi=prediction_data['features']['RSI_14'],
        macd_signal=prediction_data['features']['MACD_Signal'],
        bb_position=prediction_data.get('bb_position', 'mid-band'),
        atr=prediction_data['features']['ATR_14'],
        shap_summary=shap_summary,
    )

    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=600,
        messages=[{"role": "user", "content": prompt}]
    )
    return message.content[0].text
```

### 8.3 Streaming Endpoint (for real-time UI typewriter effect)

```python
# routers/predict.py
from fastapi.responses import StreamingResponse

@router.post("/predict/stream")
async def predict_stream(request: PredictRequest):
    async def generate():
        with client.messages.stream(
            model="claude-sonnet-4-20250514",
            max_tokens=600,
            messages=[{"role": "user", "content": build_prompt(request)}]
        ) as stream:
            for text in stream.text_stream:
                yield f"data: {text}\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")
```

---

## 9. Advanced Features

### 9.1 SHAP Explainability (`xai/shap_explainer.py`)

```python
import shap
import joblib
import numpy as np

def get_shap_values(feature_row: dict) -> dict:
    """
    Returns per-feature SHAP contributions for the latest prediction.
    These values are passed directly into the LLM prompt.
    """
    model = joblib.load('ml/models/rf_model.pkl')
    rf_clf = model.named_steps['clf']
    scaler = model.named_steps['scaler']

    X_scaled = scaler.transform([list(feature_row.values())])
    explainer = shap.TreeExplainer(rf_clf)
    shap_vals = explainer.shap_values(X_scaled)

    # shap_vals[1] = contribution toward class 1 (BULLISH)
    return dict(zip(feature_row.keys(), shap_vals[1][0].tolist()))
```

### 9.2 Multi-Agent System (`agents/`)

**Technical Agent** — receives ML output + SHAP values, returns structured technical thesis.

**Sentiment Agent** — fetches recent news headlines, runs FinBERT to score sentiment, returns sentiment score and top 3 headlines.

```python
# agents/sentiment_agent.py
from transformers import pipeline

finbert = pipeline("text-classification", model="ProsusAI/finbert")

def analyze_sentiment(headlines: list[str]) -> dict:
    results = finbert(headlines, truncation=True)
    scores = {"positive": 0, "negative": 0, "neutral": 0}
    for r in results:
        scores[r['label'].lower()] += r['score']
    dominant = max(scores, key=scores.get)
    return {"dominant": dominant, "scores": scores, "headlines": headlines}
```

**Portfolio Manager Agent** — takes outputs from both agents, constructs final synthesis prompt to LLM.

### 9.3 Automated PDF Reports (`reports/pdf_generator.py`)

```python
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table
from reportlab.lib.styles import getSampleStyleSheet

def generate_pdf_report(ticker: str, prediction: dict, insight: str, output_path: str):
    doc = SimpleDocTemplate(output_path, pagesize=A4)
    styles = getSampleStyleSheet()
    story = []

    # Title
    story.append(Paragraph(f"PREDICT AI — {ticker} Analysis Report", styles['Title']))
    story.append(Paragraph(f"Generated: {prediction['timestamp']}", styles['Normal']))
    story.append(Spacer(1, 20))

    # Prediction summary table
    data = [
        ["Metric", "Value"],
        ["Prediction", prediction['prediction']],
        ["Confidence", f"{prediction['confidence']*100:.1f}%"],
        ["RSI (14)", f"{prediction['features']['RSI_14']:.2f}"],
        ["MACD Signal", f"{prediction['features']['MACD_Signal']:.4f}"],
    ]
    story.append(Table(data))
    story.append(Spacer(1, 20))

    # LLM Insight
    story.append(Paragraph("AI Analyst Report", styles['Heading2']))
    story.append(Paragraph(insight, styles['Normal']))

    doc.build(story)
```

---

## 10. API Reference

### `POST /api/v1/predict`

**Request body:**
```json
{
  "ticker": "AAPL",
  "horizon_days": 5,
  "include_shap": true,
  "include_llm": true
}
```

**Response:**
```json
{
  "ticker": "AAPL",
  "current_price": 189.43,
  "prediction": "BULLISH",
  "confidence": 0.78,
  "horizon_days": 5,
  "features": {
    "RSI_14": 58.3,
    "MACD_Signal": 0.412,
    "BB_Width": 0.043,
    "ATR_14": 2.87,
    "SMA_20": 187.2,
    "EMA_12": 188.1
  },
  "shap_values": {
    "MACD_Signal": 0.142,
    "RSI_14": -0.031,
    "BB_Width": 0.098
  },
  "llm_insight": "AAPL presents a moderately bullish setup over the 5-day horizon...",
  "timestamp": "2026-05-22T09:30:00Z"
}
```

### `GET /api/v1/market/overview`

**Response:**
```json
{
  "indices": {
    "SP500": { "value": 5241.53, "change_pct": 1.24 },
    "NASDAQ": { "value": 18307.98, "change_pct": 0.87 },
    "BTC_USD": { "value": 67492.20, "change_pct": 2.41 }
  },
  "ai_signals": [
    { "ticker": "AAPL", "signal": "LONG",       "confidence": 0.88, "entry": 187.42 },
    { "ticker": "TSLA", "signal": "SHORT",      "confidence": 0.74, "entry": 242.10 },
    { "ticker": "NVDA", "signal": "ACCUMULATE", "confidence": 0.91, "entry": 621.50 }
  ]
}
```

---

## 11. Environment Variables

```bash
# .env
# Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# Market Data
YAHOO_FINANCE_ENABLED=true
FINNHUB_API_KEY=...            # optional, for real-time fallback

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/predict_ai

# Redis (Celery broker)
REDIS_URL=redis://localhost:6379/0

# App
SECRET_KEY=your-secret-key
CORS_ORIGINS=http://localhost:5173
MODEL_PATH=ml/models/rf_model.pkl
FORECAST_HORIZON_DAYS=5
```

---

## 12. Data Flow Diagram

```
User enters ticker "AAPL"
        │
        ▼
[Frontend: Home.jsx]
  POST /api/v1/predict
        │
        ▼
[FastAPI: routers/predict.py]
        │
        ├──► [data/ingestion.py] ──► yfinance ──► OHLCV DataFrame
        │
        ├──► [ml/features.py] ──► pandas-ta ──► Feature Matrix X
        │
        ├──► [ml/pipeline.py] ──► RandomForestClassifier
        │         └──► prediction: "BULLISH", confidence: 0.78
        │
        ├──► [xai/shap_explainer.py] ──► SHAP values per feature
        │
        ├──► [agents/sentiment_agent.py] ──► FinBERT news sentiment
        │
        └──► [llm/insight_generator.py]
                  │
                  ├── Build structured prompt (price + prediction + SHAP + sentiment)
                  └── Anthropic Claude API ──► Natural language analyst report
                            │
                            ▼
              JSON response with all fields
                            │
                            ▼
     [Frontend: DetailedAnalysis.jsx]
       - Renders PriceChart with Recharts
       - Renders TechnicalIndicators panel
       - Renders MLPredictionCard (confidence bar)
       - Streams LLMInsightCard (SSE typewriter)
       - Renders NewsSentiment row
```

---

## 13. Page-by-Page Build Specs

### Build Order (recommended for an AI code tool)

Build in this sequence to minimize dependency issues:

1. **Design tokens** — `tailwind.config.js` with all colors, fonts, spacing, radius
2. **Global CSS** — `globals.css` with glass-panel, ticker, scrollbar, glow classes
3. **Shared components** — GlassPanel, PulsingDot, StatusPill, TickerTape, TopNavBar, SideNavBar
4. **Static pages** — Home (no API calls, static data)
5. **Backend scaffolding** — FastAPI app, routers, data ingestion
6. **ML pipeline** — feature engineering → training → predict endpoint
7. **LLM integration** — insight generator with streaming
8. **SHAP integration** — pass SHAP values into LLM prompt
9. **DetailedAnalysis page** — wire up all panels to API
10. **MarketDashboard page** — wire up market overview API
11. **Portfolio page** — wire up holdings + alerts
12. **Multi-agent system** — sentiment agent + portfolio manager agent
13. **PDF report generation** — end-of-day automation
14. **Docker Compose** — containerize frontend, backend, PostgreSQL, Redis

### Critical Implementation Notes

- **Never use random train/test split for financial time series.** Always use `TimeSeriesSplit` from sklearn.
- **Color usage is semantic and strict:** green (`secondary-fixed`) = gains only, red (`tertiary-container`) = losses only. Never swap.
- **JetBrains Mono is mandatory for all numeric output.** Use `font-data-label` or `font-data-display` Tailwind classes — not arbitrary mono fonts.
- **Recharts chart stroke width = 2px.** Area fill = vertical gradient 10% opacity at line → 0% at baseline.
- **LLM prompt must include SHAP values** so Claude can state specific feature contributions rather than generic commentary.
- **The ticker tape requires duplicated items** inside `.ticker-move` for a seamless CSS animation loop (no JS needed).
- **SideNavBar is hidden on mobile** (`hidden lg:flex`). On mobile, add a floating action button or bottom nav.
- **All API responses must include `timestamp`** in ISO 8601 format for the "Last updated" labels in the UI.
- **Prediction confidence displayed as percentage** (multiply `0.78` → `78%`) with a color-coded bar.
