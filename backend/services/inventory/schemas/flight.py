"""Pydantic Flight schemas matching frontend TypeScript interfaces."""
from pydantic import BaseModel
from typing import Optional


class FlightResponse(BaseModel):
    """Matches frontend Flight interface."""
    id: str
    airline: str
    airlineLogo: Optional[str] = None
    flightNo: str
    source: str       # mapped from 'from' in frontend
    sourceCode: str   # mapped from 'fromCode' in frontend
    destination: str   # mapped from 'to' in frontend
    destinationCode: str  # mapped from 'toCode' in frontend
    departure: str
    arrival: str
    duration: str
    price: float
    type: str = "Economy"
    stops: int = 0
    amenities: list[str] = []
    availableSeats: int = 0

    model_config = {"from_attributes": True}
