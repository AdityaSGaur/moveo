"""Review service configuration."""
from shared.config import BaseAppSettings


class ReviewSettings(BaseAppSettings):
    APP_NAME: str = "moveo-review"
    REVIEW_PORT: int = 8007
    DATABASE_URL: str = "postgresql+asyncpg://moveo:moveo@localhost:5432/moveo_review"
