from langchain.prompts import PromptTemplate
from transformers import pipeline
from loguru import logger
import json
from typing import Dict, Any
from app.services.filter_service import FilterService


class NLPService:
    def __init__(self, model_id: str = "facebook/bart-large-mnli"):
        """
        Initializes the NLPService with a zero-shot classification model.
        """
        try:
            logger.info(f"Initializing NLPService with model: {model_id}")
            
            # Initialize the Hugging Face pipeline
            self.classifier = pipeline("zero-shot-classification", model=model_id)
            
            # Initialize the filter service to get dynamic filter values
            self.filter_service = FilterService()
            
        except Exception as e:
            logger.error(f"Failed to initialize NLPService: {e}")
            raise InitializationError(f"NLPService initialization failed: {str(e)}")

    def parse_query(self, query: str) -> Dict[str, Any]:
        """
        Parses a natural language query into structured filters.
        """
        try:
            # Get filter values dynamically from the FilterService
            filter_values = self.filter_service.get_filter_values()
            
            # Prepare classification results
            filters = {key: None for key in filter_values.keys()}
            
            # Iterate through each classification category
            for category, possible_values in filter_values.items():
                # Perform classification for the current category
                result = self.classifier(query, possible_values, multi_label=True)
                
                # Find the best match with a confidence threshold
                for label, score in zip(result["labels"], result["scores"]):
                    if score > 0.5:  # Adjust threshold as needed
                        filters[category] = label
                        break  # Use the first match above the threshold
            
            return filters
            
        except Exception as e:
            logger.error(f"Error parsing query: {e}")
            return {key: None for key in filter_values.keys()}


class InitializationError(Exception):
    """Raised when NLPService initialization fails"""
    pass


# Example Usage
if __name__ == "__main__":
    nlp_service = NLPService()
    query = "I need a rough, dark brown driftwood log from a rocky ocean."
    filters = nlp_service.parse_query(query)
    print(filters)
