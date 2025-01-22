from loguru import logger
import pandas as pd


class RecommendationService:
    def __init__(self, dataset_path):
        logger.info("Initializing RecommendationService.")
        self.dataset = pd.read_csv(dataset_path)

    def generate_recommendations(self, top_results, query_context=None, max_recommendations=5):
        """
        We need to enerate context-aware recommendations based on the top-ranked results.
        :param top_results: Top-ranked search results (list of dicts).
        :param query_context: Query context for additional filtering (dict, optional).
        :param max_recommendations: Maximum number of recommendations to return (int).
        :return: List of recommended driftwoods (dicts).
        """
        logger.info("Generating recommendations.")
        if not top_results:
            logger.warning("No top results available. Recommendations cannot be generated.")
            return []

        primary_result = top_results[0]
        recommendation_df = self.dataset[
            (self.dataset["type_of_driftwood"] == primary_result["type_of_driftwood"]) &
            (self.dataset["environment_type"] == primary_result["environment_type"])
        ]

        if query_context:
            for key, value in query_context.items():
                if key in recommendation_df.columns:
                    recommendation_df = recommendation_df[recommendation_df[key] == value]

        top_result_ids = {result["image_path"] for result in top_results}
        recommendation_df = recommendation_df[~recommendation_df["image_path"].isin(top_result_ids)]

        recommendations = recommendation_df.head(max_recommendations).to_dict(orient="records")
        logger.info(f"Generated {len(recommendations)} recommendations.")
        return recommendations
