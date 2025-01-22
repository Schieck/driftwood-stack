from app.core.config import settings
from app.services.nlp_service import NLPService
from app.services.ranking_service import RankingService
from app.services.recommendation_service import RecommendationService
import pandas as pd

class SearchService:
    def __init__(self, dataset_path=None):
        self.dataset_path = dataset_path or settings.DATASET_PATH
        self.dataset = pd.read_csv(self.dataset_path)
        self.nlp_service = NLPService()
        self.ranking_service = RankingService()
        self.recommendation_service = RecommendationService(self.dataset_path)


    def search_driftwood(self, query, filters, include_recommendations=False):
        """
        Main method to process a search request.
        """
        if query:
            parsed_filters = self._parse_query_to_filters(query)
            filters.update(parsed_filters)

        results = self._filter_dataset(filters)

        ranked_results = self.ranking_service.rank_results(results, filters)

        recommendations = []
        if include_recommendations:
            recommendations = self.recommendation_service.generate_recommendations(ranked_results, filters)

        return ranked_results, recommendations

    def _parse_query_to_filters(self, query):
        """
        Use NLPService to parse a natural language query into structured filters.
        """
        return self.nlp_service.parse_query(query)

    def _filter_dataset(self, filters):
        filtered_df = self.dataset
        for key, value in filters.items():
            if value is not None:
                filtered_df = filtered_df[filtered_df[key] == value]
        return filtered_df.to_dict(orient="records")

    def _generate_recommendations(self, results):
        if not results:
            return []
        first_type = results[0]["type_of_driftwood"]
        recommended_df = self.dataset[self.dataset["type_of_driftwood"] == first_type].head(5)
        return recommended_df.to_dict(orient="records")
