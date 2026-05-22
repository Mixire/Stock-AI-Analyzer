from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import predict, market, portfolio, reports

app = FastAPI(title="PREDICT AI API", version="1.0.0")

# Enable CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "PREDICT AI API is live"}

# Include routers
app.include_router(predict.router,   prefix="/api/v1", tags=["Prediction"])
app.include_router(market.router,    prefix="/api/v1", tags=["Market"])
app.include_router(portfolio.router, prefix="/api/v1", tags=["Portfolio"])
# app.include_router(reports.router,   prefix="/api/v1", tags=["Reports"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
