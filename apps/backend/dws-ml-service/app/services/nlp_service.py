from langchain.prompts import PromptTemplate
from transformers import pipeline
from loguru import logger
from typing import Dict, Any
from app.services.filter_service import FilterService


class NLPService:
    def __init__(self, model_id: str = "facebook/bart-large-mnli"):
        """
        We need to setup the NLPService with a zero-shot classification model to search the filters.
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
        We need to parse a natural language query into structured filters.
        """
        try:            
            filter_values = self.filter_service.get_filter_values()
            
            filters = {key: None for key in filter_values.keys()}
                        
            for category, possible_values in filter_values.items():
                result = self.classifier(query, possible_values, multi_label=True)
                
                for label, score in zip(result["labels"], result["scores"]):
                    if score > 0.35:
                        filters[category] = label
                        break 
            
            return filters
            
        except Exception as e:
            logger.error(f"Error parsing query: {e}")
            return {key: None for key in filter_values.keys()}


class InitializationError(Exception):
    """Raised when NLPService initialization fails"""
    pass