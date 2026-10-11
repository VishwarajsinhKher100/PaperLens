# 📚 Research Paper Explainer

> An AI-powered web application that generates concise, meaningful explanations and architectural breakdowns of research papers — tailored by paper title, technical depth, explanation style, and reading goal.

---

## 🚀 Features

- 🔍 **AI Summarization:** Generate clear summaries and code snippets using only the research paper title.
- 🎓 **Custom Technical Depth:** Choose between Beginner, Intermediate, and Expert levels.
- 🎯 **Reading Goals:** Select custom goals like Quick Summaries, Literature Reviews, or Architecture Breakdowns.
- 📏 **Adjustable Length:** Customize the length of the explanation.
- 💻 **Mathematical Insights & Analogies:** Get intuitive code snippets and relatable analogies for complex concepts.
- ⚡ **Modern Split Architecture:** Built with a high-performance FastAPI backend and a responsive React + Tailwind CSS frontend.

---

## 🛠️ Tech Stack

- **Backend:** Python, FastAPI, LangChain, LangChain-Groq, Pydantic, Uvicorn
- **Frontend:** React (Vite), Tailwind CSS
- **AI Model:** Groq API (`openai/gpt-oss-120b` via `ChatGroq`)

---

## ⚙️ Environment Variables

Create a `.env` file in your root backend directory and add your Groq API key:

```env
# AI Provider API Keys
GROQ_API_KEY=your_groq_api_key_here
```

---

## 🚀 Installation & Quick Start

Follow these steps to set up and run the project locally.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/research-paper-summarizer.git
cd research-paper-summarizer
```

### 2️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

### 3️⃣ Run the Application

```bash
uvicorn src.backend.app.main:app --reload
npm run dev
```