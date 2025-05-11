# Hire Happy

Make a bold move in your carrer through Hire Happy

# Dependencies

[![Python](https://img.shields.io/badge/python-3.13.3-blue.svg?style=flat-square)](https://www.python.org/downloads/release/python-3133/)
[![Django Web Framework](https://img.shields.io/badge/Django-5.2-blue.svg?style=flat-square)](https://pypi.org/project/Django/5.2/)


### 1. Steps for setting up project

```shell
# path to python 3.13.3, setting up virtual environment
python -m venv .venv
pip install -r requirements.txt
python manage.py makemigrations app
python manage.py migrate app
python manage.py runserver

# setting up celery
celery -A hirehappy worker -l info
celery -A hirehappy.celery worker --pool=solo --loglevel=info --detach # preffered command

# setup rabbit mq via docker
docker pull rabbitmq #optional
docker run -d -p 5672:5672 rabbitmq
```

### 2. Steps for running project via docker
```shell
docker compose up
```