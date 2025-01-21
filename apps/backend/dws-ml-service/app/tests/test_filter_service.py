from app.services.filter_service import FilterService

def test_filter_service():
    filter_service = FilterService()
    filter_service.update_filter_values()
    filters = filter_service.get_filter_values()
    print("Filters in MongoDB:", filters)
    assert "type_of_driftwood" in filters
    assert len(filters["type_of_driftwood"]) > 0
    filter_service.close_connection()

if __name__ == "__main__":
    test_filter_service()