# Moveo Backend — Enterprise-Scale Distributed Travel Booking Platform

High-throughput, cloud-native microservices architecture built with **Python**, **FastAPI**, **PostgreSQL**, **Redis**, **Apache Kafka**, and **Elasticsearch**.

---

## 🏛️ Architecture Overview

The backend uses a **Database-per-Service** isolation model with event-driven communication via Kafka.

```
                    ┌─────────────────────────┐
                    │    Next.js Frontend     │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │   API Gateway (8000)    │
                    └────────────┬────────────┘
                                 │
     ┌──────────────┬────────────┼────────────┬──────────────┐
     │              │            │            │              │
┌────▼─────┐  ┌─────▼────┐ ┌─────▼────┐ ┌─────▼────┐  ┌─────▼────┐
│   Auth   │  │Inventory │ │  Search  │ │ Booking  │  │ Payment  │
│  (8001)  │  │  (8002)  │ │  (8003)  │ │  (8004)  │  │  (8005)  │
└────┬─────┘  └─────┬────┘ └─────┬────┘ └─────┬────┘  └─────┬────┘
     │              │            │            │              │
     └──────────────┴────────────┼────────────┴──────────────┘
                                 │ Kafka Topics
     ┌──────────────┬────────────┼────────────┬──────────────┐
     │              │            │            │              │
┌────▼─────┐  ┌─────▼────┐ ┌─────▼────┐ ┌─────▼────┐  ┌─────▼────┐
│Notificati│  │  Review  │ │ Loyalty  │ │Recommen- │  │  Admin   │
│  (8006)  │  │  (8007)  │ │  (8008)  │ │dation(09)│  │  (8010)  │
└──────────┘  └──────────┘ └──────────┘ └──────────┘  └──────────┘
```

---

## 🛠️ Microservices Registry

| Service | Port | Database | Responsibilities |
|---|---|---|---|
| **Gateway** | `8000` | — | Rate limiting, CORS, correlation tracing, route proxying |
| **Auth** | `8001` | `moveo_auth` | JWT issuance, password hashing, user registration & profile management |
| **Inventory** | `8002` | `moveo_inventory` | Flights, Buses, Trains catalog, seat layouts, class availability |
| **Search** | `8003` | Elasticsearch | Full-text search, autocomplete, fuzzy matching |
| **Booking** | `8004` | `moveo_booking` | Booking creation, passenger details, Saga orchestration |
| **Payment** | `8005` | `moveo_payment` | Payment processing, transaction outbox, idempotency |
| **Notification** | `8006` | `moveo_notification` | Email/SMS alerts, Socket.IO real-time notifications |
| **Review** | `8007` | `moveo_review` | User ratings, verified booking reviews |
| **Loyalty** | `8008` | `moveo_loyalty` | Membership tiers (Bronze → Platinum), point accrual/redemption |
| **Recommendation** | `8009` | Redis | Popular routes, personalized travel suggestions |
| **Admin** | `8010` | `moveo_admin` | Platform analytics dashboard, inventory & offer management |

---

## ⚡ Key Distributed Systems Patterns

- **Transactional Outbox**: Guarantees atomic DB state changes and event publishing (`shared/patterns/outbox.py`).
- **Saga Orchestrator**: Coordinates distributed transactions with compensation on failure (`shared/patterns/saga.py`).
- **Distributed Locking**: Redis SET-NX-EX with Lua script safe release (`shared/patterns/distributed_lock.py`).
- **Idempotency**: Prevents double-charge and double-booking using `X-Idempotency-Key` (`shared/middleware/idempotency.py`).
- **Optimistic Locking**: Handled via `version` counter column in SQLAlchemy ORM models.

---

## 🚀 Quick Start (Local Development)

### 1. Run Infrastructure Services (DB, Redis, Kafka, ES)
```bash
docker-compose -f docker-compose.infra.yml up -d
```

### 2. Run All Microservices via Docker Compose
```bash
docker-compose up --build
```

### 3. Run a Single Service Locally
```bash
cd services/auth
pip install -r requirements.txt
python main.py
```
