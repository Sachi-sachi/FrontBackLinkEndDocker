# Python slim image
FROM python:3.11-slim

WORKDIR /app

# System deps (optional but handy for builds)
RUN apt-get update && apt-get install -y --no-install-recommends build-essential && rm -rf /var/lib/apt/lists/*

# Install Python deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# App code
COPY . .

# Run uvicorn (hot reload for dev)
# Note: host=0.0.0.0 lets Docker expose the port
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]