FROM python:3.8-slim-buster

EXPOSE 8002

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /crop_service
COPY . .

RUN python -m pip install --upgrade pip

RUN python -m pip install -r requirements.txt

RUN python manage.py makemigrations

RUN python manage.py migrate
