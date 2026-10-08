"""Payment service configuration."""
from shared.config import BaseAppSettings


class PaymentSettings(BaseAppSettings):
    APP_NAME: str = "moveo-payment"
    PAYMENT_PORT: int = 8005
    DATABASE_URL: str = "postgresql+asyncpg://moveo:moveo@localhost:5432/moveo_payment"
