"""
Moveo Payment Service — Moveo Travel Booking Platform.
Payment processing, refunds, and transaction management.
"""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI

from services.payment.config import PaymentSettings
from services.payment.api.routes import router
from shared.database import init_engine, close_engine
from shared.redis import init_redis, close_redis
from shared.middleware.correlation import CorrelationMiddleware
from shared.observability.logging import setup_logging
from shared.observability.metrics import setup_metrics

logger = logging.getLogger(__name__)
settings = PaymentSettings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    setup_logging(service_name="payment", log_level=settings.LOG_LEVEL)
    init_engine(settings.DATABASE_URL)
    await init_redis(settings.REDIS_URL)
    logger.info("Moveo Payment Service started (port=%d)", settings.PAYMENT_PORT)
    yield
    await close_engine()
    await close_redis()


app = FastAPI(
    title="Moveo Payment Service",
    description="Payment processing, refunds, and transaction management",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(CorrelationMiddleware)
setup_metrics(app, service_name="payment")

app.include_router(router, prefix="/api/payment", tags=["payment"])


@app.get("/health", tags=["monitoring"])
async def health():
    return {"status": "healthy", "service": "payment"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("services.payment.main:app", host="0.0.0.0", port=settings.PAYMENT_PORT, reload=True)
