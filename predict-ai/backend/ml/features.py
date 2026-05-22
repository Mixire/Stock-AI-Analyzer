import pandas as pd
import pandas_ta as ta

def engineer_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Generate technical indicator features from OHLCV data.
    """
    # Create a copy to avoid SettingWithCopyWarning
    df = df.copy()
    
    # Ensure columns are simple strings
    if isinstance(df.columns, pd.MultiIndex):
        df.columns = [c[0] if isinstance(c, tuple) else c for c in df.columns]

    # --- Trend ---
    df['SMA_20']   = ta.sma(df['Close'], length=20)
    df['SMA_50']   = ta.sma(df['Close'], length=50)
    df['EMA_12']   = ta.ema(df['Close'], length=12)
    df['EMA_26']   = ta.ema(df['Close'], length=26)

    # --- Momentum ---
    df['RSI_14']   = ta.rsi(df['Close'], length=14)
    
    # MACD
    macd = ta.macd(df['Close'], fast=12, slow=26, signal=9)
    if macd is not None:
        # Debug print columns to be sure
        # print(f"MACD columns: {macd.columns}")
        df['MACD']        = macd.iloc[:, 0] # MACD_12_26_9
        df['MACD_Signal'] = macd.iloc[:, 1] # MACDs_12_26_9
        df['MACD_Hist']   = macd.iloc[:, 2] # MACDh_12_26_9

    # --- Volatility ---
    bb = ta.bbands(df['Close'], length=20, std=2)
    if bb is not None:
        # print(f"BB columns: {bb.columns}")
        # BBL_20_2.0, BBM_20_2.0, BBU_20_2.0, BBB_20_2.0, BBP_20_2.0
        df['BB_Upper'] = bb.iloc[:, 2]
        df['BB_Lower'] = bb.iloc[:, 0]
        df['BB_Width'] = (df['BB_Upper'] - df['BB_Lower']) / df['Close']
    
    df['ATR_14']   = ta.atr(df['High'], df['Low'], df['Close'], length=14)

    # --- Volume ---
    df['OBV']      = ta.obv(df['Close'], df['Volume'])
    
    # VWAP
    try:
        df['VWAP']     = ta.vwap(df['High'], df['Low'], df['Close'], df['Volume'])
    except:
        # Fallback if VWAP fails (requires datetime index usually)
        df['VWAP'] = df['Close']

    # --- Label: will price be higher in N days? ---
    FORECAST_HORIZON = 5
    df['target'] = (df['Close'].shift(-FORECAST_HORIZON) > df['Close']).astype(int)

    # Drop rows with NaN values resulting from indicators
    final_df = df.dropna()
    
    # Check if we have any rows left
    if len(final_df) == 0:
        raise ValueError("No data left after engineering features. Try a longer period.")
        
    return final_df
