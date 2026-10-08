"""SQLAlchemy Train, TrainClass, and TrainStop models."""
from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, DateTime, JSON, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from shared.database import Base


class Train(Base):
    __tablename__ = "trains"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    uid: Mapped[str] = mapped_column(String(36), unique=True, nullable=False, index=True)
    train_number: Mapped[str] = mapped_column(String(10), nullable=False, unique=True, index=True)
    train_name: Mapped[str] = mapped_column(String(255), nullable=False)
    train_type: Mapped[str] = mapped_column(String(50), nullable=False)  # Rajdhani, Shatabdi, Express
    source: Mapped[str] = mapped_column(String(255), nullable=False)
    source_code: Mapped[str] = mapped_column(String(10), nullable=False, index=True)
    destination: Mapped[str] = mapped_column(String(255), nullable=False)
    destination_code: Mapped[str] = mapped_column(String(10), nullable=False, index=True)
    departure_time: Mapped[str] = mapped_column(String(10), nullable=False)
    arrival_time: Mapped[str] = mapped_column(String(10), nullable=False)
    duration: Mapped[str] = mapped_column(String(20), nullable=False)
    running_days: Mapped[list] = mapped_column(JSON, nullable=False)  # [bool x 7] Mon-Sun
    distance: Mapped[int] = mapped_column(Integer, default=0)
    avg_speed: Mapped[int | None] = mapped_column(Integer, nullable=True)
    has_pantry: Mapped[bool] = mapped_column(Boolean, default=False)
    zone: Mapped[str] = mapped_column(String(20), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class TrainClassModel(Base):
    __tablename__ = "train_classes"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    train_id: Mapped[int] = mapped_column(Integer, ForeignKey("trains.id"), nullable=False, index=True)
    code: Mapped[str] = mapped_column(String(5), nullable=False)  # SL, 3A, 2A, 1A, CC, EC
    name: Mapped[str] = mapped_column(String(50), nullable=False)
    price: Mapped[float] = mapped_column(Float, nullable=False)
    total_seats: Mapped[int] = mapped_column(Integer, default=0)
    available_seats: Mapped[int] = mapped_column(Integer, default=0)
    availability_status: Mapped[str] = mapped_column(String(10), default="AVL")  # AVL, RAC, WL, REGRET
    waitlist_count: Mapped[int | None] = mapped_column(Integer, nullable=True)


class TrainStop(Base):
    __tablename__ = "train_stops"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    train_id: Mapped[int] = mapped_column(Integer, ForeignKey("trains.id"), nullable=False, index=True)
    station_name: Mapped[str] = mapped_column(String(255), nullable=False)
    station_code: Mapped[str] = mapped_column(String(10), nullable=False)
    arrival_time: Mapped[str | None] = mapped_column(String(10), nullable=True)
    departure_time: Mapped[str | None] = mapped_column(String(10), nullable=True)
    halt_duration: Mapped[str | None] = mapped_column(String(10), nullable=True)
    day: Mapped[int] = mapped_column(Integer, default=1)
    platform: Mapped[int | None] = mapped_column(Integer, nullable=True)
    distance: Mapped[int] = mapped_column(Integer, default=0)
    stop_order: Mapped[int] = mapped_column(Integer, nullable=False)
