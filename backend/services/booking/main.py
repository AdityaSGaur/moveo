"""
Moveo Booking Service — Moveo Travel Booking Platform.
Booking lifecycle management with Saga orchestration.
"""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI

from services.booking.config import BookingSettings
from services.booking.api.routes import router
from shared.database import init_engine, close_engine
from shared.redis import init_redis, close_redis
from shared.middleware.correlation import CorrelationMiddleware
from shared.observability.logging import setup_logging
from shared.observability.metrics import setup_metrics

logger = logging.getLogger(__name__)
settings = BookingSettings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    setup_logging(service_name="booking", log_level=settings.LOG_LEVEL)
    init_engine(settings.DATABASE_URL)
    await init_redis(settings.REDIS_URL)
    logger.info("Moveo Booking Service started (port=%d)", settings.BOOKING_PORT)
    yield
    await close_engine()
    await close_redis()


app = FastAPI(
    title="Moveo Booking Service",
    description="Booking lifecycle management with Saga orchestration",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(CorrelationMiddleware)
setup_metrics(app, service_name="booking")

app.include_router(router, prefix="/api/booking", tags=["booking"])


@app.get("/health", tags=["monitoring"])
async def health():
    return {"status": "healthy", "service": "booking"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("services.booking.main:app", host="0.0.0.0", port=settings.BOOKING_PORT, reload=True)
