"""
Moveo Loyalty Service — Moveo Travel Booking Platform.
Loyalty points, membership tiers, and reward redemptions.
"""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI

from services.loyalty.config import LoyaltySettings
from services.loyalty.api.routes import router
from shared.database import init_engine, close_engine
from shared.redis import init_redis, close_redis
from shared.middleware.correlation import CorrelationMiddleware
from shared.observability.logging import setup_logging
from shared.observability.metrics import setup_metrics

logger = logging.getLogger(__name__)
settings = LoyaltySettings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    setup_logging(service_name="loyalty", log_level=settings.LOG_LEVEL)
    init_engine(settings.DATABASE_URL)
    await init_redis(settings.REDIS_URL)
    logger.info("Moveo Loyalty Service started (port=%d)", settings.LOYALTY_PORT)
    yield
    await close_engine()
    await close_redis()


app = FastAPI(
    title="Moveo Loyalty Service",
    description="Loyalty points, membership tiers, and reward redemptions",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(CorrelationMiddleware)
setup_metrics(app, service_name="loyalty")

app.include_router(router, prefix="/api/loyalty", tags=["loyalty"])


@app.get("/health", tags=["monitoring"])
async def health():
    return {"status": "healthy", "service": "loyalty"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("services.loyalty.main:app", host="0.0.0.0", port=settings.LOYALTY_PORT, reload=True)
