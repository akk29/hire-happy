FROM python:3.13.3-alpine
RUN set -ex \
    && apk update \
    && pip3 install --upgrade pip
WORKDIR /app
COPY ../../backend/ /app
RUN pip install celery==5.5.2
