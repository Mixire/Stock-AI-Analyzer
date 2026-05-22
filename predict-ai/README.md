# PREDICT AI — Stock Predictor

Institutional-grade stock trend analyzer with an AI-powered dashboard.

## Tech Stack
- **Frontend:** React + Vite + Tailwind CSS v4 + Recharts
- **Backend:** FastAPI + Scikit-learn + yfinance

## Setup & Running

### Backend
1. Navigate to `backend/`
2. Create virtual environment: `python3 -m venv venv`
3. Activate: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Run server: `python main.py`

### Frontend
1. Navigate to `frontend/`
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev`
4. Build: `npm run build`

## Project Structure
- `backend/ml/`: Machine Learning pipeline and feature engineering.
- `backend/routers/`: API endpoints for predictions, market data, and portfolio.
- `frontend/src/pages/`: Core application views (Home, Dashboard, Analysis, Portfolio).
- `frontend/src/components/`: Reusable UI and layout components.
