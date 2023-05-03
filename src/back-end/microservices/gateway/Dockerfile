FROM python:3.8-slim-buster

#Set Environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

#Install Dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/lists/* \
    && python -m pip install --no-cache-dir --upgrade pip


WORKDIR /app

COPY ./requirements.txt /app/requirements.txt
RUN python -m pip install --no-cache-dir -r requirements.txt
COPY . .

EXPOSE 5000