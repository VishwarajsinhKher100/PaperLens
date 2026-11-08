# 📚 PaperLens – AI-Powered Research Paper Explainer

> PaperLens is an AI-powered web application that generates concise, meaningful explanations and architectural breakdowns of research papers — tailored by paper title, technical depth, explanation style, and reading goal.

---

## 🚀 Features

- 🔍 **AI Summarization:** Generate clear summaries and code snippets using only the research paper title.
- 🎓 **Custom Technical Depth:** Choose between Beginner, Intermediate, and Expert levels.
- 🎯 **Reading Goals:** Select custom goals like Quick Summaries, Literature Reviews, or Architecture Breakdowns.
- 📏 **Adjustable Length:** Customize the length of the explanation.
- 💻 **Mathematical Insights & Analogies:** Get intuitive code snippets and relatable analogies for complex concepts.
- 🎨 **Responsive Two-Column Dark Theme UI:** Sleek, modern two-column layout built with Tailwind CSS, featuring fixed-height scrollable output and custom input autofill protection.
- 🛡️ **Hardened Security & Rate Limiting:** Proxy-aware IP rate limiting (`SlowAPI`), strict Pydantic input bounds, prompt injection defenses, and sanitized internal error logging.
- ⚡ **Modern Split Architecture:** Built with a high-performance FastAPI backend and a fast, responsive React + Tailwind CSS v4 frontend.
- 🐳 **Containerized Deployment:** Fully dockerized setup using Docker Compose for seamless deployment.

---

## 🛠️ Tech Stack

- **Backend:** Python, FastAPI, `uv`, LangChain, LangChain-Groq, Pydantic, SlowAPI, Uvicorn
- **Frontend:** React (Vite), Tailwind CSS v4 (`@tailwindcss/vite`), Nginx
- **Containerization:** Docker, Docker Compose
- **AI Model:** Groq API (`openai/gpt-oss-120b` via `ChatGroq`)

---

## ⚙️ Environment Variables

### Root Directory (`.env`)
Create a `.env` file in the **root directory** of the project and add your Groq API key:

```env
# AI Provider API Keys
GROQ_API_KEY=your_groq_api_key_here
```

### Frontend Directory (`frontend/.env`)
To configure dynamic API URL parameters for Vite:

```env
VITE_API_URL=http://localhost:8000
```

---

## 🐳 Running with Docker (Recommended)

The easiest way to run the entire application (both Frontend and Backend) is using Docker Compose.

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

If you prefer running the backend and frontend separately without Docker:

### Backend Setup (`uv`)

```bash
cd backend
uv sync
# Install security and rate limiting package if not present
uv pip install slowapi
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
- 🔐 **User Authentication & Saved History:** Allow users to save past paper explanations and bookmark key insights.