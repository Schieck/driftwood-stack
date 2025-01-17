from pydantic import BaseModel

class PredictionRequest(BaseModel):
    feature1: float
    feature2: float

class PredictionResponse(BaseModel):
    prediction: str
    confidence: float
