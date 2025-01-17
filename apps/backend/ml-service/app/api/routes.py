from fastapi import APIRouter
from app.api.models import PredictionRequest, PredictionResponse
from app.core.ml_model import predict

router = APIRouter()

@router.post("/predict", response_model=PredictionResponse, tags=["ML"])
async def predict_endpoint(payload: PredictionRequest):
    return predict(payload)
