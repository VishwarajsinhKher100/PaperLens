# 📚 PaperLens – AI-Powered Research Paper Explainer

An AI-powered research paper explainer that transforms complex academic literature into clear, customized breakdowns tailored to your technical depth and reading goals.

## 📖 Overview

**PaperLens** is an intelligent web application designed to help researchers, students, and developers digest complex academic papers with ease. By leveraging Large Language Models, PaperLens takes a research paper title and transforms it into tailored explanations—ranging from beginner-friendly analogies and mathematical breakdowns to production-ready code implementations.

Whether you need a high-level 2-minute overview for a literature review or a deep architectural breakdown to understand underlying algorithms, PaperLens adapts output length, technical complexity, and specific reading goals to fit your workflow.

### Key Highlights
- **Smart Generation:** Input just a paper title to receive structured summaries, math insights, and intuitive code snippets.
- **Customizable Depth & Goals:** Tailor responses dynamically across Beginner, Intermediate, and Expert technical levels.
- **Enterprise-Grade Security:** Hardened backend with Argon2 password hashing, JWT authentication, rate limiting, and strict input validation.
- **Modern UI & Persistence:** Dark-themed, responsive split-screen UI paired with PostgreSQL storage for seamless bookmarking and history tracking.

## 🚀 Features

- 🔍 **AI Summarization:** Generate clear summaries and code snippets using only the research paper title.
- 🎓 **Custom Technical Depth:** Choose between Beginner, Intermediate, and Expert levels.
- 🎯 **Reading Goals:** Select custom goals like Quick Summaries, Literature Reviews, or Architecture Breakdowns.
- 📏 **Adjustable Length:** Customize the length of the explanation.
- 💻 **Mathematical Insights & Analogies:** Get intuitive code snippets and relatable analogies for complex concepts.
- 🎨 **Responsive Two-Column Dark Theme UI:** Sleek, modern two-column layout built with Tailwind CSS, featuring fixed-height scrollable output and custom input autofill protection.
- 🔐 **User Authentication:** Full JWT token authentication with Argon2 password hashing and frontend validation rules.
- 🗄️ **User Saved History & Bookmarking:** Save generated paper explanations and key insights directly into a PostgreSQL database.
- 🛡️ **Hardened Security & Rate Limiting:** Proxy-aware IP rate limiting (`SlowAPI`), strict Pydantic input bounds, prompt injection defenses, password complexity enforcement, and sanitized internal error logging.
- ⚡ **Modern Split Architecture:** Built with a high-performance FastAPI backend and a fast, responsive React + Tailwind CSS v4 frontend.
- 🐳 **Containerized Deployment:** Fully dockerized setup using Docker Compose for seamless deployment.

---

## 🛠️ Tech Stack

- **Backend:** Python, FastAPI, SQLAlchemy, PostgreSQL, `uv`, LangChain, LangChain-Groq, Pydantic, SlowAPI, Uvicorn, Argon2, PyJWT (`python-jose`)
- **Frontend:** React (Vite), Tailwind CSS v4 (`@tailwindcss/vite`), Nginx
- **Database:** PostgreSQL
- **Containerization:** Docker, Docker Compose
- **AI Model:** Groq API (`openai/gpt-oss-120b` via `ChatGroq`)

---

## ⚙️ Environment Variables

### Root Directory (`.env`)
Create a `.env` file in the **root directory** of the project and add your Groq API key, JWT Secret Key, and PostgreSQL connection string:

```env
# AI Provider API Keys
GROQ_API_KEY=your_groq_api_key_here

# JWT Authentication Secret Key
SECRET_KEY=your_secure_random_secret_key_here

# PostgreSQL Database Connection URL
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/research_explainer
```

### Frontend Directory (`frontend/.env`)
To configure dynamic API URL parameters for Vite:

```env
VITE_API_URL=http://localhost:8000
```

---

## 🐳 Running with Docker (Recommended)

The easiest way to run the entire application (Frontend, Backend, and PostgreSQL database) is using Docker Compose.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/research-paper-summarizer.git
cd research-paper-summarizer
```

### 2️⃣ Build and Run Containers

```bash
docker compose up --build -d
```

### 3️⃣ Access the Application

- **Frontend Application:** [http://localhost](http://localhost)
- **Backend API & Swagger Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)

### 4️⃣ Stop the Application

```bash
docker compose down
```

---

## 💻 Local Development Setup

If you prefer running the backend, database, and frontend separately without Docker:

### Database Setup

Ensure PostgreSQL is running locally and create the database:

```sql
CREATE DATABASE research_explainer;
```

### Backend Setup (`uv`)

```bash
cd backend
uv sync
# Install required dependencies
uv pip install psycopg2-binary sqlalchemy slowapi argon2-cffi python-jose python-multipart
uv run uvicorn src.backend.app.main:app --reload --port 8000
```

### Frontend Setup (Vite / React + Tailwind CSS v4)

```bash
cd frontend
npm install
npm run dev
```

- **Frontend Dev Server:** [http://localhost:5173](http://localhost:5173)

---

## 🔒 Security & UX Enhancements Applied

- **JWT & Argon2 Authentication:** Password hashing using Argon2 with JWT token generation and storage.
- **Password Complexity Validation:** Enforcement of minimum length (8 characters) and mandatory numeric character rules on registration via Pydantic validators.
- **Strict Secret Key Requirement:** Application fails startup if `SECRET_KEY` environment variable is not defined.
- **PostgreSQL Database Storage:** ORM management for user accounts, search history, and bookmarked insights.
- **CORS Restricted:** Explicit origin whitelisting (`http://localhost:5173`) replacing wildcards.
- **Prompt Injection Defense:** Input isolation using structured `ChatPromptTemplate` with separate system and user roles.
- **Input Bounds:** Pydantic `Field(max_length=...)` validation on payload strings.
- **Rate Limiting:** IP-based limit (5 req/min) reading `X-Forwarded-For` for reverse-proxy compatibility.
- **Sanitized Errors:** Internal exception logging while returning generic status codes to prevent data leaks.
- **Autofill Protection:** Custom WebKit autofill styling rules preventing browser defaults from overriding the dark theme on input paste.
- **Constrained Layout:** Scrollable output viewport restricting expansion when detailed explanations are generated.

---

## 🔮 Future Improvements

- 📄 **PDF Upload & Parsing:** Support direct PDF file uploads to process user-provided papers and pre-prints directly.
- 🧠 **RAG Integration (Retrieval-Augmented Generation):** Implement vector store embeddings (e.g., ChromaDB, Qdrant) to enable deep Q&A over whole research papers.
- 📊 **LaTeX Math Rendering:** Add KaTeX or MathJax rendering on the frontend for crisp, readable math formulas.
- 📜 **Export Capabilities:** Export generated summaries and breakdowns directly as PDF or Markdown files.
- 🔍 **ArXiv & Semantic Scholar API Integration:** Automatically fetch paper metadata, citations, abstracts, and authors via direct API connections.