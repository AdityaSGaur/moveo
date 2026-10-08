"""
Moveo Loyalty Service API routes.
Endpoints: GET /loyalty/points, POST /loyalty/redeem, GET /loyalty/history
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from shared.database import get_session
from shared.middleware.auth import get_current_user

router = APIRouter()


# TODO: Implement loyalty service endpoints
# GET /loyalty/points, POST /loyalty/redeem, GET /loyalty/history
