"""Loyalty service configuration."""
from shared.config import BaseAppSettings


class LoyaltySettings(BaseAppSettings):
    APP_NAME: str = "moveo-loyalty"
    LOYALTY_PORT: int = 8008
    DATABASE_URL: str = "postgresql+asyncpg://moveo:moveo@localhost:5432/moveo_loyalty"
