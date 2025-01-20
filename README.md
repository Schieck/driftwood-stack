# Driftwood Stack 🌊🎸

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](CONTRIBUTING.md)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)
[![Next.js](https://img.shields.io/badge/Next.js-black?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Go](https://img.shields.io/badge/go-%2300ADD8.svg?style=flat&logo=go&logoColor=white)](https://golang.org/)
[![Python](https://img.shields.io/badge/python-3670A0?style=flat&logo=python&logoColor=ffdd54)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

A production-ready, developer-friendly monorepo stack designed for rapid development of AI-powered web applications. Perfect for POCs, MVPs, and AI Micro-SaaS projects.

## 🌟 Key Features

- **Full-Stack Development**: Pre-configured Next.js frontend with Go & Python backends
- **AI/ML Ready**: Integrated with LangChain and scikit-learn for rapid AI development
- **Dual Frontend**: Customer-facing Next.js app + Internal admin panel
- **High Performance**: gRPC communication between services
- **Web3 Compatible**: Ready for blockchain integration
- **Developer Experience**: Automated code generation and comprehensive tooling

## 📊 Status

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/yourusername/driftwood-stack/actions)
[![Documentation Status](https://img.shields.io/badge/docs-latest-blue)](https://github.com/yourusername/driftwood-stack/wiki)
![Project Status](https://img.shields.io/badge/status-alpha-orange)

## 🎯 Perfect For

- Senior developers building solo projects
- Small teams needing a complete setup
- AI/ML projects requiring web interfaces
- Rapid prototyping with production-quality code

## 🚀 Quick Start

### Prerequisites

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=flat&logo=docker&logoColor=white) Required  
![Python](https://img.shields.io/badge/python-3.8+-blue.svg) Required  
![Make](https://img.shields.io/badge/Make-%23008FBA.svg?style=flat&logo=gnu&logoColor=white) Required

### Installation

> Fork the repository.

```bash
# Start your project
make start your-project-name

# Run with Docker
make docker-run
```

## 🛠️ Technology Stack

### Frontend
- [Next.js](https://nextjs.org/) - React framework for customer-facing app
- [React Router](https://reactrouter.com/) - For internal admin panel
- [shadcn/ui](https://shadcn.dev/) - Accessible component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Phosphor Icons](https://phosphoricons.com/) - Modern icon library

### Backend
#### API Gateway (Go)
- [Gin](https://gin-gonic.com/) - High-performance web framework
- [Swaggo](https://swaggo.github.io/swaggo.io/) - Swagger docs generator
- [Testcontainers](https://testcontainers.com/) - Integration testing
- [MongoDB Go Driver](https://www.mongodb.com/docs/drivers/go/current/)

#### ML Service (Python)
- [FastAPI](https://fastapi.tiangolo.com/) - Modern API framework
- [LangChain](https://python.langchain.com/) - LLM framework
- [scikit-learn](https://scikit-learn.org/) - Machine learning
- [Pydantic](https://docs.pydantic.dev/) - Data validation
- [Loguru](https://loguru.readthedocs.io/) - Logging made simple

### Infrastructure
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [GitHub Actions](https://github.com/features/actions) - CI/CD

## 📁 Project Structure

```plaintext
driftwood-stack/
├── apps/
│   ├── frontend/
│   │   ├── dws-exposed-webapp/    # Customer-facing Next.js app
│   │   └── dws-internal-webapp/   # Admin React app
│   └── backend/
│       ├── api-gateway/           # Go API Gateway
│       └── ml-service/            # Python ML Service
├── infra/                         # Infrastructure configs
└── docs/                          # Documentation
```

## 🔧 Code Generation

Generate components and services using our CLI tool:

```bash
# Setup generator
make setup-generator

# Generate components
make component project=<project-type> level=<component-level> name=<component-name>
```

### Available Options

| Project Type | Component Level | Description |
|--------------|----------------|-------------|
| exposed-webapp | atom, molecule, organism, template, page | Customer app components |
| internal-webapp | atom, molecule, organism, template, page | Admin app components |
| api-gateway | service | Go API services |
| ml-service | service, model | Python ML services |

## 🤝 Contributing

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com)

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📚 Documentation

- [Full Documentation](https://github.com/yourusername/driftwood-stack/wiki)
- [API Reference](https://github.com/yourusername/driftwood-stack/wiki/api)
- [Development Guide](https://github.com/yourusername/driftwood-stack/wiki/development)

## ⭐ Support

If you find this project helpful, please consider giving it a star!

[![Star History Chart](https://api.star-history.com/svg?repos=Schieck/driftwood-stack&type=Date)](https://star-history.com/#Schieck/driftwood-stack&Date)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [shadcn/ui](https://shadcn.dev/) for beautiful components
- [FastAPI](https://fastapi.tiangolo.com/) team for the Python framework
- All our [contributors](https://github.com/yourusername/driftwood-stack/graphs/contributors)