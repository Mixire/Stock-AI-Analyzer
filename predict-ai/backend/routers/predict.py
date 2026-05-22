from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ml.pipeline import predict_ticker
from datetime import datetime

router = APIRouter()

class PredictRequest(BaseModel):
    ticker: str
    horizon_days: int = 5
    include_shap: bool = True
    include_llm: bool = False

@router.post("/predict")
async def predict(request: PredictRequest):
    try:
        prediction_data = predict_ticker(request.ticker)
        # Add timestamp and other fields for frontend consistency
        prediction_data["timestamp"] = datetime.utcnow().isoformat() + "Z"
        prediction_data["horizon_days"] = request.horizon_days
        
        # Placeholder for SHAP and LLM
        if request.include_shap:
            prediction_data["shap_values"] = {k: 0.01 for k in prediction_data["features"].keys()}
        
        if request.include_llm:
            prediction_data["llm_insight"] = "Analysis pending LLM integration..."
            
        return prediction_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
