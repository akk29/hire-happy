FROM python:3.13.3-alpine
RUN set -ex \
    && apk update \
    && pip3 install --upgrade pip \
    && apk add --no-cache build-base gcc python3-dev musl-dev mariadb-dev \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY ../../backend/ /app
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 8000
COPY infra/docker/backend/entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]