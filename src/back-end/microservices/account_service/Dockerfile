FROM python:3.8-slim-buster

EXPOSE 8000

# Set Environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Create a directory for the app
WORKDIR /account_service
COPY . .

# Copy requirements file and install dependencies
RUN python -m pip install --upgrade pip

RUN python -m pip install -r requirements.txt

RUN python manage.py makemigrations

RUN python manage.py migrate