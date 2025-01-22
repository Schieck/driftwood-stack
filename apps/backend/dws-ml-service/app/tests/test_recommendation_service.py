from app.services.recommendation_service import RecommendationService


def test_recommendation_service():
    # Arrange
    dataset_path = "scripts/training-data/driftwood_dataset.csv"
    recommendation_service = RecommendationService(dataset_path)

    top_results = [
        {"image_path": "1", "environment_type": "riverbank", "type_of_driftwood": "log"},
        {"image_path": "2", "environment_type": "beach", "type_of_driftwood": "root"},
    ]

    query_context = {"weather": "sunny"}

    # Act
    recommendations = recommendation_service.generate_recommendations(top_results, query_context)

    # Assert
    print("Recommendations:", recommendations)
    assert len(recommendations) > 0
    assert all(rec["type_of_driftwood"] == "log" for rec in recommendations)
    assert all(rec["environment_type"] == "riverbank" for rec in recommendations)

if __name__ == "__main__":
    test_recommendation_service()
