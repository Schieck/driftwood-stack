# Driftwood Stack 🌊🎸

A simple, powerful, and developer-friendly web, web3, monorepo stack designed for building Proof of Concepts (POC/MVP), AI Micro-SAAS and scalable small web applications with AI/Machine Learning components.

A few signs that could be useful for you:
- You're a senior testing something solo, and you knows that it has the entire setup ready, that if done manually would take some hours to build.
- The setup is complete for a basic operation, enabling customer access, and a special access for the admins.
- It already supports most of the things a UI/UX would ask you to implement.
- With the ability to quickly implement AI tools, it enables you to easily solve real world problems, instead of just creating a python script or something so specific that most people will never use.
- It uses gRCP communication between the two apis, so it's really fast.
- You can easily implement WEB3 tools if needed, such as wallets and other stuff.

> **Note:** This stack is optimized for solo developers (Senior ones) or small teams. For larger teams or projects, consider breaking it into multiple repositories to facilitate scalability and collaboration.

## Table of Contents

- [Project Overview](#project-overview)
- [Progress](#progress)
- [Getting Started](#getting-started)
- [Code Generation](#code-generation)
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
- [ ] Make to rename for the new project
- [ ] Finish first version of the component generator
- [ ] Adjust prompts for better results
- [ ] Implement CI/CD with artifacts ready for deploy
- [ ] Implemented completely functional frontend and backend using all the tools



## Getting Started

> Fork this project and start from it. 


### Pre-requisites
- A running python
- Support to run Makefiles
- A running docker

To run this template locally, execute the following command:

```bash
make start <name-of-your-project>
make docker-run
```

# Code Generation

The Driftwood Stack provides a code generation tool that helps you quickly scaffold components, services, and pages across different parts of the project. You can generate code either as blank templates or using AI assistance.

## Command Structure

```bash
make setup-generator
make component project=<project-type> level=<component-level> name=<component-name>
```

### Project Types
- `exposed-webapp`: Customer-facing Next.js application
- `internal-webapp`: Admin/Internal React application
- `api-gateway`: Go-based API services
- `ml-service`: Python-based Machine Learning services

### Component Levels
- Frontend (`exposed-webapp`, `internal-webapp`):
  - `atom`: Basic UI components
  - `molecule`: Composite components
  - `organism`: Complex UI sections
  - `template`: Page templates
  - `page`: Full pages
- Backend:
  - `service`: API or ML services
  - `model`: Data models (ML service only)


## Technologies Used

- **Frontend**:
  - For the exposed app, [Next.js](https://nextjs.org/): The React Framework for the Web.
  - For the internal app, [React Router](https://reactrouter.com/): The React Router.
  - [shadcn](https://shadcn.dev/): A component library for building accessible and customizable UI components.
  - [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapid UI development.
  - [Phosphor Icons](https://phosphoricons.com/): The icons you need for your frontend.

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
├── apps
│  ├── frontend/           
|  |   ├── dws-exposed-webapp # Next.js application, recommended for landing pages / customer facing app.
|  |   └── dws-internal-webapp # React Router application, recommended for admin / configuration.
│  └── backend/
│     ├── api-gateway/    # Go-based API Gateway
│     └── ml-service/     # Python-based Machine Learning Service
├── infra/     # Docker and CI/CD configurations
└── README.md           # Project documentation
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or suggestions.

Obs.: Use the Workspace, and install dependencies for each project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details. 