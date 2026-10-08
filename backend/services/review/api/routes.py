"""
Moveo Review Service API routes.
Endpoints: POST /reviews, GET /reviews, GET /reviews/:id
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from shared.database import get_session
from shared.middleware.auth import get_current_user

router = APIRouter()


# TODO: Implement review service endpoints
# POST /reviews, GET /reviews, GET /reviews/:id
