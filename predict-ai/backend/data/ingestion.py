import yfinance as yf
import pandas as pd

def fetch_ohlcv(ticker: str, period: str = "1y", interval: str = "1d") -> pd.DataFrame:
    """
    Fetch OHLCV data from Yahoo Finance.
    Returns a DataFrame with columns: Open, High, Low, Close, Volume
    """
    # Use auto_adjust=True to get consistent OHLCV names
    df = yf.download(ticker, period=period, interval=interval, progress=False)
    # Forward-fill missing trading days
    df = df.ffill()
    return df.dropna()
