from app.services.ranking_service import RankingService

def test_ranking_service():
    # Arrange
    ranking_service = RankingService()
    results = [
        {"id": "1", "type": "log", "color": "brown", "texture": "rough"},
        {"id": "2", "type": "branch", "color": "gray", "texture": "smooth"},
        {"id": "3", "type": "log", "color": "brown", "texture": "smooth"},
        {"id": "4", "type": "log", "color": "brown", "texture": "rough", "weather_conditions": "sunny"},
        {"id": "5", "type": "log", "color": "brown", "texture": "smooth", "weather_conditions": "sunny", "environment_type": "beach"}, 
    ]
    query_context = {"type": "log", "color": "brown", "texture": "rough", "weather_conditions": "sunny"}

    # Act
    ranked_results = ranking_service.rank_results(results, query_context)

    # Assert
    assert ranked_results[0]["id"] == "4"
    assert ranked_results[0]["score"] > ranked_results[1]["score"]

    print("Ranked Results:", ranked_results)

if __name__ == "__main__":
    test_ranking_service()
