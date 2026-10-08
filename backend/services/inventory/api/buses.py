"""Bus search, listing, and seat layout endpoints."""

from fastapi import APIRouter, Depends, Query
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from shared.database import get_session

router = APIRouter()


@router.get("/search")
async def search_buses(
    origin: str = Query(..., alias="from", description="Origin city"),
    destination: str = Query(..., alias="to", description="Destination city"),
    date: str = Query(..., description="Travel date (YYYY-MM-DD)"),
    bus_type: Optional[str] = Query(None, alias="type", description="AC Sleeper, Non-AC, Volvo, etc."),
    sort_by: Optional[str] = Query("price"),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=50),
    db: AsyncSession = Depends(get_session),
):
    """
    Search available buses between two cities.

    Response matches the frontend Bus TypeScript interface:
    id, operator, type, busNumber, departureTime, arrivalTime, duration,
    source, destination, boardingPoints, droppingPoints, amenities,
    rating, price, availableSeats, seatLayout.
    """
    # TODO: Implement bus search
    pass


@router.get("/{bus_id}")
async def get_bus(bus_id: str, db: AsyncSession = Depends(get_session)):
    """Get detailed bus information."""
    # TODO: Fetch bus by ID
    pass


@router.get("/{bus_id}/layout")
async def get_seat_layout(bus_id: str, db: AsyncSession = Depends(get_session)):
    """
    Get the seat layout for a specific bus.

    Response matches frontend BusSeatLayout interface:
    lowerDeck, upperDeck (optional), totalSeats.
    Each deck contains rows of BusSeat objects with:
    id, number, type, position, price, status.
    """
    # TODO: Return seat layout with real-time availability
    # Use distributed lock to prevent race conditions during seat selection
    pass
