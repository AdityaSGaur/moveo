"""
Prometheus metrics integration for FastAPI services.
Automatically instruments HTTP request metrics.
"""

import logging
from fastapi import FastAPI

logger = logging.getLogger(__name__)


def setup_metrics(app: FastAPI, service_name: str) -> None:
    """
    Instrument a FastAPI app with Prometheus metrics.

    Exposes a /metrics endpoint with:
    - http_request_duration_seconds (histogram)
    - http_requests_total (counter)
    - http_requests_in_progress (gauge)

    Args:
        app: The FastAPI application instance
        service_name: Name of the service (used as a label)
    """
    try:
        from prometheus_fastapi_instrumentator import Instrumentator

        instrumentator = Instrumentator(
            should_group_status_codes=True,
            should_ignore_untemplated=True,
            should_respect_env_var=False,
            excluded_handlers=["/health", "/metrics"],
            env_var_name="ENABLE_METRICS",
        )

        instrumentator.instrument(app).expose(app, endpoint="/metrics", tags=["monitoring"])
        logger.info("Prometheus metrics enabled for service '%s'", service_name)

    except ImportError:
        logger.warning("prometheus-fastapi-instrumentator not installed, metrics disabled")
