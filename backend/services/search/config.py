"""Search service configuration."""
from shared.config import BaseAppSettings


class SearchSettings(BaseAppSettings):
    APP_NAME: str = "moveo-search"
    SEARCH_PORT: int = 8003
    DATABASE_URL: str = "postgresql+asyncpg://moveo:moveo@localhost:5432/moveo_search"
