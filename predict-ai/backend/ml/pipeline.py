import os
import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import TimeSeriesSplit, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from data.ingestion import fetch_ohlcv
from ml.features import engineer_features

FEATURE_COLS = [
    'SMA_20', 'SMA_50', 'EMA_12', 'EMA_26',
    'RSI_14', 'MACD', 'MACD_Signal', 'MACD_Hist',
    'BB_Width', 'ATR_14', 'OBV', 'VWAP'
]

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'models', 'rf_model.pkl')

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

    # Time-series cross-validation
    tscv = TimeSeriesSplit(n_splits=5)
    scores = cross_val_score(pipeline, X, y, cv=tscv, scoring='accuracy')
    print(f"CV Accuracy: {scores.mean():.3f} ± {scores.std():.3f}")

    pipeline.fit(X, y)
    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    joblib.dump(pipeline, MODEL_PATH)
    return pipeline

def get_model(ticker="AAPL"):
    if not os.path.exists(MODEL_PATH):
        print(f"Model not found at {MODEL_PATH}. Training with {ticker} data...")
        df = engineer_features(fetch_ohlcv(ticker))
        return train_model(df)
    return joblib.load(MODEL_PATH)

def predict_ticker(ticker: str) -> dict:
    df = engineer_features(fetch_ohlcv(ticker))
    model = get_model(ticker)

    latest = df[FEATURE_COLS].iloc[[-1]]
    prediction_idx = model.predict(latest)[0]
    confidence = model.predict_proba(latest)[0].max()

    return {
        "ticker": ticker,
        "prediction": "BULLISH" if prediction_idx == 1 else "BEARISH",
        "confidence": round(float(confidence), 4),
        "features": latest.to_dict(orient='records')[0],
        "current_price": float(df['Close'].iloc[-1]),
        "history": df[['Close']].tail(30).reset_index().rename(columns={'Date': 'time', 'Close': 'price'}).to_dict(orient='records')
    }
