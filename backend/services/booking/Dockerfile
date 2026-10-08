FROM python:3.12-slim
WORKDIR /app
COPY shared/ /app/shared/
COPY services/booking/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY services/booking/ /app/services/booking/
EXPOSE 8004
CMD ["uvicorn", "services.booking.main:app", "--host", "0.0.0.0", "--port", "8004"]
