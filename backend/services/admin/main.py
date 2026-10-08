"""
Moveo Admin Service — Moveo Travel Booking Platform.
Administration panel for inventory, users, offers, and analytics.
"""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI

from services.admin.config import AdminSettings
from services.admin.api.routes import router
from shared.database import init_engine, close_engine
from shared.redis import init_redis, close_redis
from shared.middleware.correlation import CorrelationMiddleware
from shared.observability.logging import setup_logging
from shared.observability.metrics import setup_metrics

logger = logging.getLogger(__name__)
settings = AdminSettings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    setup_logging(service_name="admin", log_level=settings.LOG_LEVEL)
    init_engine(settings.DATABASE_URL)
    await init_redis(settings.REDIS_URL)
    logger.info("Moveo Admin Service started (port=%d)", settings.ADMIN_PORT)
    yield
    await close_engine()
    await close_redis()


app = FastAPI(
    title="Moveo Admin Service",
    description="Administration panel for inventory, users, offers, and analytics",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(CorrelationMiddleware)
setup_metrics(app, service_name="admin")

app.include_router(router, prefix="/api/admin", tags=["admin"])


@app.get("/health", tags=["monitoring"])
async def health():
    return {"status": "healthy", "service": "admin"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("services.admin.main:app", host="0.0.0.0", port=settings.ADMIN_PORT, reload=True)
