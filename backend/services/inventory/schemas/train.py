"""Pydantic Train schemas matching frontend TypeScript interfaces."""
from pydantic import BaseModel
from typing import Optional


class TrainAvailabilityResponse(BaseModel):
    status: str  # AVL, RAC, WL, REGRET, GNWL, RLWL
    count: Optional[int] = None
    date: str


class TrainClassResponse(BaseModel):
    code: str  # SL, 3A, 2A, 1A, CC, EC
    name: str
    price: float
    availability: TrainAvailabilityResponse


class TrainStopResponse(BaseModel):
    stationName: str
    stationCode: str
    arrivalTime: Optional[str] = None
    departureTime: Optional[str] = None
    haltDuration: Optional[str] = None
    day: int
    platform: Optional[int] = None
    distance: int


class TrainResponse(BaseModel):
    """Matches frontend Train interface."""
    id: str
    trainNumber: str
    trainName: str
    type: str
    source: str
    sourceCode: str
    destination: str
    destinationCode: str
    departureTime: str
    arrivalTime: str
    duration: str
    runningDays: list[bool]
    classes: list[TrainClassResponse] = []
    route: list[TrainStopResponse] = []
    distance: int = 0
    avgSpeed: Optional[int] = None
    hasPantry: bool = False
    zone: str = ""

    model_config = {"from_attributes": True}
