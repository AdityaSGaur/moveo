"""
Structured JSON logging configuration.
Outputs logs in JSON format compatible with Grafana Loki / ELK stack.
"""

import logging
import sys
import json
from datetime import datetime
from typing import Optional

from shared.middleware.correlation import get_correlation_id


class JSONFormatter(logging.Formatter):
    """Formats log records as JSON for structured log aggregation."""

    def format(self, record: logging.LogRecord) -> str:
        log_entry = {
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
            "service": getattr(record, "service", "unknown"),
            "correlation_id": get_correlation_id() or None,
        }

        if record.exc_info and record.exc_info[1]:
            log_entry["exception"] = {
                "type": type(record.exc_info[1]).__name__,
                "message": str(record.exc_info[1]),
            }

        # Include extra fields
        for key in ("user_id", "request_id", "method", "path", "status_code", "duration_ms"):
            if hasattr(record, key):
                log_entry[key] = getattr(record, key)

        return json.dumps(log_entry, default=str)


def setup_logging(service_name: str, log_level: str = "INFO", json_output: bool = True) -> None:
    """
    Configure structured logging for a microservice.

    Args:
        service_name: Name of the service (included in every log line)
        log_level: Minimum log level (DEBUG, INFO, WARNING, ERROR)
        json_output: If True, output JSON; if False, use human-readable format
    """
    root_logger = logging.getLogger()
    root_logger.setLevel(getattr(logging, log_level.upper(), logging.INFO))

    # Remove existing handlers
    root_logger.handlers.clear()

    handler = logging.StreamHandler(sys.stdout)

    if json_output:
        handler.setFormatter(JSONFormatter())
    else:
        handler.setFormatter(
            logging.Formatter(
                f"%(asctime)s | {service_name} | %(levelname)-8s | %(name)s | %(message)s"
            )
        )

    root_logger.addHandler(handler)

    # Suppress noisy third-party loggers
    for noisy_logger in ("uvicorn.access", "sqlalchemy.engine", "aiokafka"):
        logging.getLogger(noisy_logger).setLevel(logging.WARNING)

    logging.getLogger(service_name).info("Logging configured (level=%s, json=%s)", log_level, json_output)
