"""
Moveo Search Service API routes.
Endpoints: Full-text search, autocomplete, and city/station suggestions
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from shared.database import get_session
from shared.middleware.auth import get_current_user

router = APIRouter()


# TODO: Implement search service endpoints
# Full-text search, autocomplete, and city/station suggestions
