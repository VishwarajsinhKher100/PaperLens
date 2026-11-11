# 📚 PaperLens – AI-Powered Research Paper Explainer

[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg)](https://react.dev/)
[![Groq](https://img.shields.io/badge/Groq-GPT--OSS--120B-orange.svg)](https://groq.com/)

An intelligent full-stack AI web application designed to transform complex academic literature into clear, customized breakdowns tailored to a user's target technical depth and reading goals.

---

## 📖 System Overview

**PaperLens** bridges the gap between high-level research abstracts and deep technical comprehension. Traditional summarizers provide static text; PaperLens dynamically adapts explanations based on user parameters—generating everything from beginner-friendly analogies to intuitive code implementations and mathematical insights.

```
┌─────────────────┐       ┌─────────────────┐       ┌──────────────────────┐
│  React + Vite   │ ───>  │  FastAPI Server │ ───>  │   Groq API Engine    │
│ (Tailwind v4)   │ <───  │ (Argon2 + JWT)  │ <───  │ (openai/gpt-oss-120b)│
└─────────────────┘       └────────┬────────┘       └──────────────────────┘
                                   │
                                   ▼
                          ┌─────────────────┐
                          │   PostgreSQL    │
                          │(User & History) │
                          └─────────────────┘
```

---

## 🛠️ Architecture & System Design

PaperLens is built using a decoupled architecture prioritizing security, low-latency inference, and state persistence:

1. **Frontend Presentation Layer:** Built with React (Vite) and Tailwind CSS v4. Features a two-column responsive workspace, dynamic response parameter controls, and custom WebKit autofill styling to ensure dark-mode consistency.
2. **Backend Services & Security:** Built on FastAPI. Enforces strict authentication using **Argon2id** password hashing, stateless **JWT tokens**, and proxy-aware IP rate limiting (`SlowAPI`) set at 5 requests/min.
3. **Orchestration & LLM Layer:** Leverages **LangChain** and `ChatGroq` (`openai/gpt-oss-120b`). Structured `ChatPromptTemplate` implementations enforce strict role separation between system context and user input to mitigate prompt injection vulnerabilities.
4. **Data Persistence:** Utilizes **PostgreSQL** via SQLAlchemy ORM to manage user accounts, bookmarked paper breakdowns, and search history.

---

## 🎯 Engineering Decisions & Trade-offs

| Engineering Choice | Alternative Considered | Decision Rationale |
| :--- | :--- | :--- |
| **Groq LPU Inference (`gpt-oss-120b`)** | Standard OpenAI GPT-4 API | Selected for ultra-low latency generation times, providing near-instant responses essential for dynamic interactive user sessions. |
| **Title-to-Prompt Structuring** | Full PDF Parsing | Optimized for zero-friction user UX and fast response times. Direct title processing relies on parametric LLM knowledge while avoiding high overhead parsing pipelines. |
| **Argon2 Password Hashing** | Bcrypt / PBKDF2 | Argon2 is the winner of the Password Hashing Competition, offering superior defense against hardware-assisted GPU cracking attacks. |
| **System-User Prompt Separation** | Direct String Formatting | Isolating user inputs inside template constraints prevents adversarial prompt injections from altering instruction behavior. |

---

## 💻 Tech Stack

- **AI & Orchestration:** LangChain, `ChatGroq`, Groq API (`openai/gpt-oss-120b`)
- **Backend Infrastructure:** Python 3.11+, FastAPI, SQLAlchemy, Pydantic v2, `uv` package manager, Uvicorn
- **Security & Auth:** Argon2 (`argon2-cffi`), PyJWT (`python-jose`), `SlowAPI` (IP Rate Limiting)
- **Frontend Framework:** React (Vite), Tailwind CSS v4 (`@tailwindcss/vite`), Nginx
- **Database:** PostgreSQL
- **DevOps & Deployment:** Docker, Docker Compose

---

## ⚙️ Configuration & Environment Variables

Create the respective `.env` files prior to starting the application.

### Root Directory (`.env`)
```env
# AI Engine Credentials
GROQ_API_KEY=your_groq_api_key_here

# JWT Authentication
SECRET_KEY=your_secure_random_secret_key_here

# PostgreSQL Database Connection
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/research_explainer
```

### Frontend Directory (`frontend/.env`)
```env
VITE_API_URL=http://localhost:8000
```

---

## 🚀 Getting Started & Installation

### Option 1: Docker Compose (Recommended)

Run the entire application stack (Frontend, Backend, and Database) with a single command:

```bash
# 1. Clone the repository
git clone https://github.com/your-username/paperlens.git
cd paperlens

# 2. Spin up containers
docker compose up --build -d

# 3. Access Application
# Frontend: http://localhost
# Backend API Docs: http://localhost:8000/docs
```

### Option 2: Local Development Setup

#### 1. Database Setup
Ensure PostgreSQL is running locally and execute:
```sql
CREATE DATABASE research_explainer;
```

#### 2. Backend Setup (`uv`)
```bash
cd backend
uv sync
uv pip install psycopg2-binary sqlalchemy slowapi argon2-cffi python-jose python-multipart
uv run uvicorn src.backend.app.main:app --reload --port 8000
```

#### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Running on http://localhost:5173
```

---

## 📊 Evaluation & Safety Guardrails

- **Prompt Injection Defense:** Strict separation of system prompts and user inputs using LangChain's structured prompt templates prevents instruction overrides.
- **Payload Bound Bounds:** Strict API validation via Pydantic (`Field(max_length=...)`) prevents denial-of-service payload overflow attacks.
- **Sanitized Errors:** Production exceptions log internal tracebacks internally while returning generic error models to the client to avoid information exposure.

---

## 🔮 Future Improvements

- [ ] **RAG Architecture (Retrieval-Augmented Generation):** Integrate vector embeddings (ChromaDB/Qdrant) to allow users to ask direct Q&A against full-length uploaded paper PDFs.
- [ ] **LaTeX Formula Rendering:** Implement KaTeX on the frontend to render crisp mathematical equations.
- [ ] **Automated Export Engine:** Export generated breakdowns directly to Markdown or formatted PDF documents.
- [ ] **Academic Metadata Integration:** Automated citations, abstract retrieval, and author metrics via direct integration with ArXiv and Semantic Scholar APIs.