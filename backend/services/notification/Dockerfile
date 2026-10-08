FROM python:3.12-slim
WORKDIR /app
COPY shared/ /app/shared/
COPY services/notification/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY services/notification/ /app/services/notification/
EXPOSE 8006
CMD ["uvicorn", "services.notification.main:app", "--host", "0.0.0.0", "--port", "8006"]
