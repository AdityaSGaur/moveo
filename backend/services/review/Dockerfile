FROM python:3.12-slim
WORKDIR /app
COPY shared/ /app/shared/
COPY services/review/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY services/review/ /app/services/review/
EXPOSE 8007
CMD ["uvicorn", "services.review.main:app", "--host", "0.0.0.0", "--port", "8007"]
