# Moveo Infrastructure

This directory is reserved for deployment and infrastructure configuration for the Moveo platform. Its current subdirectories are `kubernetes/`, `nginx/`, and `terraform/`.

## Planned contents

| Directory | Intended purpose | Current status |
|---|---|---|
| `kubernetes/` | Kubernetes resources for deploying and operating platform components | Directory exists; no manifest files are present |
| `nginx/` | Nginx reverse-proxy or ingress configuration | Directory exists; no configuration files are present |
| `terraform/` | Infrastructure-as-code modules and environment definitions | Directory exists; no Terraform files are present |

These describe the intended layout only. No Kubernetes manifests, Nginx configuration, Terraform modules, or deployment workflows are currently available in this directory.

## Local development infrastructure

The Docker Compose definitions for local backend dependencies are currently maintained under [`../backend/`](../backend/), not here. From the backend directory, start PostgreSQL, Redis, Kafka, and Elasticsearch with:

```bash
docker compose -f docker-compose.infra.yml up -d
```

See [`../backend/README.md`](../backend/README.md) for the backend development status, ports, and Compose instructions. Starting local dependencies does not deploy the platform to Kubernetes or provision cloud resources.

## Deployment status

There are currently no deployment commands or production-ready infrastructure definitions in this directory. Do not run `terraform apply` or attempt a Kubernetes deployment based on the directory names or planning documents alone.

Before adding deployment resources, document the target environments, required variables and secrets, network boundaries, persistence, health checks, resource limits, observability, and rollback strategy. Never commit credentials or unreviewed production state.
