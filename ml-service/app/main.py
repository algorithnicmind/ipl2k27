"""
Cricket Intelligence AI Platform - ML Service
FastAPI application for ML inference, data processing, and prediction serving.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="CIAP ML Service",
    description="Machine Learning inference service for Cricket Intelligence AI Platform",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    """Health check endpoint for service monitoring."""
    return {"status": "healthy", "service": "ciap-ml-service", "version": "0.1.0"}


@app.get("/")
async def root():
    """Root endpoint with service information."""
    return {
        "service": "CIAP ML Service",
        "version": "0.1.0",
        "endpoints": {
            "health": "/health",
            "predict_match": "/api/v1/predict/match",
            "predict_tournament": "/api/v1/predict/tournament",
            "team_strength": "/api/v1/analytics/team-strength",
            "player_stats": "/api/v1/analytics/player-stats",
        },
    }
