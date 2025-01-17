# Driftwood Stack 🌊🎸

A simple, powerful, and developer-friendly monorepo stack designed for building Proof of Concepts (POC/MVP), AI Micro-SAAS and scalable small web applications with AI/Machine Learning components.

> **Note:** This stack is optimized for solo developers (Senior ones) or small teams. For larger teams or projects, consider breaking it into multiple repositories to facilitate scalability and collaboration.

## Table of Contents

- [Project Overview](#project-overview)
- [Progress](#progress)
- [Getting Started](#getting-started)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This project is organized into three main parts:

1. **Frontend**: Built with [Next.js](https://nextjs.org/), [shadcn](https://shadcn.dev/), and [Tailwind CSS](https://tailwindcss.com/).
2. **Backend**: Powered by Go and Python.
   - **API Gateway** (Go): Utilizes [Gin](https://gin-gonic.com/), [Swaggo](https://swaggo.github.io/swaggo.io/), [Testcontainers](https://testcontainers.com/), and the [MongoDB Go Driver](https://www.mongodb.com/docs/drivers/go/current/).
   - **ML Service** (Python): Employs [FastAPI](https://fastapi.tiangolo.com/), [Uvicorn](https://www.uvicorn.org/), [Pydantic](https://docs.pydantic.dev/), [NumPy](https://numpy.org/), [LangChain](https://python.langchain.com/), [scikit-learn](https://scikit-learn.org/stable/), and [Loguru](https://loguru.readthedocs.io/en/stable/).
3. **Infrastructure**: Managed with [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/), and [GitHub Actions](https://github.com/features/actions) for CI/CD.

## Progress

- [x] Basic General Setup
- [x] Infrastructure Setup
- [x] Basic Backend Setup (Go & Python, especially for AI implementations)
- [x] Basic Frontend Setup
- [ ] Implemented completely functional frontend and backend.



## Getting Started

To run this template locally, execute the following command:

```bash
make docker-run
```

## Technologies Used

- **Frontend**:
  - [Next.js](https://nextjs.org/): The React Framework for the Web.
  - [shadcn](https://shadcn.dev/): A component library for building accessible and customizable UI components.
  - [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapid UI development.

- **Backend**:
  - **API Gateway** (Go):
    - [Gin](https://gin-gonic.com/): A high-performance HTTP web framework.
    - [Swaggo](https://swaggo.github.io/swaggo.io/): Tools to create and maintain API documentation.
    - [Testcontainers](https://testcontainers.com/): Provides lightweight, throwaway instances of common databases, Selenium web browsers, or anything else that can run in a Docker container.
    - [MongoDB Go Driver](https://www.mongodb.com/docs/drivers/go/current/): Official MongoDB driver for Go.

  - **ML Service** (Python):
    - [FastAPI](https://fastapi.tiangolo.com/): A modern, fast (high-performance) web framework for building APIs with Python.
    - [Uvicorn](https://www.uvicorn.org/): A lightning-fast ASGI server implementation.
    - [Pydantic](https://docs.pydantic.dev/): Data validation and settings management using Python type annotations.
    - [NumPy](https://numpy.org/): The fundamental package for scientific computing with Python.
    - [LangChain](https://python.langchain.com/): A framework for developing applications powered by language models.
    - [scikit-learn](https://scikit-learn.org/stable/): A machine learning library for Python.
    - [Loguru](https://loguru.readthedocs.io/en/stable/): A library to simplify logging in Python.

- **Infrastructure**:
  - [Docker](https://www.docker.com/): Platform for developing, shipping, and running applications in containers.
  - [Docker Compose](https://docs.docker.com/compose/): A tool for defining and running multi-container Docker applications.
  - [GitHub Actions](https://github.com/features/actions): Automate, customize, and execute software development workflows directly in your repository.

## Project Structure

```plaintext
driftwood-stack/
├── frontend/           # Next.js application
├── backend/
│   ├── api-gateway/    # Go-based API Gateway
│   └── ml-service/     # Python-based Machine Learning Service
├── infrastructure/     # Docker and CI/CD configurations
└── README.md           # Project documentation
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or suggestions.

Obs.: Use the Workspace, and install dependencies for each project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details. 