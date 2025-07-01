FROM python:3.13.3-alpine
RUN set -ex \
    && apk update \
    && pip3 install --upgrade pip \
    && apk add --no-cache  build-base build-deps gcc python3-dev musl-dev mariadb-dev \
    rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY ../../backend/ /app
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 8000
# RUN sleep 60
RUN ["python", "manage.py", "makemigrations", "app"]
RUN ["python", "manage.py", "migrate", "app"]
RUN ["python", "manage.py", "makemigrations"]
RUN ["python", "manage.py", "migrate"]
RUN ["python", "manage.py", "collectstatic", "--noinput"]
CMD ["gunicorn", "hirehappy.wsgi", "--bind", "0.0.0.0:8000", "--workers", "4", "--threads", "4"]
# CMD sh -c 'until nc -z db 3306; do echo "Waiting for DB..."; sleep 2; done; gunicorn hirehappy.wsgi --bind 0.0.0.0:8000 --workers 4 --threads 4'