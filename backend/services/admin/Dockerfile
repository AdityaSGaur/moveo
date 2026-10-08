FROM python:3.12-slim
WORKDIR /app
COPY shared/ /app/shared/
COPY services/admin/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY services/admin/ /app/services/admin/
EXPOSE 8010
CMD ["uvicorn", "services.admin.main:app", "--host", "0.0.0.0", "--port", "8010"]
