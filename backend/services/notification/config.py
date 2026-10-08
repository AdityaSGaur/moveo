"""Notification service configuration."""
from shared.config import BaseAppSettings


class NotificationSettings(BaseAppSettings):
    APP_NAME: str = "moveo-notification"
    NOTIFICATION_PORT: int = 8006
    DATABASE_URL: str = "postgresql+asyncpg://moveo:moveo@localhost:5432/moveo_notification"
