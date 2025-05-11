FROM python:3.13.3-alpine
RUN set -ex \
    && apk update \
    && pip3 install --upgrade pip
WORKDIR /app
ADD ./backend/requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt
COPY ../../ /app
EXPOSE 8000
RUN ["python", "./backend/manage.py", "makemigrations", "app"]
RUN ["python", "./backend/manage.py", "migrate", "app"]
RUN ["python", "./backend/manage.py", "makemigrations"]
RUN ["python", "./backend/manage.py", "migrate"]
RUN ["python", "./backend/manage.py", "collectstatic", "--noinput"]
WORKDIR /app/backend
CMD ["gunicorn", "hirehappy.wsgi", "--bind", "0.0.0.0:8000", "--workers", "4", "--threads", "4"]
