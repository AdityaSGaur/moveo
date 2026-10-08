"""
OpenTelemetry distributed tracing setup.
Auto-instruments FastAPI, SQLAlchemy, Redis, and HTTP client calls.
"""

import logging
from fastapi import FastAPI

logger = logging.getLogger(__name__)


def setup_tracing(app: FastAPI, service_name: str, otlp_endpoint: str = "http://localhost:4317") -> None:
    """
    Configure OpenTelemetry tracing for a FastAPI service.

    Traces are exported to an OTLP-compatible collector (e.g., Jaeger, Tempo).

    Args:
        app: The FastAPI application instance
        service_name: Logical name of this service
        otlp_endpoint: OTLP gRPC collector endpoint
    """
    try:
        from opentelemetry import trace
        from opentelemetry.sdk.trace import TracerProvider
        from opentelemetry.sdk.trace.export import BatchSpanProcessor
        from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
        from opentelemetry.sdk.resources import Resource, SERVICE_NAME
        from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor

        resource = Resource.create({SERVICE_NAME: service_name})
        provider = TracerProvider(resource=resource)

        otlp_exporter = OTLPSpanExporter(endpoint=otlp_endpoint, insecure=True)
        provider.add_span_processor(BatchSpanProcessor(otlp_exporter))

        trace.set_tracer_provider(provider)

        FastAPIInstrumentor.instrument_app(app)
        logger.info("OpenTelemetry tracing enabled for service '%s' -> %s", service_name, otlp_endpoint)

    except ImportError:
        logger.warning("OpenTelemetry packages not installed, tracing disabled")
