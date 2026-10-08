"""Booking service configuration."""
from shared.config import BaseAppSettings


class BookingSettings(BaseAppSettings):
    APP_NAME: str = "moveo-booking"
    BOOKING_PORT: int = 8004
    DATABASE_URL: str = "postgresql+asyncpg://moveo:moveo@localhost:5432/moveo_booking"
