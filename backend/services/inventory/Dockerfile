FROM python:3.12-slim
WORKDIR /app
COPY shared/ /app/shared/
COPY services/inventory/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY services/inventory/ /app/services/inventory/
EXPOSE 8002
CMD ["uvicorn", "services.inventory.main:app", "--host", "0.0.0.0", "--port", "8002"]
