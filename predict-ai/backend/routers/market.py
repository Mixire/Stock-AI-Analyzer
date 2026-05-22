from fastapi import APIRouter
import random

router = APIRouter()

@router.get("/market/overview")
async def get_market_overview():
    return {
        "indices": {
            "SP500": { "value": 5241.53, "change_pct": 0.42 },
            "NASDAQ": { "value": 18307.98, "change_pct": 1.15 },
            "BTC_USD": { "value": 67492.20, "change_pct": -0.84 }
        },
        "ai_signals": [
            { "ticker": "AAPL", "signal": "LONG",       "confidence": 0.92, "entry": 182.50 },
            { "ticker": "TSLA", "signal": "SHORT",      "confidence": 0.74, "entry": 155.00 },
            { "ticker": "NVDA", "signal": "ACCUMULATE", "confidence": 0.88, "entry": 950.00 }
        ]
    }
