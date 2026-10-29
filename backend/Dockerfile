FROM python:3.12-slim

# Install uv package manager
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

# Copy dependency files and source code
COPY pyproject.toml uv.lock ./
COPY . .

# Install dependencies directly using uv pip (bypasses building package & missing README.md)
RUN uv pip install --system --no-cache -r pyproject.toml

# Expose the FastAPI port
EXPOSE 8000

# Run FastAPI directly since it's installed globally in the container
CMD ["uvicorn", "src.backend.app.main:app", "--host", "0.0.0.0", "--port", "8000"]