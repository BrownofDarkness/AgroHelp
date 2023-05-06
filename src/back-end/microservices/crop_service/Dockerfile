FROM python:3.8-slim-buster

EXPOSE 8002

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get -y install gcc

WORKDIR /crop_service

COPY ./requirements.txt /crop_service/requirements.txt
RUN python -m pip install --upgrade pip && python -m pip install --no-cache-dir -r /crop_service/requirements.txt
COPY . .

RUN python -m pip install pika

# RUN python manage.py makemigrations && python manage.py migrate

# CMD [ "python","manage.py" ,"runserver","0.0.0.0:8002" ]