from fastapi import APIRouter

router = APIRouter()

@router.get("/portfolio")
async def get_portfolio():
    return {
        "summary": {
            "total_value": 124500.00,
            "total_gain": 15420.50,
            "today_pnl": -1240.20,
            "sharpe_ratio": 2.14
        },
        "holdings": [
            { "asset": "AAPL", "shares": 150, "avg_cost": 172.40, "current_price": 189.43, "value": 28414.50, "gain_loss": 2554.50, "signal": "HOLD" },
            { "asset": "NVDA", "shares": 40, "avg_cost": 450.00, "current_price": 950.00, "value": 38000.00, "gain_loss": 20000.00, "signal": "BUY MORE" },
            { "asset": "BTC", "shares": 0.5, "avg_cost": 42000.00, "current_price": 67492.20, "value": 33746.10, "gain_loss": 12746.10, "signal": "REDUCE" }
        ],
        "alerts": [
            { "type": "bullish", "ticker": "AAPL", "text": "Approaching resistance at $192. Potential breakout signal." },
            { "type": "bearish", "ticker": "TSLA", "text": "Model predicts 5% downside over next 3 days." }
        ]
    }
