"""
Moveo Search Service — Moveo Travel Booking Platform.
Elasticsearch-powered search and autocomplete.
"""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI

from services.search.config import SearchSettings
from services.search.api.routes import router
from shared.database import init_engine, close_engine
from shared.redis import init_redis, close_redis
from shared.middleware.correlation import CorrelationMiddleware
from shared.observability.logging import setup_logging
from shared.observability.metrics import setup_metrics

logger = logging.getLogger(__name__)
settings = SearchSettings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    setup_logging(service_name="search", log_level=settings.LOG_LEVEL)
    init_engine(settings.DATABASE_URL)
    await init_redis(settings.REDIS_URL)
    logger.info("Moveo Search Service started (port=%d)", settings.SEARCH_PORT)
    yield
    await close_engine()
    await close_redis()


app = FastAPI(
    title="Moveo Search Service",
    description="Elasticsearch-powered search and autocomplete",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(CorrelationMiddleware)
setup_metrics(app, service_name="search")

app.include_router(router, prefix="/api/search", tags=["search"])


@app.get("/health", tags=["monitoring"])
async def health():
    return {"status": "healthy", "service": "search"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("services.search.main:app", host="0.0.0.0", port=settings.SEARCH_PORT, reload=True)
