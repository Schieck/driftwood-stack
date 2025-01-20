from app.core.ml_model import predict

def test_predict_positive():
    data = {"feature1": 1.0, "feature2": 0.5}
    result = predict(data)
    assert result["prediction"] == "positive"
    assert 0 <= result["confidence"] <= 1
