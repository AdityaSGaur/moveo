"""Flight search and listing endpoints."""

from fastapi import APIRouter, Depends, Query
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from shared.database import get_session

router = APIRouter()


@router.get("/search")
async def search_flights(
    origin: str = Query(..., alias="from", description="Origin city/airport code"),
    destination: str = Query(..., alias="to", description="Destination city/airport code"),
    date: str = Query(..., description="Travel date (YYYY-MM-DD)"),
    travel_class: Optional[str] = Query(None, alias="class", description="Economy/Business/First"),
    passengers: int = Query(1, ge=1, le=9),
    sort_by: Optional[str] = Query("price", description="Sort by: price, duration, departure"),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=50),
    db: AsyncSession = Depends(get_session),
):
    """
    Search available flights between two cities on a given date.

    Response matches the frontend Flight TypeScript interface:
    id, airline, flightNo, from/fromCode, to/toCode, departure/arrival,
    duration, price, type, stops, amenities.
    """
    # TODO: Implement flight search with filters, sorting, and pagination
    # 1. Query flights table with filters
    # 2. Apply Redis caching for popular routes
    # 3. Return paginated ApiResponse<Flight[]>
    pass


@router.get("/{flight_id}")
async def get_flight(flight_id: str, db: AsyncSession = Depends(get_session)):
    """Get detailed information about a specific flight."""
    # TODO: Fetch flight by ID
    pass
