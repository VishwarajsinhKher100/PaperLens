from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from langchain_core.prompts import PromptTemplate
from langchain_groq import ChatGroq
from pydantic import BaseModel

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Research Paper Explainer API",
    description="API to explain academic research papers using LangChain and Groq",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (or specify ["http://localhost:5173"])
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods including OPTIONS, POST, etc.
    allow_headers=["*"],
)

# Initialize model and template globally to avoid reloading on every request
model = ChatGroq(model="openai/gpt-oss-120b", temperature=0)

template = PromptTemplate(
    template="""
Please summarize the research paper titled "{paper_name}" with the following specifications:
- Explanation Style/Goal: 
{reading_goal}
- Explanation Length: 
{length}
- User Technical Depth: 
{tech_depth}

Requirements:
1. Mathematical Details:
    - Include relevant mathematical equations if present in the paper.
    - Explain mathematical concepts using simple, intuitive code snippets where applicable.
2. Analogies:
    - Use relatable analogies to simplify complex ideas.

If certain information is not available in the paper or if the paper is unknown, respond with: "Insufficient information available" instead of guessing.
Ensure the summary is clear, accurate, and aligned with the provided style and length.
""",
    input_variables=["paper_name", "reading_goal", "length", "tech_depth"],
    validate_template=True,
)

chain = template | model


# Define Pydantic request schema
class PaperRequest(BaseModel):
    paper_name: str
    tech_depth: str
    reading_goal: str
    length: str


@app.post("/explain-paper")
def research_paper_explainer(request: PaperRequest):
    """Explains an academic research paper tailored to user preferences."""
    try:
        result = chain.invoke(
            {
                "paper_name": request.paper_name,
                "reading_goal": request.reading_goal,
                "length": request.length,
                "tech_depth": request.tech_depth,
            }
        )
        return {"explanation": result.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
