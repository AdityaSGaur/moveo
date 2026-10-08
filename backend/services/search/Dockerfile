FROM python:3.12-slim
WORKDIR /app
COPY shared/ /app/shared/
COPY services/search/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY services/search/ /app/services/search/
EXPOSE 8003
CMD ["uvicorn", "services.search.main:app", "--host", "0.0.0.0", "--port", "8003"]
