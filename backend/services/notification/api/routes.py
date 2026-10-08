"""
Moveo Notification Service API routes.
Endpoints: GET /notifications, PATCH /notifications/:id/read, WebSocket /ws/notifications
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from shared.database import get_session
from shared.middleware.auth import get_current_user

router = APIRouter()


# TODO: Implement notification service endpoints
# GET /notifications, PATCH /notifications/:id/read, WebSocket /ws/notifications
