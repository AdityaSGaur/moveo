"""
Moveo Notification Service — Moveo Travel Booking Platform.
Email, SMS, and WebSocket push notifications.
"""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI

from services.notification.config import NotificationSettings
from services.notification.api.routes import router
from shared.database import init_engine, close_engine
from shared.redis import init_redis, close_redis
from shared.middleware.correlation import CorrelationMiddleware
from shared.observability.logging import setup_logging
from shared.observability.metrics import setup_metrics

logger = logging.getLogger(__name__)
settings = NotificationSettings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    setup_logging(service_name="notification", log_level=settings.LOG_LEVEL)
    init_engine(settings.DATABASE_URL)
    await init_redis(settings.REDIS_URL)
    logger.info("Moveo Notification Service started (port=%d)", settings.NOTIFICATION_PORT)
    yield
    await close_engine()
    await close_redis()


app = FastAPI(
    title="Moveo Notification Service",
    description="Email, SMS, and WebSocket push notifications",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(CorrelationMiddleware)
setup_metrics(app, service_name="notification")

app.include_router(router, prefix="/api/notification", tags=["notification"])


@app.get("/health", tags=["monitoring"])
async def health():
    return {"status": "healthy", "service": "notification"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("services.notification.main:app", host="0.0.0.0", port=settings.NOTIFICATION_PORT, reload=True)
