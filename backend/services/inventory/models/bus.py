"""SQLAlchemy Bus and BusSeat models."""
from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, DateTime, JSON, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from shared.database import Base


class Bus(Base):
    __tablename__ = "buses"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    uid: Mapped[str] = mapped_column(String(36), unique=True, nullable=False, index=True)
    operator: Mapped[str] = mapped_column(String(100), nullable=False)
    operator_logo: Mapped[str | None] = mapped_column(String(512), nullable=True)
    bus_type: Mapped[str] = mapped_column(String(50), nullable=False)
    bus_number: Mapped[str] = mapped_column(String(20), nullable=False, index=True)
    source: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    destination: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    departure_time: Mapped[str] = mapped_column(String(10), nullable=False)
    arrival_time: Mapped[str] = mapped_column(String(10), nullable=False)
    duration: Mapped[str] = mapped_column(String(20), nullable=False)
    price: Mapped[float] = mapped_column(Float, nullable=False)
    original_price: Mapped[float | None] = mapped_column(Float, nullable=True)
    rating: Mapped[float] = mapped_column(Float, default=0.0)
    rating_count: Mapped[int] = mapped_column(Integer, default=0)
    available_seats: Mapped[int] = mapped_column(Integer, default=0)
    total_seats: Mapped[int] = mapped_column(Integer, default=0)
    amenities: Mapped[list | None] = mapped_column(JSON, nullable=True)
    boarding_points: Mapped[list | None] = mapped_column(JSON, nullable=True)
    dropping_points: Mapped[list | None] = mapped_column(JSON, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    version: Mapped[int] = mapped_column(Integer, default=1)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class BusSeat(Base):
    __tablename__ = "bus_seats"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    bus_id: Mapped[int] = mapped_column(Integer, ForeignKey("buses.id"), nullable=False, index=True)
    seat_number: Mapped[str] = mapped_column(String(10), nullable=False)
    deck: Mapped[str] = mapped_column(String(10), default="lower")  # lower, upper
    row_number: Mapped[int] = mapped_column(Integer, nullable=False)
    seat_type: Mapped[str] = mapped_column(String(20), default="seater")  # seater, sleeper, semi_sleeper
    position: Mapped[str] = mapped_column(String(10), default="window")  # window, aisle, middle
    price: Mapped[float] = mapped_column(Float, nullable=False)
    status: Mapped[str] = mapped_column(String(20), default="available")  # available, booked, locked, ladies_only
    is_ladies_only: Mapped[bool] = mapped_column(Boolean, default=False)
