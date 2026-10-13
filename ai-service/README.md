# Moveo AI Services

This directory is reserved for AI and machine-learning components planned for the Moveo travel-booking platform.

## Planned modules

| Directory | Intended purpose | Current status |
|---|---|---|
| `chatbot/` | Conversational assistance for travel discovery and booking questions | Directory exists; no implementation files are present |
| `fare_prediction/` | Fare trend analysis and travel-price prediction | Directory exists; no implementation files are present |
| `recommendation_engine/` | Personalized travel and destination recommendations | Directory exists; no implementation files are present |

These module names describe the planned organization, not currently available APIs or working features. No model files, datasets, dependency manifests, service entry points, or automated tests are currently present in this directory.

## Proposed responsibilities

- **Chatbot:** Help users discover travel options and understand booking information.
- **Fare prediction:** Estimate or explain fare trends using historical travel-price data.
- **Recommendation engine:** Rank routes, destinations, or travel options using user preferences and available travel data.

These are project goals, not a guarantee that any capability is implemented.

## Architecture context

Project planning documents describe an intended platform using a Next.js client, Python/FastAPI services, and supporting systems such as PostgreSQL, Redis, Kafka, and Elasticsearch. They also identify machine-learning technologies such as PyTorch and scikit-learn as possibilities. No AI framework, model-serving protocol, data contract, or integration endpoint has been implemented or finalized here.

Review the project architecture materials in [`../docs/`](../docs/) before designing an integration. Coordinate with the backend API owners before adding network contracts or shared data formats.

## Development status

The folders in this directory are empty scaffolding. There are currently no install, run, or test commands for AI services. Do not treat the proposed modules as deployable services.

When implementation begins, document each module's dependencies, configuration, data requirements, API or command-line interface, model lifecycle, and tests in that module's own README or service documentation.

## Responsible development

- Do not commit credentials, private user data, or unlicensed datasets.
- Document the source, permitted use, and preprocessing of every training or evaluation dataset.
- Keep model outputs clearly identified as estimates or recommendations where appropriate.
- Validate data handling, model quality, and failure behavior before integrating a model into booking decisions.
