"""
Moveo Review Service — Moveo Travel Booking Platform.
User reviews, ratings, and verified review management.
"""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI

from services.review.config import ReviewSettings
from services.review.api.routes import router
from shared.database import init_engine, close_engine
from shared.redis import init_redis, close_redis
from shared.middleware.correlation import CorrelationMiddleware
from shared.observability.logging import setup_logging
from shared.observability.metrics import setup_metrics

logger = logging.getLogger(__name__)
settings = ReviewSettings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    setup_logging(service_name="review", log_level=settings.LOG_LEVEL)
    init_engine(settings.DATABASE_URL)
    await init_redis(settings.REDIS_URL)
    logger.info("Moveo Review Service started (port=%d)", settings.REVIEW_PORT)
    yield
    await close_engine()
    await close_redis()


app = FastAPI(
    title="Moveo Review Service",
    description="User reviews, ratings, and verified review management",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(CorrelationMiddleware)
setup_metrics(app, service_name="review")

app.include_router(router, prefix="/api/review", tags=["review"])


@app.get("/health", tags=["monitoring"])
async def health():
    return {"status": "healthy", "service": "review"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("services.review.main:app", host="0.0.0.0", port=settings.REVIEW_PORT, reload=True)
