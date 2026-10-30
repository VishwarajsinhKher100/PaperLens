# 📚 PaperLens – AI-Powered Research Paper Explainer

> PaperLens is an AI-powered web application that generates concise, meaningful explanations and architectural breakdowns of research papers — tailored by paper title, technical depth, explanation style, and reading goal.

---

## 🚀 Features

- 🔍 **AI Summarization:** Generate clear summaries and code snippets using only the research paper title.
- 🎓 **Custom Technical Depth:** Choose between Beginner, Intermediate, and Expert levels.
- 🎯 **Reading Goals:** Select custom goals like Quick Summaries, Literature Reviews, or Architecture Breakdowns.
- 📏 **Adjustable Length:** Customize the length of the explanation.
- 💻 **Mathematical Insights & Analogies:** Get intuitive code snippets and relatable analogies for complex concepts.
- ⚡ **Modern Split Architecture:** Built with a high-performance FastAPI backend and a responsive React + Tailwind CSS frontend.
- 🐳 **Containerized Deployment:** Fully dockerized setup using Docker Compose for seamless deployment.

---

## 🛠️ Tech Stack

- **Backend:** Python, FastAPI, `uv`, LangChain, LangChain-Groq, Pydantic, Uvicorn
- **Frontend:** React (Vite), Tailwind CSS, Nginx
- **Containerization:** Docker, Docker Compose
- **AI Model:** Groq API (`openai/gpt-oss-120b` via `ChatGroq`)

---

## ⚙️ Environment Variables

Create a `.env` file in the **root directory** of the project and add your Groq API key:

```env
# AI Provider API Keys
GROQ_API_KEY=your_groq_api_key_here
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
uv run uvicorn src.backend.app.main:app --reload --port 8000
```

### Frontend Setup (Vite / React)

```bash
cd frontend
npm install
npm run dev
```

- **Frontend Dev Server:** [http://localhost:5173](http://localhost:5173)
