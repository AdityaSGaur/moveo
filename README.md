# Moveo

Moveo is a travel-booking platform project with a Next.js web client and a Python/FastAPI backend organized as an API gateway and domain microservices. The repository also contains folders for AI-service work and infrastructure/deployment resources.

## Features

- Travel search and booking flows for flights, buses, trains, and hotels
- User authentication, profile, and booking dashboard interfaces
- Responsive travel-focused UI with reusable components
- Backend service modules for authentication, inventory, search, bookings, payments, notifications, reviews, loyalty, recommendations, and administration
- Local infrastructure definitions for PostgreSQL, Redis, Kafka, and Elasticsearch

> The frontend and backend are separate applications. The frontend can be run on its own; run and configure the backend separately when working on API functionality.

## Repository layout

```text
.
├── client/             Next.js web application
├── backend/
│   ├── gateway/        FastAPI API gateway
│   ├── services/       Domain microservices
│   ├── shared/         Shared backend code and patterns
│   ├── docker-compose.yml
│   └── docker-compose.infra.yml
├── ai-service/         AI-related module directories
├── infrastructure/    Deployment and infrastructure resources
└── docs/               Project documentation and diagrams
```

## Tech stack

**Web client:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Redux Toolkit

**Backend:** Python 3.11+, FastAPI, SQLAlchemy, PostgreSQL, Redis, Kafka, Elasticsearch

**Local orchestration:** Docker Compose

## Run the web client

Requirements: Node.js and npm.

```bash
cd client
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Available client scripts:

```bash
npm run dev      # Start the development server
npm run lint     # Run ESLint
npm run build    # Create a production build
npm run start    # Serve a production build
```

## Run the backend

Requirements: Docker with the Docker Compose plugin. Backend services and their dependencies are defined under `backend/`.

To start the local data and messaging infrastructure only:

```bash
cd backend
docker compose -f docker-compose.infra.yml up -d
```

To build and start the backend stack described by the full Compose file:

```bash
cd backend
docker compose up --build
```

The gateway is configured on port `8000`. The domain services use ports `8001` through `8010`; PostgreSQL, Redis, Kafka, and Elasticsearch use ports `5432`, `6379`, `9092`, and `9200`, respectively.

For local development of an individual service, install the dependencies from `backend/pyproject.toml` and follow the service-specific entry point and configuration. See [backend/README.md](./backend/README.md) and [backend/.env.example](./backend/.env.example) for backend-specific details. Replace example credentials and any placeholder values with local values; do not use development secrets in production.

## Backend service map

| Component | Default port | Responsibility |
|---|---:|---|
| API Gateway | 8000 | Entry point for backend API requests |
| Auth | 8001 | User registration, authentication, and profiles |
| Inventory | 8002 | Travel inventory and availability |
| Search | 8003 | Search and discovery |
| Booking | 8004 | Booking lifecycle |
| Payment | 8005 | Payment operations |
| Notification | 8006 | Booking notifications |
| Review | 8007 | Reviews and ratings |
| Loyalty | 8008 | Membership and loyalty points |
| Recommendation | 8009 | Travel recommendations |
| Admin | 8010 | Administrative operations |

## Development notes

- Install Node dependencies from `client/`; Python dependencies are declared in `backend/pyproject.toml`.
- Run the frontend and backend in separate terminals.
- Backend configuration examples are in `backend/.env.example`. Keep real credentials in local environment files and out of version control.
- Additional architecture and project materials are in `docs/`.

## License

No license is currently specified in this repository.
