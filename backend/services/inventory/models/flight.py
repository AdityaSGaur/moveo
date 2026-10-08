"""SQLAlchemy Flight model."""
from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, DateTime, JSON, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from shared.database import Base


class Flight(Base):
    __tablename__ = "flights"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    uid: Mapped[str] = mapped_column(String(36), unique=True, nullable=False, index=True)
    airline: Mapped[str] = mapped_column(String(100), nullable=False)
    airline_logo: Mapped[str | None] = mapped_column(String(512), nullable=True)
    flight_no: Mapped[str] = mapped_column(String(20), nullable=False, index=True)
    origin: Mapped[str] = mapped_column(String(255), nullable=False)
    origin_code: Mapped[str] = mapped_column(String(10), nullable=False, index=True)
    destination: Mapped[str] = mapped_column(String(255), nullable=False)
    destination_code: Mapped[str] = mapped_column(String(10), nullable=False, index=True)
    departure_time: Mapped[str] = mapped_column(String(10), nullable=False)
    arrival_time: Mapped[str] = mapped_column(String(10), nullable=False)
    duration: Mapped[str] = mapped_column(String(20), nullable=False)
    price: Mapped[float] = mapped_column(Float, nullable=False)
    travel_class: Mapped[str] = mapped_column(String(20), default="Economy")
    stops: Mapped[int] = mapped_column(Integer, default=0)
    amenities: Mapped[list | None] = mapped_column(JSON, nullable=True)
    available_seats: Mapped[int] = mapped_column(Integer, default=0)
    total_seats: Mapped[int] = mapped_column(Integer, default=0)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    version: Mapped[int] = mapped_column(Integer, default=1)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
