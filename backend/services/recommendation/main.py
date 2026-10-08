"""
Moveo Recommendation Service — Moveo Travel Booking Platform.
Personalized recommendations, popular routes, and trending destinations.
"""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI

from services.recommendation.config import RecommendationSettings
from services.recommendation.api.routes import router
from shared.database import init_engine, close_engine
from shared.redis import init_redis, close_redis
from shared.middleware.correlation import CorrelationMiddleware
from shared.observability.logging import setup_logging
from shared.observability.metrics import setup_metrics

logger = logging.getLogger(__name__)
settings = RecommendationSettings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    setup_logging(service_name="recommendation", log_level=settings.LOG_LEVEL)
    init_engine(settings.DATABASE_URL)
    await init_redis(settings.REDIS_URL)
    logger.info("Moveo Recommendation Service started (port=%d)", settings.RECOMMENDATION_PORT)
    yield
    await close_engine()
    await close_redis()


app = FastAPI(
    title="Moveo Recommendation Service",
    description="Personalized recommendations, popular routes, and trending destinations",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(CorrelationMiddleware)
setup_metrics(app, service_name="recommendation")

app.include_router(router, prefix="/api/recommendation", tags=["recommendation"])


@app.get("/health", tags=["monitoring"])
async def health():
    return {"status": "healthy", "service": "recommendation"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("services.recommendation.main:app", host="0.0.0.0", port=settings.RECOMMENDATION_PORT, reload=True)
