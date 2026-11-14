import re
from pydantic import BaseModel, EmailStr, Field, field_validator


class UserRegister(BaseModel):
    email: EmailStr
    password: str

    @field_validator("password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters long")
        if not re.search(r"\d", v):
            raise ValueError("Password must contain at least one number")
        return v


class PaperRequest(BaseModel):
    paper_name: str = Field(..., max_length=200)
    tech_depth: str = Field(..., max_length=50)
    reading_goal: str = Field(..., max_length=100)
    length: str = Field(..., max_length=50)


class SavePaperRequest(PaperRequest):
    explanation: str
    is_bookmarked: int = 0
