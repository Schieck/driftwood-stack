
# Simulated ML model logic
def predict(data):
    prediction = "positive" if data.feature1 > data.feature2 else "negative"
    confidence = abs(data.feature1 - data.feature2) / (data.feature1 + data.feature2 + 1e-5)
    return {"prediction": prediction, "confidence": round(confidence, 2)}
