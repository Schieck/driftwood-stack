from fastapi import FastAPI

app = FastAPI(
    title="Driftwood ML Service",
    description="A Python ML service with a configurable port.",
    version="1.0.0",
)

@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "ok"}
