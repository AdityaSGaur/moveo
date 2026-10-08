"""Recommendation service configuration."""
from shared.config import BaseAppSettings


class RecommendationSettings(BaseAppSettings):
    APP_NAME: str = "moveo-recommendation"
    RECOMMENDATION_PORT: int = 8009
    DATABASE_URL: str = "postgresql+asyncpg://moveo:moveo@localhost:5432/moveo_recommendation"
