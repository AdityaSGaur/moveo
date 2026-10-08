"""Admin service configuration."""
from shared.config import BaseAppSettings


class AdminSettings(BaseAppSettings):
    APP_NAME: str = "moveo-admin"
    ADMIN_PORT: int = 8010
    DATABASE_URL: str = "postgresql+asyncpg://moveo:moveo@localhost:5432/moveo_admin"
