"""
Moveo Admin Service API routes.
Endpoints: CRUD for inventory, users, offers. GET /admin/analytics/dashboard
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from shared.database import get_session
from shared.middleware.auth import get_current_user

router = APIRouter()


# TODO: Implement admin service endpoints
# CRUD for inventory, users, offers. GET /admin/analytics/dashboard
