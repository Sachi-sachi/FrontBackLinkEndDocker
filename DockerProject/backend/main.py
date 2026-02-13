from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Sachi FastAPI")

# Allow your local Vite dev server to call the API
# In dev this is fine; in prod, restrict to your domain(s).

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://web:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Schemas
class ChatRequest(BaseModel):
    message: str
    context: dict | None = None


class ChatResponse(BaseModel):
    reply: str


# Health check
@app.get("/health")
def health():
    return {"status": "ok"}


# Simple chat-like endpoint (works even if you ignore the UI)
@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    name = ""
    topic = ""
    if isinstance(req.context, dict):
        name = req.context.get("name") or ""
        topic = req.context.get("topic") or ""

    parts = []
    if name:
        parts.append(f"Hi {name}!")
    parts.append(f'Yepp Sachi the backend says hi: "{req.message}"')
    if topic:
        parts.append(f"(topic: {topic})")

    return ChatResponse(reply=" ".join(parts))
