FROM python:3.12-slim
WORKDIR /app
COPY shared/ /app/shared/
COPY services/loyalty/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY services/loyalty/ /app/services/loyalty/
EXPOSE 8008
CMD ["uvicorn", "services.loyalty.main:app", "--host", "0.0.0.0", "--port", "8008"]
