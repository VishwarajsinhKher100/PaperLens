# PaperLens – AI-Powered Research Paper Explainer

An AI-powered research paper explainer that transforms complex academic literature into clear, customized breakdowns tailored to your technical depth and reading goals.

## Overview

**PaperLens** is an intelligent web application designed to help researchers, students, and developers digest complex academic papers with ease. By leveraging Large Language Models, PaperLens takes a research paper title and transforms it into tailored explanations—ranging from beginner-friendly analogies and mathematical breakdowns to production-ready code implementations.

Whether you need a high-level 2-minute overview for a literature review or a deep architectural breakdown to understand underlying algorithms, PaperLens adapts output length, technical complexity, and specific reading goals to fit your workflow.

### Key Highlights

- **Smart Generation:** Input just a paper title to receive structured summaries, math insights, and intuitive code snippets.
- **Customizable Depth & Goals:** Tailor responses dynamically across Beginner, Intermediate, and Expert technical levels.
- **Enterprise-Grade Security:** Hardened backend with Argon2 password hashing, JWT authentication, rate limiting, and strict input validation.
- **Modern UI & Persistence:** Dark-themed, responsive split-screen UI paired with PostgreSQL storage for seamless bookmarking and history tracking.

## Features

- **AI Summarization & Insights:** Generates clear summaries, code snippets, mathematical insights, and intuitive analogies using a research paper title.
- **Customizable Depth & Goals:** Allows users to select technical depth (Beginner, Intermediate, Expert), reading goals (e.g., Quick Summaries, Literature Reviews, Architecture Breakdowns), and adjustable explanation lengths.
- **User Authentication & Persistence:** Features secure JWT token authentication with Argon2 password hashing and PostgreSQL storage for bookmarking and history tracking.
- **Responsive UI:** Built with Tailwind CSS v4 featuring a dark-themed, two-column layout, fixed-height scrollable output, and custom input autofill protection.
- **Hardened Security & Rate Limiting:** Includes proxy-aware IP rate limiting (`SlowAPI`), Pydantic input bounds, prompt injection defenses, password complexity enforcement, and sanitized internal error logging.

## Architecture and Approach

- **Tech Stack:** Built with a FastAPI backend, React (Vite) + Tailwind CSS v4 frontend, and a PostgreSQL database. It utilizes Python, SQLAlchemy, LangChain, LangGroq, Uvicorn, and Docker.
- **AI Model:** Integrates the Groq API (`openai/gpt-oss-120b` via `ChatGroq`).
- **Security & Approach:** Employs input isolation via structured `ChatPromptTemplate` with separate system and user roles to defend against prompt injections, strict Pydantic payload validation, CORS restrictions, and IP-based rate limiting (`SlowAPI`).
- **Containerization:** Fully dockerized using Docker Compose to run the frontend, backend, and database simultaneously.

## Getting Started & Installation

- Using Docker (Recommended):
    1. Clone the repository: git clone [https://github.com/your-username/research-paper-summarizer.git](https://github.com/your-username/research-paper-summarizer.git) and enter the directory.
    2. Build and run containers: `docker compose up --build -d`.
    3. Access the frontend application at `http://localhost:5173` and the backend API docs at `http://localhost:8000/docs`.

- Local Development Setup:
    - Database: Create a PostgreSQL database named `research_explainer`.
    - Backend: Run `uv sync`, install dependencies via `uv`, and start the app using `uvicorn src.backend.app.main:app --reload --port 8000`.
    - Frontend: Run `npm install` followed by `npm run dev` in the frontend directory to launch the dev server at `http://localhost:5173`.

## Configuration & Environment Variables

- Root Directory (`.env`):
    - `GROQ_API_KEY`: API key for Groq.
    - `SECRET_KEY`: Secret key for JWT authentication.
    - `DATABASE_URL`: PostgreSQL connection string (e.g., postgresql://postgres:your_password@localhost:5432/research_explainer).

- Frontend Directory (frontend/.env):
    - `VITE_API_URL`: Configures dynamic API URL parameters for Vite (e.g., `http://localhost:8000`).

## Usage & Inference

- Access the web interface and input a research paper title.
- Configure your preferred technical depth, reading goals, and length parameters.
- The backend leverages the Groq model (`openai/gpt-oss-120b`) to perform inference and generate structured breakdowns, math insights, and code snippets. 
- View outputs in the constrained, scrollable viewport and save or bookmark generated insights directly to the PostgreSQL database.

## Limitation & Ethical Consideration

- Current Limitations: The system currently relies heavily on generating breakdowns using the research paper title rather than direct full-text PDF file uploads or pre-print parsing.
- Ethical & Security Considerations: Employs strict prompt injection defenses through isolated system and user prompt roles, enforced password complexity rules, Argon2 password hashing, and rate limiting (5 req/min) to prevent abuse and ensure secure multi-user handling.

## Future Improvement

- **PDF Upload & Parsing:** Add support for direct PDF file uploads to process user-provided papers and pre-prints.
- **RAG Integration:** Implement vector store embeddings (e.g., ChromaDB, Qdrant) to allow deep Q&A capabilities over entire research papers.
- **LaTeX Math Rendering:** Integrate KaTeX or MathJax on the frontend for clean, readable mathematical formula rendering.
- **Export Capabilities:** Enable exporting generated summaries and breakdowns as PDF or Markdown files.
- **API Integrations:** Fetch paper metadata, citations, abstracts, and authors directly via ArXiv and Semantic Scholar APIs.