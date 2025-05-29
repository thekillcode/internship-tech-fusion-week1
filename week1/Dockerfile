FROM python:3.10-alpine as builder
RUN apk add --no-cache --virtual .build-deps \
    postgresql-dev \
    gcc \
    python3-dev \
    musl-dev
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN apk del .build-deps


FROM python:3.10-alpine
RUN apk add --no-cache libpq
WORKDIR /app
COPY --from=builder /usr/local/lib/python3.10/site-packages /usr/local/lib/python3.10/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin
COPY . .
EXPOSE 80
CMD ["fastapi", "run", "app", "--port", "80"]