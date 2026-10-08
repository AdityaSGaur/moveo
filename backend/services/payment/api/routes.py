"""
Moveo Payment Service API routes.
Endpoints: POST /payments/initiate, POST /payments/confirm, POST /payments/refund
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from shared.database import get_session
from shared.middleware.auth import get_current_user

router = APIRouter()


# TODO: Implement payment service endpoints
# POST /payments/initiate, POST /payments/confirm, POST /payments/refund
