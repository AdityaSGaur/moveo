"""
Auth service response schemas.
Designed to match the frontend TypeScript User interface and map seamlessly from ORM models.
"""

from pydantic import BaseModel, ConfigDict, Field, AliasChoices
from typing import Optional
from datetime import datetime


class UserPreferencesResponse(BaseModel):
    """Matches frontend UserPreferences interface."""

    theme: str = "dark"
    language: str = "en"
    defaultTravelClass: Optional[str] = Field(
        None,
        validation_alias=AliasChoices("default_travel_class", "defaultTravelClass"),
        serialization_alias="defaultTravelClass"
    )
    preferredBookingTypes: list[str] = Field(
        default_factory=lambda: ["flight", "bus", "train"],
        validation_alias=AliasChoices("preferred_booking_types", "preferredBookingTypes"),
        serialization_alias="preferredBookingTypes"
    )

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)


class UserResponse(BaseModel):
    """
    Matches frontend User interface.
    See: client/src/types/index.ts
    """

    id: str = Field(..., validation_alias=AliasChoices("uid", "id"))
    name: str
    email: str
    emailVerified: bool = Field(
        False,
        validation_alias=AliasChoices("email_verified", "emailVerified"),
        serialization_alias="emailVerified"
    )
    phone: Optional[str] = None
    avatar: Optional[str] = None
    city: Optional[str] = None
    membershipTier: str = Field(
        "bronze",
        validation_alias=AliasChoices("membership_tier", "membershipTier"),
        serialization_alias="membershipTier"
    )
    preferences: Optional[UserPreferencesResponse] = None
    createdAt: str | datetime = Field(
        ...,
        validation_alias=AliasChoices("created_at", "createdAt"),
        serialization_alias="createdAt"
    )

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)


class TokenResponse(BaseModel):
    """JWT token pair."""

    accessToken: str = Field(..., serialization_alias="accessToken")
    refreshToken: str = Field(..., serialization_alias="refreshToken")
    tokenType: str = Field("Bearer", serialization_alias="tokenType")
    expiresIn: int = Field(..., serialization_alias="expiresIn")  # seconds

    model_config = ConfigDict(populate_by_name=True)


class AuthResponse(BaseModel):
    """Combined auth response with user data and tokens."""

    success: bool = True
    data: UserResponse
    tokens: TokenResponse
    message: str = "Authentication successful"

    model_config = ConfigDict(populate_by_name=True)

