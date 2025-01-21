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

My current strucuture:
```
./
├── Dockerfile.dev
├── app
│   ├── core
│   │   ├── config.py
│   │   └── ml_model
│   │       ├── ml_model.py
│   │       └── test_ml_model.py
│   ├── grpc_service
│   │   ├── __init__.py
│   │   ├── __pycache__
│   │   │   ├── __init__.cpython-311.pyc
│   │   │   ├── dws_ml_server_pb2.cpython-311.pyc
│   │   │   ├── dws_ml_server_pb2_grpc.cpython-311.pyc
│   │   │   └── grpc_server.cpython-311.pyc
│   │   ├── dws_ml_server.proto
│   │   ├── dws_ml_server_pb2.py
│   │   ├── dws_ml_server_pb2_grpc.py
│   │   └── grpc_server.py
│   ├── main.py
│   ├── requirements.txt
│   ├── services
│   │   └── search_service.py
│   └── tests
│       └── test_grpc.py
└── scripts
    └── training-data
        ├── driftwood_dataset.csv
        ├── generated_images
        │   ...
        └── images-from-csv.py
```

Packages I'm using:
```
# API and Server
grpcio
grpcio-tools
protobuf

# AI/LLM Tools
langchain
langchain-openai
langchain_huggingface

# Data Processing & ML
numpy
pandas
scikit-learn
torch
pydantic

# Development & Testing
pytest
python-dotenv

# Logging
loguru
```

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