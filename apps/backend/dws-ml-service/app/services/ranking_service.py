import numpy as np
from loguru import logger


class RankingService:
    def __init__(self):
        logger.info("Initializing RankingService.")

    def rank_results(self, results, query_context):
        """
        We need to Rank the filtered results based on relevance to the query context.
        :param results: List of filtered results (dicts).
        :param query_context: Parsed query context (dict).
        :return: List of ranked results with scores.
        """
        logger.info(f"Ranking {len(results)} results with query context: {query_context}")

        scored_results = [
            {
                **result,
                "score": self._calculate_score(result, query_context)
            }
            for result in results
        ]

        ranked_results = sorted(scored_results, key=lambda x: x["score"], reverse=True)

        logger.info(f"Ranking completed. Top result: {ranked_results[0] if ranked_results else 'None'}")
        return ranked_results

    def _calculate_score(self, result, query_context):
        """
        We meed tp calculate a relevance score for a result based on the query context.
        :param result: A single search result (dict).
        :param query_context: Parsed query context (dict).
        :return: Relevance score (float).
        """
        score = 0

        for key, value in query_context.items():
            if key in result and result[key] == value:
                score += 1  # We should increment score for exact matches

        # We should adjust for contextual factors
        match_texture = "texture" in result and result["texture"] == query_context.get("texture")
        match_environment_type = "environment_type" in result and result["environment_type"] == query_context.get("environment_type")
        
        if match_texture and match_environment_type:
            score += 0.6
        elif match_texture or match_environment_type:
            score += 0.2

        return round(score, 2)
