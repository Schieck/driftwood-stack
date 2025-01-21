from app.services.nlp_service import NLPService

def test_nlp_service():
    nlp_service = NLPService()
    query = "Find a rough brown log driftwood on a sunny sandy beach"
    filters = nlp_service.parse_query(query)
    print("Parsed Filters:", filters)
    assert "texture" in filters
    assert filters["texture"] == "rough"
    assert "color" in filters
    assert filters["color"] == "brown"
    assert "location" in filters
    assert filters["environment_type"] == "beach"
    assert "weather_conditions" in filters
    assert filters["weather_conditions"] == "sunny"
    assert "location" in filters
    assert filters["location"] == "sandy beach"

if __name__ == "__main__":
    test_nlp_service()