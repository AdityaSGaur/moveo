"""Train search and availability endpoints."""

from fastapi import APIRouter, Depends, Query
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from shared.database import get_session

router = APIRouter()


@router.get("/search")
async def search_trains(
    origin: str = Query(..., alias="from", description="Origin station code"),
    destination: str = Query(..., alias="to", description="Destination station code"),
    date: str = Query(..., description="Travel date (YYYY-MM-DD)"),
    travel_class: Optional[str] = Query(None, alias="class", description="SL, 3A, 2A, 1A, CC, EC"),
    quota: Optional[str] = Query("GN", description="GN, TQ, LD, PT, etc."),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=50),
    db: AsyncSession = Depends(get_session),
):
    """
    Search available trains between two stations.

    Response matches the frontend Train TypeScript interface:
    id, trainNumber, trainName, type, source/sourceCode, destination/destinationCode,
    departureTime, arrivalTime, duration, runningDays, classes (with availability),
    route, distance, hasPantry, zone.
    """
    # TODO: Implement train search with class availability
    pass


@router.get("/{train_id}")
async def get_train(train_id: str, db: AsyncSession = Depends(get_session)):
    """Get detailed train information with full route."""
    # TODO: Fetch train by ID with stops
    pass


@router.get("/{train_id}/availability")
async def check_availability(
    train_id: str,
    travel_class: str = Query(..., alias="class"),
    date: str = Query(...),
    quota: str = Query("GN"),
    db: AsyncSession = Depends(get_session),
):
    """
    Check seat availability for a specific train, class, date, and quota.

    Returns TrainAvailability: status (AVL/RAC/WL/REGRET), count, date.
    """
    # TODO: Check real-time availability
    pass
