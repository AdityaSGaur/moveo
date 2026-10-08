"""Pydantic Bus schemas matching frontend TypeScript interfaces."""
from pydantic import BaseModel
from typing import Optional


class BoardingPointResponse(BaseModel):
    id: str
    name: str
    time: str
    address: Optional[str] = None
    landmark: Optional[str] = None


class BusSeatResponse(BaseModel):
    id: str
    number: str
    type: str  # seater, sleeper, semi_sleeper
    position: str  # window, aisle, middle
    price: float
    status: str  # available, booked, selected, locked, ladies_only
    isLadiesOnly: bool = False


class BusSeatRowResponse(BaseModel):
    rowNumber: int
    seats: list[BusSeatResponse]


class BusSeatLayoutResponse(BaseModel):
    lowerDeck: list[BusSeatRowResponse]
    upperDeck: Optional[list[BusSeatRowResponse]] = None
    totalSeats: int


class BusResponse(BaseModel):
    """Matches frontend Bus interface."""
    id: str
    operator: str
    operatorLogo: Optional[str] = None
    type: str
    busNumber: str
    departureTime: str
    arrivalTime: str
    duration: str
    source: str
    destination: str
    boardingPoints: list[BoardingPointResponse] = []
    droppingPoints: list[BoardingPointResponse] = []
    amenities: list[str] = []
    rating: float = 0.0
    ratingCount: int = 0
    price: float
    originalPrice: Optional[float] = None
    availableSeats: int = 0
    totalSeats: int = 0
    seatLayout: Optional[BusSeatLayoutResponse] = None

    model_config = {"from_attributes": True}
