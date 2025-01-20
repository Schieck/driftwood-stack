def get_prompt() -> str:
    return """Create a Go service for the API gateway.

Technical Requirements:
- Follow Go best practices and idioms
- Implement proper error handling and logging
- Include comprehensive swagger documentation
- Implement proper middleware handling
- Include proper context handling
- Implement rate limiting and request validation
- Include proper health checks
- Follow the service pattern

Service Specifications:
Details: {description}

The service should include:
1. Proper request/response structures
2. Error handling middleware
3. Logging and monitoring
4. Unit tests
5. Documentation
6. Health check endpoints
7. Rate limiting
8. Input validation

Please include all necessary imports and types."""