// ============================================
// Moveo — TypeScript Type Definitions
// ============================================

// ---- User Types ----
export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified?: boolean;
  phone?: string;
  avatar?: string;
  city?: string;
  membershipTier?: "bronze" | "silver" | "gold" | "platinum";
  preferences?: UserPreferences;
  createdAt: string;
}

export interface UserPreferences {
  theme: "dark" | "light";
  language: string;
  defaultTravelClass?: string;
  preferredBookingTypes: ("flight" | "bus" | "hotel")[];
}


// ---- Bus Types ----
export interface BusSearch {
  from: string;
  to: string;
  date: string;
}

export interface Bus {
  id: string;
  operator: string;
  operatorLogo?: string;
  type: string; // AC Sleeper, Non-AC Seater, Volvo, etc.
  busNumber: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  source: string;
  destination: string;
  boardingPoints: BoardingPoint[];
  droppingPoints: BoardingPoint[];
  amenities: string[];
  rating: number;
  ratingCount: number;
  price: number;
  originalPrice?: number;
  availableSeats: number;
  totalSeats: number;
  seatLayout?: BusSeatLayout;
}

export interface BoardingPoint {
  id: string;
  name: string;
  time: string;
  address?: string;
  landmark?: string;
}

export interface BusSeatLayout {
  lowerDeck: BusSeatRow[];
  upperDeck?: BusSeatRow[];
  totalSeats: number;
}

export interface BusSeatRow {
  rowNumber: number;
  seats: BusSeat[];
}

export interface BusSeat {
  id: string;
  number: string;
  type: "seater" | "sleeper" | "semi_sleeper";
  position: "window" | "aisle" | "middle";
  price: number;
  status: "available" | "booked" | "selected" | "locked" | "ladies_only";
  isLadiesOnly?: boolean;
}

// ---- Booking Types ----
export interface Booking {
  id: string;
  userId: string;
  type: "flight" | "bus" | "hotel";
  status: "confirmed" | "pending" | "cancelled" | "completed";
  totalAmount: number;
  discount?: number;
  convenienceFee: number;
  gst: number;
  paymentMethod?: string;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
  flightBooking?: FlightBookingDetails;
  busBooking?: BusBookingDetails;
  hotelBooking?: HotelBookingDetails;
}

export interface FlightBookingDetails {
  flightId: string;
  flightNumber: string;
  airlineName: string;
  airlineLogo: string;
  source: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  seats: string[];
  class: string;
}

export interface BusBookingDetails {
  busId: string;
  operatorName: string;
  busType: string;
  source: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  boardingPoint: string;
  droppingPoint: string;
  seats: string[];
  passengers: Passenger[];
}

export interface HotelBookingDetails {
  hotelId: string | number;
  hotelName: string;
  city: string;
  checkIn?: string;
  checkOut?: string;
  guests: number;
  roomType: string;
  guestsList: Passenger[];
}

export interface Passenger {
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  idType?: string;
  idNumber?: string;
  seatNumber?: string;
  phone?: string;
  email?: string;
  aadhar?: string;
}

// ---- Payment Types ----
export interface PaymentMethod {
  id: string;
  type: "upi" | "card" | "netbanking" | "wallet" | "emi";
  label: string;
  icon?: string;
  lastFourDigits?: string;
  isDefault?: boolean;
}

// ---- Notification Types ----
export interface Notification {
  id: string;
  type: "booking" | "offer" | "system" | "alert";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  icon?: string;
}

// ---- Review Types ----
export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  text: string;
  date: string;
  isVerified: boolean;
}

// ---- Offer Types ----
export interface Offer {
  id: string;
  code: string;
  title: string;
  description: string;
  discountPercent?: number;
  discountAmount?: number;
  minAmount?: number;
  maxDiscount?: number;
  applicableModules: ("flight" | "bus" | "hotel")[];
  validUntil: string;
  bannerImage?: string;
}

// ---- API Response Types ----
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  pagination?: Pagination;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// ---- Component Prop Types ----
export type ModuleType = "flight" | "bus" | "hotel";

export interface SearchSuggestion {
  id: string;
  type: "city" | "flight" | "route" | "hotel";
  label: string;
  sublabel?: string;
  icon?: string;
}
