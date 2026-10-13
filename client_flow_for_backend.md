# Client Site Architecture & Flow (For Backend Developers)

This document provides a comprehensive overview of the **Moveo** client-side application. It outlines the current state, routing structure, data models, and the expected API endpoints required to transition the app from using mock data to a fully functional backend.

---

## 1. Tech Stack & Architecture

*   **Framework:** Next.js (App Router, `src/app`)
*   **State Management:** Redux Toolkit (`src/store`)
    *   `authSlice`: Manages user session, authentication state, and user profile data.
    *   `bookingSlice`: Manages the currently active booking flow (`currentBooking`), booking history, and active module (flight/bus/hotel).
    *   `notificationSlice`: Manages user alerts and notifications.
*   **Styling:** Tailwind CSS with GSAP for animations.
*   **Current State:** The client uses local sample data and currently has no API fetching layer (no Axios, Fetch, or RTK Query integration).

---

## 2. Core User Flows & Routing

The application presents three travel categories: **Flights**, **Buses**, and **Hotels**. The booking flow is shared across these categories.

### A. Authentication Flow
*   **Routes:** `/(auth)/login`, `/(auth)/signup`
*   **Flow:** Standard email/password or OAuth (if implemented later). Upon successful login, the user's data (defined in `User` type) must be dispatched to the Redux `authSlice`.

### B. Module Home Pages
*   **Routes:** `/flights`, `/buses`, `/hotels`, `/` (Main Home)
*   **Flow:** These are promotional landing pages. They display:
    *   Popular routes / Trending destinations.
    *   Offers and banners.
    *   A search widget (SmartSearch).
*   **Action:** When a user searches for a ticket, they are redirected to the Unified Booking Page with query parameters (e.g., `/book?category=flight&from=DEL&to=BOM&date=2024-12-01`).

### C. The Unified Booking Flow
*   **Route:** `/book` (Query params determine the mode: `?category=flight|bus|hotel`)
*   **Flow:**
    1.  **Search & List:** The page reads the query parameters and displays a list of available tickets.
    2.  **Filters:** Users can filter by price, rating, and category-specific options such as stops, amenities, or stay type.
    3.  **Selection:** Selecting a flight, bus, or hotel opens the `BookingDetailsView` component.
    4.  **Seat Layout & Configuration (In `BookingDetailsView`):** 
        *   For Buses: Visual seat layout selection.
        *   For Hotels: Room type and stay details.
        *   For Flights: Cabin class and add-ons selection.
    5.  **Passenger Details:** Entering passenger names, ages, and IDs.
    6.  **Checkout:** Reviewing the price breakdown (Base fare, Taxes, Convenience fee) and selecting a payment method.
    7.  **Confirmation:** On successful payment, a `Booking` object is generated and saved to the user's history (`bookingSlice`).

### D. User Profile
*   **Route:** `/profile`
*   **Flow:** Displays user details, membership tier, preferences (theme, default travel class), and paginated booking history.

---

## 3. Data Models (Entities)

The backend needs to provide data matching the TypeScript interfaces defined in `src/types/index.ts`. Here are the core entities:

> [!IMPORTANT]
> The exact shapes of these objects are crucial for the UI to render correctly without modification. Please ensure backend responses map to these interfaces.

*   **`User`**: `id`, `name`, `email`, `phone`, `membershipTier`, `preferences` (theme, language).
*   **`Flight`**: `id`, `airline`, `flightNo`, `from/fromCode`, `to/toCode`, `departure/arrival`, `duration`, `price`, `type` (Economy/Business), `stops`, `amenities`.
*   **`Bus`**: `id`, `operator`, `type` (AC Sleeper, etc.), `from/to`, `departure/arrival`, `price`, `availableSeats`, `amenities`, **`seatLayout`** (Crucial for seat selection UI).
*   **`Hotel`**: `id`, `name`, `city`, `area`, `type`, `rating`, `price`, and stay details such as check-in, check-out, and guests.
*   **`Booking`**: `id`, `userId`, `type` (flight/bus/hotel), `status` (confirmed/pending), `totalAmount`, travelers, and category-specific details (`flightBooking`, `busBooking`, `hotelBooking`).

---

## 4. Expected REST API Endpoints (Recommendation)

To bring the client to life, the backend developer should implement the following API structure.

### Auth & Users
*   `POST /api/auth/register` - Create a new user.
*   `POST /api/auth/login` - Authenticate and return JWT/Session.
*   `GET /api/users/me` - Get current user profile and preferences.
*   `PATCH /api/users/me` - Update profile/preferences.

### Inventory & Search
*   `GET /api/flights/search` - Query params: `from`, `to`, `date`, `class`, `passengers`.
*   `GET /api/buses/search` - Query params: `from`, `to`, `date`.
*   `GET /api/buses/:id/layout` - Returns the `BusSeatLayout` for seat selection.
*   `GET /api/hotels/search` - Query params: `destination`, `checkIn`, `checkOut`, `guests`.

### Bookings
*   `POST /api/bookings` - Create a new booking (requires payload of selected seats/classes, passenger details, and module). Returns a booking ID for payment processing.
*   `GET /api/bookings` - Get current user's booking history (Pagination supported).
*   `GET /api/bookings/:id` - Get specific booking details and invoice.
*   `POST /api/bookings/:id/cancel` - Initiate a cancellation.

### Static Data & Config
*   `GET /api/config/cities` - Get available cities and airports for autocomplete.
*   `GET /api/offers` - Get active promotional banners and discount codes.
