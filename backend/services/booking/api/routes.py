"""
Moveo Booking Service API routes.
Endpoints: POST /bookings, GET /bookings, GET /bookings/:id, POST /bookings/:id/cancel
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from shared.database import get_session
from shared.middleware.auth import get_current_user

router = APIRouter()


# TODO: Implement booking service endpoints
# POST /bookings, GET /bookings, GET /bookings/:id, POST /bookings/:id/cancel
