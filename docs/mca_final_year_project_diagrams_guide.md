# 🎓 Moveo Platform — MCA Final Year Major Project Blueprint
## Comprehensive Software Engineering Diagram & Documentation Guide

> **Project Title:** Moveo — Enterprise Distributed Multi-Modal Travel & Ticket Booking Platform  
> **Course / Degree:** Master of Computer Applications (MCA) — 1-Year Final Major Project  
> **Architecture Stack:** Next.js (Frontend), Python FastAPI (10 Microservices), Apache Kafka (Event Bus), Redis (Distributed Lock & Cache), PostgreSQL (Database-per-Service), Elasticsearch (Search), PyTorch/Scikit-Learn (AI Engine), Docker Compose / Kubernetes (Deployment).

---

## 📑 Table of Contents
1. [Academic vs. Industry Expectations for MCA Major Projects](#1-academic-vs-industry-expectations-for-mca-major-projects)
2. [Master Diagram Checklist & Report Placement](#2-master-diagram-checklist--report-placement)
3. [Section A: Classical Data Flow Diagrams (DFD)](#3-section-a-classical-data-flow-diagrams-dfd)
   - [DFD Level 0 (Context Diagram)](#dfd-level-0-context-diagram)
   - [DFD Level 1 (Functional System Decomposition)](#dfd-level-1-functional-system-decomposition)
   - [DFD Level 2 (Booking & Saga Engine Decomposition)](#dfd-level-2-booking--saga-engine-decomposition)
4. [Section B: Object-Oriented & Structural UML Diagrams](#4-section-b-object-oriented--structural-uml-diagrams)
   - [Unified Use Case Diagram](#unified-use-case-diagram)
   - [Detailed Class Diagram](#detailed-class-diagram)
   - [Deployment & Physical Component Diagram](#deployment--physical-component-diagram)
5. [Section C: Behavioral & Interaction UML Diagrams](#5-section-c-behavioral--interaction-uml-diagrams)
   - [Sequence Diagram 1: User Authentication & JWT Flow](#sequence-diagram-1-user-authentication--jwt-flow)
   - [Sequence Diagram 2: Saga Distributed Booking & Compensation](#sequence-diagram-2-saga-distributed-booking--compensation)
   - [Sequence Diagram 3: Transactional Outbox & Event Publishing](#sequence-diagram-3-transactional-outbox--event-publishing)
   - [Master Activity Diagram (End-to-End User Booking Journey)](#master-activity-diagram-end-to-end-user-booking-journey)
   - [State Transition Diagram (Booking Lifecycle)](#state-transition-diagram-booking-lifecycle)
6. [Section D: Database Schema & Entity Modeling](#6-section-d-database-schema--entity-modeling)
   - [Database-per-Service ER Diagram](#database-per-service-er-diagram)
7. [Section E: Viva Voce & Defense Strategy](#7-section-e-viva-voce--defense-strategy)

---

## 1. Academic vs. Industry Expectations for MCA Major Projects

In an MCA 1-Year Major Project, university evaluators look for **two key dimensions**:

1. **Standard Academic Compliance**: DFDs (Level 0, 1, 2), UML Use Case, ERD, Class Diagram, Sequence Diagram, Activity Diagram, and Deployment Diagram.
2. **Advanced Architectural Distinction**: Standard college projects are simple monolithic CRUD applications. Moveo stands out because it implements **Microservices**, **Saga Pattern for Distributed Transactions**, **Transactional Outbox**, **Kafka Event-Driven Architecture**, and **AI-Assisted Fare Prediction**. Showing diagrams of these patterns will guarantee top marks.

---

## 2. Master Diagram Checklist & Report Placement

| Diagram Name | Type | Project Report Chapter / Section | Essential for Synopsis? | Essential for Final Viva? |
| :--- | :--- | :--- | :---: | :---: |
| **DFD Level 0 (Context)** | Structured Analysis | Chapter 3: System Requirements & DFDs | **Yes** | **Yes** |
| **DFD Level 1** | Structured Analysis | Chapter 3: System Requirements & DFDs | **Yes** | **Yes** |
| **DFD Level 2 (Booking Core)** | Structured Analysis | Chapter 3: System Requirements & DFDs | Optional | **Yes** |
| **Use Case Diagram** | UML Behavioral | Chapter 4: System Design Document (SDD) | **Yes** | **Yes** |
| **High-Level System Architecture** | Architectural | Chapter 4: System Design Document (SDD) | **Yes** | **Yes** |
| **ER Diagram (ERD)** | Data Modeling | Chapter 4: Database Design | **Yes** | **Yes** |
| **Class Diagram** | UML Structural | Chapter 4: Detailed Object Design | Optional | **Yes** |
| **Sequence Diagram (Saga)** | UML Behavioral | Chapter 4/5: Process Interventions & Workflows | Optional | **Yes** |
| **Activity Diagram** | UML Behavioral | Chapter 4: Workflow Modeling | **Yes** | **Yes** |
| **State Machine Diagram** | UML Behavioral | Chapter 4: State Analysis | Optional | **Yes** |
| **Deployment Diagram** | UML Structural | Chapter 5: Deployment & Environment | Optional | **Yes** |

---

## 3. Section A: Classical Data Flow Diagrams (DFD)

### DFD Level 0 (Context Diagram)
The Context Diagram establishes the system boundary for Moveo and its external entities.

```mermaid
graph TD
    USER["User / Traveler"]
    ADMIN["System Admin"]
    AI_EXT["Third-Party AI / LLM APIs"]
    PAY_GATEWAY["Payment Gateway (Stripe/Razorpay)"]
    EMAIL_GATEWAY["SMS / Email Gateway (Twilio/SendGrid)"]

    MOVEO(("0.0<br/>Moveo Travel & Ticket Booking Platform"))

    USER -- "1. Search Queries, Credentials, Seat Preferences, Payment Info" --> MOVEO
    MOVEO -- "2. Search Results, E-Tickets, Profile, Loyalty Balance, Offers" --> USER

    ADMIN -- "3. Flight/Bus Inventory, Hotel Availability, Analytics Queries" --> MOVEO
    MOVEO -- "4. Platform Analytics Reports, Booking Logs, Revenue Metrics" --> ADMIN

    MOVEO -- "5. Payment Authorization Request" --> PAY_GATEWAY
    PAY_GATEWAY -- "6. Payment Status & Transaction Token" --> MOVEO

    MOVEO -- "7. SMS/Email Notification Payload" --> EMAIL_GATEWAY
    EMAIL_GATEWAY -- "8. Delivery Confirmation Status" --> MOVEO

    MOVEO -- "9. Route Data & Price History" --> AI_EXT
    AI_EXT -- "10. Fare Trends & Recommendation Vectors" --> MOVEO
```

---

### DFD Level 1 (Functional System Decomposition)

```mermaid
graph TD
    USER["User"]
    ADMIN["Admin"]

    subgraph Data Stores
        D1[("DS1: Auth DB")]
        D2[("DS2: Inventory DB")]
        D3[("DS3: Booking DB")]
        D4[("DS4: Payment DB")]
        D5[("DS5: Redis Cache / Lock")]
        D6[("DS6: Kafka Event Store")]
    end

    P1(("1.0 User Authentication & Profile"))
    P2(("2.0 Catalog Search & Auto-complete"))
    P3(("3.0 Seat Layout & Reservation"))
    P4(("4.0 Saga Booking Engine"))
    P5(("5.0 Payment Processing"))
    P6(("6.0 Event & Notification Engine"))

    USER --> P1
    P1 <--> D1

    USER --> P2
    P2 <--> D2
    P2 <--> D5

    USER --> P3
    P3 <--> D2
    P3 <--> D5

    USER --> P4
    P4 <--> D3
    P4 --> D6

    P4 --> P5
    P5 <--> D4

    D6 --> P6
    P6 --> USER
```

---

### DFD Level 2 (Booking & Saga Engine Decomposition)

```mermaid
graph TD
    CLIENT["Client API Gateway"]

    P4_1(("4.1 Validate Idempotency Key"))
    P4_2(("4.2 Acquire Redis Seat Lock"))
    P4_3(("4.3 Reserve Inventory Seat"))
    P4_4(("4.4 Create Booking Record"))
    P4_5(("4.5 Write Transactional Outbox"))
    P4_6(("4.6 Trigger Compensation (Rollback)"))

    D_IDEMP[("Redis: Idempotency Store")]
    D_LOCK[("Redis: Seat Locks")]
    D_INV[("PostgreSQL: Inventory DB")]
    D_BOOK[("PostgreSQL: Booking DB")]
    D_OUTBOX[("PostgreSQL: Outbox Table")]

    CLIENT --> P4_1
    P4_1 <--> D_IDEMP
    P4_1 --> P4_2

    P4_2 <--> D_LOCK
    P4_2 --> P4_3

    P4_3 <--> D_INV
    P4_3 -- "Success" --> P4_4
    P4_3 -- "Seat Unavailable" --> P4_6

    P4_4 --> D_BOOK
    P4_4 --> P4_5

    P4_5 --> D_OUTBOX
```

---

## 4. Section B: Object-Oriented & Structural UML Diagrams

### Unified Use Case Diagram

```mermaid
graph LR
    actor User as "Traveler / User"
    actor Admin as "Platform Admin"
    actor Worker as "Kafka Worker / Background Job"

    subgraph Moveo Ticket Booking Platform
        usecase UC1 as "Register & Login (JWT)"
        usecase UC2 as "Search Flights / Buses / Hotels"
        usecase UC3 as "Filter by Price, Duration, Amenities"
        usecase UC4 as "View Interactive Seat Layout"
        usecase UC5 as "Select Seat & Lock Inventory"
        usecase UC6 as "Apply Discount / Redeem Points"
        usecase UC7 as "Complete Payment"
        usecase UC8 as "Receive Ticket via Email/SMS"
        usecase UC9 as "Cancel Ticket & Request Refund"
        usecase UC10 as "Ask AI Assistant / Fare Predictor"
        
        usecase UC11 as "Manage Routes & Schedules"
        usecase UC12 as "View Platform Revenue Analytics"

        usecase UC13 as "Dispatch Transactional Outbox Events"
        usecase UC14 as "Process Loyalty Point Accrual"
    end

    User --> UC1
    User --> UC2
    User --> UC4
    User --> UC5
    User --> UC7
    User --> UC9
    User --> UC10

    UC2 .-> UC3 : <<include>>
    UC5 .-> UC6 : <<extend>>
    UC7 .-> UC8 : <<include>>

    Admin --> UC11
    Admin --> UC12

    Worker --> UC13
    Worker --> UC14
```

---

### Detailed Class Diagram

```mermaid
classDiagram
    class BaseEntity {
        +UUID id
        +DateTime created_at
        +DateTime updated_at
    }

    class User {
        +String email
        +String password_hash
        +MembershipTier tier
        +JSONB preferences
        +register()
        +login()
        +updateProfile()
    }

    class InventoryItem {
        +String identifier
        +TravelType type
        +String source
        +String destination
        +DateTime departure_time
        +Decimal price
        +getAvailability()
    }

    class SeatLayout {
        +String seat_number
        +String class_type
        +Boolean is_available
        +Integer version
        +lockSeat()
        +releaseSeat()
    }

    class Booking {
        +UUID user_id
        +BookingStatus status
        +Decimal total_amount
        +String idempotency_key
        +confirmBooking()
        +cancelBooking()
    }

    class Passenger {
        +String name
        +Integer age
        +String gender
        +String seat_number
    }

    class SagaOrchestrator {
        +String saga_id
        +List steps
        +execute()
        +compensate()
    }

    class OutboxEvent {
        +String aggregate_type
        +String event_type
        +JSONB payload
        +Boolean processed
        +markAsProcessed()
    }

    BaseEntity <|-- User
    BaseEntity <|-- InventoryItem
    BaseEntity <|-- Booking
    InventoryItem "1" *-- "many" SeatLayout
    Booking "1" *-- "many" Passenger
    User "1" -- "many" Booking
    SagaOrchestrator --> Booking : Orchestrates
    Booking "1" -- "1" OutboxEvent : Writes Atomically
```

---

### Deployment & Physical Component Diagram

```mermaid
graph TB
    subgraph Client Infrastructure
        BROWSER["User Web Browser / Mobile Device"]
    end

    subgraph Ingress & Gateway Layer (Docker Network: public_net)
        NGINX["Nginx / Gateway Controller (Port 8000)"]
    end

    subgraph Application Tier (Docker Network: app_net)
        AUTH_SVC["Auth Service (Port 8001)"]
        INV_SVC["Inventory Service (Port 8002)"]
        SEARCH_SVC["Search Service (Port 8003)"]
        BOOK_SVC["Booking Service (Port 8004)"]
        PAY_SVC["Payment Service (Port 8005)"]
        NOTIF_SVC["Notification Service (Port 8006)"]
        AI_SVC["AI Recommendation Engine"]
    end

    subgraph Data & Storage Tier (Docker Network: db_net)
        PG_AUTH[("PostgreSQL: moveo_auth")]
        PG_INV[("PostgreSQL: moveo_inventory")]
        PG_BOOK[("PostgreSQL: moveo_booking")]
        PG_PAY[("PostgreSQL: moveo_payment")]
        REDIS_CACHE[("Redis Master Cluster: Port 6379")]
        ES_CLUSTER[("Elasticsearch Node: Port 9200")]
        KAFKA_BROKER["Apache Kafka Broker: Port 9092"]
    end

    BROWSER -- "HTTPS (Port 443 / 8000)" --> NGINX
    NGINX --> AUTH_SVC
    NGINX --> INV_SVC
    NGINX --> SEARCH_SVC
    NGINX --> BOOK_SVC
    NGINX --> PAY_SVC
    NGINX --> AI_SVC

    AUTH_SVC --> PG_AUTH
    INV_SVC --> PG_INV
    SEARCH_SVC --> ES_CLUSTER
    BOOK_SVC --> PG_BOOK
    PAY_SVC --> PG_PAY

    BOOK_SVC --> REDIS_CACHE
    INV_SVC --> REDIS_CACHE

    BOOK_SVC -- "Publish Outbox Events" --> KAFKA_BROKER
    PAY_SVC -- "Publish Payment Events" --> KAFKA_BROKER
    KAFKA_BROKER -- "Consume Events" --> NOTIF_SVC
```

---

## 5. Section C: Behavioral & Interaction UML Diagrams

### Sequence Diagram 1: User Authentication & JWT Flow

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Client as Next.js Client
    participant GW as API Gateway (8000)
    participant Auth as Auth Service (8001)
    participant DB as Auth PostgreSQL DB
    participant Redis as Redis Token Store

    User->>Client: Enter Email & Password
    Client->>GW: POST /api/v1/auth/login
    GW->>Auth: Forward Credentials
    Auth->>DB: Query User by Email
    DB-->>Auth: User Record + Password Hash
    
    Auth->>Auth: Verify Argon2 / bcrypt Hash
    alt Password Invalid
        Auth-->>GW: 401 Unauthorized
        GW-->>Client: Invalid Credentials
    else Password Valid
        Auth->>Auth: Generate Access Token (JWT) & Refresh Token
        Auth->>Redis: Store Refresh Token (TTL: 7 Days)
        Auth-->>GW: 200 OK (AccessToken, RefreshCookie)
        GW-->>Client: Set HttpOnly Cookie & Redux Session
        Client-->>User: Redirect to User Dashboard
    end
```

---

### Sequence Diagram 2: Saga Distributed Booking & Compensation

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Client as Next.js Client
    participant GW as Gateway
    participant Saga as Booking Saga Orchestrator
    participant Inv as Inventory Service
    participant Pay as Payment Service

    User->>Client: Confirm Booking & Pay
    Client->>GW: POST /api/v1/bookings
    GW->>Saga: Start Booking Saga

    Note over Saga,Inv: Step 1: Reserve Inventory
    Saga->>Inv: Reserve Flight, Bus, or Hotel Inventory
    alt Inventory Reservation Fails
        Inv-->>Saga: 409 Conflict
        Saga-->>GW: Saga Failed (Inventory Unavailable)
        GW-->>Client: Display Error to User
    else Seat Reserved
        Inv-->>Saga: 200 Reserved (Expires in 10m)
        
        Note over Saga,Pay: Step 2: Process Payment
        Saga->>Pay: Charge Credit Card / UPI
        alt Payment Fails
            Pay-->>Saga: 402 Payment Required / Failed
            Note over Saga,Inv: COMPENSATING TRANSACTION
            Saga->>Inv: [Compensate] Release Reserved Seat
            Inv-->>Saga: Seat Released
            Saga-->>GW: Booking Cancelled
            GW-->>Client: Payment Failed Banner
        else Payment Succeeds
            Pay-->>Saga: 200 Payment Success
            Saga->>Saga: Mark Booking Status = CONFIRMED
            Saga-->>GW: 201 Created (Booking Details)
            GW-->>Client: Show Booking Confirmation
        end
    end
```

---

### Sequence Diagram 3: Transactional Outbox & Event Publishing

```mermaid
sequenceDiagram
    autonumber
    participant Saga as Booking Service
    participant DB as Booking Database
    participant OutboxWorker as Outbox Background Poller
    participant Kafka as Kafka Event Bus
    participant Notif as Notification Consumer
    participant Loyalty as Loyalty Consumer

    Saga->>DB: BEGIN TRANSACTION
    Saga->>DB: INSERT INTO bookings VALUES (...)
    Saga->>DB: INSERT INTO outbox (aggregate_id, event_type, payload) VALUES (...)
    Saga->>DB: COMMIT TRANSACTION
    Note over Saga,DB: Ensures atomic state write & event recording

    loop Every 500ms
        OutboxWorker->>DB: SELECT * FROM outbox WHERE processed = FALSE LIMIT 50 FOR UPDATE
        DB-->>OutboxWorker: Return Pending Events
        OutboxWorker->>Kafka: Publish Event to Topic 'booking-events'
        Kafka-->>OutboxWorker: ACK Event Delivered
        OutboxWorker->>DB: UPDATE outbox SET processed = TRUE WHERE id = event.id
    end

    par Parallel Event Consumption
        Kafka->>Notif: Deliver 'booking.confirmed' Event
        Notif->>Notif: Send Confirmation Email & SMS
    and
        Kafka->>Loyalty: Deliver 'booking.confirmed' Event
        Loyalty->>Loyalty: Calculate Points & Update User Tier
    end
```

---

### Master Activity Diagram (End-to-End User Booking Journey)

```mermaid
stateDiagram-v2
    [*] --> LandOnHome: Open Moveo Site
    LandOnHome --> SearchQuery: Input From, To, Date & Category
    SearchQuery --> DisplayResults: Query API Gateway / Search Service
    
    state DisplayResults {
        [*] --> ListItems
        ListItems --> ApplyFilters: Filter by Price, Time, Rating
        ApplyFilters --> ListItems
    }

    DisplayResults --> SelectItem: Select Flight/Bus/Hotel
    SelectItem --> ViewBookingDetails: Review Booking Details
    
    ViewBookingDetails --> SelectionDetails: Select Travel Option or Room Type
    SelectionDetails --> EnterPassengers: Enter Traveler Details
    
    EnterPassengers --> ApplyCoupon: [Optional] Input Promo Code
    ApplyCoupon --> ReviewCheckout: Review Price Breakdown
    
    ReviewCheckout --> InitiatePayment: Click Pay Now
    
    state InitiatePayment {
        [*] --> CheckIdempotency
        CheckIdempotency --> AcquireRedisLock
        AcquireRedisLock --> ExecuteSaga
    }

    ExecuteSaga --> PaymentSuccess: Payment Authorized
    ExecuteSaga --> PaymentFail: Payment Declined / Timeout

    PaymentFail --> ReviewCheckout: Retry Payment
    PaymentSuccess --> GenerateETicket: Write Outbox & Kafka Event
    GenerateETicket --> DisplayConfirmation: Render E-Ticket & Receipt
    DisplayConfirmation --> [*]
```

---

### State Transition Diagram (Booking Lifecycle)

```mermaid
stateDiagram-v2
    [*] --> DRAFT: User Selects Ticket
    
    DRAFT --> PENDING_PAYMENT: Click Proceed to Payment
    
    PENDING_PAYMENT --> CONFIRMED: Payment Authorized & Seat Reserved
    PENDING_PAYMENT --> FAILED: Payment Timeout or Declined
    PENDING_PAYMENT --> EXPIRED: 10-Minute Lock Period Expired
    
    CONFIRMED --> CANCEL_REQUESTED: User Initiates Cancellation
    
    CANCEL_REQUESTED --> CANCELLED: Compensation Saga Releases Seat
    CANCELLED --> REFUND_PENDING: Cancellation Event Sent to Payment Service
    REFUND_PENDING --> REFUNDED: Refund Credited to User Account
    
    FAILED --> [*]
    EXPIRED --> [*]
    REFUNDED --> [*]
    CONFIRMED --> COMPLETED: Journey Date Passed
    COMPLETED --> [*]
```

---

## 6. Section D: Database Schema & Entity Modeling

### Database-per-Service ER Diagram

```mermaid
erDiagram
    %% Auth Microservice DB
    AUTH_USERS {
        uuid id PK
        string email UK
        string password_hash
        string full_name
        string phone
        string membership_tier
        datetime created_at
    }

    %% Inventory Microservice DB
    INVENTORY_ITEMS {
        uuid id PK
        string category "FLIGHT | BUS | HOTEL"
        string service_number
        string operator_name
        string source_city
        string destination_city
        datetime departure_time
        datetime arrival_time
        decimal base_price
    }

    SEATS {
        uuid id PK
        uuid inventory_id FK
        string seat_code
        string seat_class
        boolean is_available
        integer version
    }

    %% Booking Microservice DB
    BOOKINGS {
        uuid id PK
        uuid user_id FK
        uuid inventory_id FK
        string booking_reference UK
        string status
        decimal total_amount
        string idempotency_key UK
        datetime created_at
    }

    PASSENGERS {
        uuid id PK
        uuid booking_id FK
        string full_name
        integer age
        string gender
        string assigned_seat
    }

    OUTBOX_EVENTS {
        uuid id PK
        string aggregate_type
        string aggregate_id
        string event_type
        jsonb payload
        boolean processed
        datetime created_at
    }

    %% Payment Microservice DB
    PAYMENTS {
        uuid id PK
        uuid booking_id FK
        string payment_gateway_ref
        decimal amount
        string currency
        string status
        datetime created_at
    }

    AUTH_USERS ||--o{ BOOKINGS : "places"
    INVENTORY_ITEMS ||--|{ SEATS : "contains"
    BOOKINGS ||--|{ PASSENGERS : "includes"
    BOOKINGS ||--|| PAYMENTS : "generates"
    BOOKINGS ||--o{ OUTBOX_EVENTS : "emits"
```

---

## 7. Section E: Viva Voce & Defense Strategy

When defending Moveo in your MCA final project viva, examiners will ask specific architectural questions. Here are the top questions and exact model answers:

### Q1: "Why did you choose a Microservices architecture instead of a Monolith?"
> **Model Answer:** "A travel booking platform handles disparate workloads. Search queries have high read volume (100:1 read-to-write ratio), while booking and payments require strict consistency and high write transaction processing. With a monolith, scaling search scales the whole app. In Moveo, microservices allow independent horizontal scaling, isolated database-per-service performance, and fault isolation (e.g., if Recommendation fails, Booking remains 100% operational)."

### Q2: "How do you handle Distributed Transactions across independent databases?"
> **Model Answer:** "In a microservices environment, traditional 2PC (Two-Phase Commit) locks databases across networks and does not scale. Moveo uses the **Saga Pattern (Orchestration)** managed by the Booking Service. If payment fails after reserving a seat, the Saga Orchestrator automatically fires a compensating transaction to release the seat in the Inventory service."

### Q3: "What happens if the database updates but the event notification fails to publish to Kafka?"
> **Model Answer:** "We solved the Dual-Write problem using the **Transactional Outbox Pattern** ([`backend/shared/patterns/outbox.py`](file:///c:/Users/adity/Desktop/mern_projects(original)/ticket_booking_webapp/backend/shared/patterns/outbox.py)). Instead of writing to Kafka directly inside the HTTP request, the DB transaction commits both the booking record and an event payload into an `outbox` table in the *same* local database transaction. A separate background worker reads from the `outbox` table and publishes to Kafka with at-least-once delivery guarantees."

### Q4: "How do you prevent double-booking or double-payment if a user clicks 'Pay' twice?"
> **Model Answer:** "We implement **Idempotency middleware** using a unique `X-Idempotency-Key` header generated on the Next.js client for every booking attempt. The API Gateway stores this key in Redis SET-NX with a lock timeout. Duplicate requests with the same key are caught at the gateway and returned cached responses without re-executing payment or seat allocation."

---
*Created for Moveo MCA Final Year Major Project — 2026/2027 Session.*
