# Moveo Backend

Moveo's backend is organized as a FastAPI API gateway and travel-domain services. It is designed to use PostgreSQL for persistent data, Redis for caching and coordination, Kafka for asynchronous events, and Elasticsearch for search.

> **Development status:** The backend is still under development and is not yet a fully runnable end-to-end stack. The gateway and some service entry points/configuration files are empty, as are several shared runtime modules. The infrastructure-only Compose stack can be started independently; the full application stack may not build or start until these modules are implemented.

## Contents

- [Architecture](#architecture)
- [Repository layout](#repository-layout)
- [Services](#services)
- [Requirements](#requirements)
- [Configuration](#configuration)
- [Start local infrastructure](#start-local-infrastructure)
- [Start the full application stack](#start-the-full-application-stack)
- [Run a service locally](#run-a-service-locally)
- [Tests](#tests)
- [Distributed-systems patterns](#distributed-systems-patterns)
- [Related documentation](#related-documentation)

## Architecture

The intended request path is:

```text
Web client
    |
    v
API Gateway (port 8000)
    |
    +--> Auth, Inventory, Search, Booking, Payment
    |
    +--> Notification, Review, Loyalty, Recommendation, Admin
                 |
                 +--> PostgreSQL, Redis, Kafka, Elasticsearch
```

The gateway is intended to provide a single API entry point. Services are separated by domain, with Kafka available for asynchronous communication. PostgreSQL, Redis, Kafka, and Elasticsearch are declared in the Docker Compose configurations.

## Repository layout

```text
backend/
+-- gateway/                    API gateway package
+-- services/
|   +-- admin/                   Administration service
|   +-- auth/                    Authentication and user service
|   +-- booking/                 Booking service
|   +-- inventory/               Flight, bus, and train inventory
|   +-- loyalty/                 Loyalty service
|   +-- notification/            Notification service
|   +-- payment/                 Payment service
|   +-- recommendation/          Recommendation service
|   +-- review/                  Review service
|   +-- search/                  Search service
+-- shared/                      Shared settings, database, middleware, and patterns
+-- .env.example                 Example local environment configuration
+-- docker-compose.infra.yml     PostgreSQL, Redis, Kafka, and Elasticsearch
+-- docker-compose.yml           Infrastructure, gateway, and domain services
+-- pyproject.toml               Python project dependencies and pytest settings
```

## Services

| Component | Port | Responsibility |
|---|---:|---|
| API Gateway | 8000 | Intended public entry point and request routing |
| Auth | 8001 | User authentication and profiles |
| Inventory | 8002 | Flight, bus, and train inventory |
| Search | 8003 | Travel search |
| Booking | 8004 | Booking operations |
| Payment | 8005 | Payment operations |
| Notification | 8006 | Booking notifications |
| Review | 8007 | Reviews and ratings |
| Loyalty | 8008 | Loyalty points and memberships |
| Recommendation | 8009 | Travel recommendations |
| Admin | 8010 | Administrative operations |

The ports above are the defaults declared by the service configurations and Compose file. A service's implementation and readiness may vary; see [Development status](#development-status).

## Requirements

For infrastructure and container-based development:

- Docker Engine or Docker Desktop
- Docker Compose v2 (`docker compose`)

For running Python services locally:

- Python 3.11 or newer
- Dependencies declared in `pyproject.toml` and the selected service's `requirements.txt`
- The infrastructure services required by that service

## Configuration

1. Create a local `.env` file from `.env.example`.
2. Set values appropriate for your local environment, including database, Redis, Kafka, Elasticsearch, JWT, and CORS settings.
3. Keep real credentials in local environment files. Do not commit them or use example development credentials in production.

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

On macOS or Linux:

```bash
cp .env.example .env
```

The example file documents the backend's current environment-variable names and defaults. Review it before starting services; the full application stack's environment wiring is still under development.

## Start local infrastructure

Run these commands from the `backend/` directory. This starts PostgreSQL, Redis, Kafka, and Elasticsearch without starting the gateway or domain services:

```bash
docker compose -f docker-compose.infra.yml up -d
```

To check container status:

```bash
docker compose -f docker-compose.infra.yml ps
```

To stop the infrastructure containers:

```bash
docker compose -f docker-compose.infra.yml down
```

The infrastructure Compose file declares these local ports:

| Dependency | Port |
|---|---:|
| PostgreSQL | 5432 |
| Redis | 6379 |
| Kafka | 9092 |
| Elasticsearch | 9200 |

## Start the full application stack

The full stack is defined in `docker-compose.yml` and can be started from this directory with:

```bash
docker compose up --build
```

This Compose file also declares Prometheus on port `9090` and Grafana on port `3001`, in addition to the gateway and domain services.

**The full application stack is not currently guaranteed to start.** Several referenced gateway, authentication, inventory, and shared runtime files are empty. Use the infrastructure-only Compose file when you need the local data and messaging dependencies; treat the full stack command as the intended command for when backend implementation is complete.

## Run a service locally

Service entry points and dependency lists are under `services/<service>/`. For a service with a completed entry point, run it from the `backend/` directory after installing its dependencies and configuring its required infrastructure. For example, the recommendation service defines a FastAPI application and a default port of `8009`.

Service startup instructions cannot be generalized reliably yet: service configuration and implementation are incomplete, and some services depend on shared modules that are currently empty. Check the selected service's `main.py`, `config.py`, and `requirements.txt` before attempting to run it.

## Tests

Pytest configuration is in `pyproject.toml`; the configured test locations are `services/*/tests`. Run tests from the `backend/` directory after installing the required test dependencies:

```bash
python -m pytest
```

Test dependencies are not currently listed in the backend project dependencies, and test coverage/readiness can vary by service.

## Distributed-systems patterns

The `shared/patterns/` directory contains placeholders for these planned patterns:

- Transactional outbox for coordinating database writes and event publishing
- Saga orchestration for multi-service operations and compensation
- Distributed locks for coordinating work across service instances

These modules are not yet implemented. Do not rely on them for production behavior.

## Development status

The repository contains a mix of implemented service modules and scaffolding. At the time of writing, the API gateway's main/configuration/dependency files and some authentication and inventory entry-point files are empty. Several shared modules—including database setup, settings, middleware, and distributed-systems patterns—are also empty. As a result:

- Infrastructure containers can be started separately with `docker-compose.infra.yml`.
- Individual service features and runtime behavior should be verified before use.
- The gateway and full Docker Compose application should be considered work in progress, not a production-ready deployment.

Update this section as modules become runnable and the full stack is verified.

## Related documentation

- [Root project README](../README.md)
- [Backend environment example](.env.example)
- [Backend Docker Compose file](docker-compose.yml)
- [Infrastructure-only Docker Compose file](docker-compose.infra.yml)
