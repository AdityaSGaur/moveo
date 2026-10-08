"""
Moveo Recommendation Service API routes.
Endpoints: GET /recommendations/popular, GET /recommendations/for-you
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from shared.database import get_session
from shared.middleware.auth import get_current_user

router = APIRouter()


# TODO: Implement recommendation service endpoints
# GET /recommendations/popular, GET /recommendations/for-you
