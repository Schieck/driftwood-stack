def get_prompt() -> str:
    return """Create a Python FastAPI service for machine learning.

Technical Requirements:
- Use Pydantic v2 models for request/response validation
- Implement proper error handling and logging
- Include comprehensive API documentation
- Implement proper async handling
- Include proper monitoring and metrics
- Implement proper model versioning
- Include health checks
- Follow ML service best practices

Service Specifications:
Details: {description}

The service should include:
1. Pydantic models for request/response
2. Proper error handling
3. Comprehensive logging
4. Model versioning support
5. Health check endpoints
6. Metrics collection
7. Input validation
8. Unit tests

Please include all necessary imports and type hints."""