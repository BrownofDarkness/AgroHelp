FROM python:3.8-slim-buster

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

<<<<<<< HEAD
=======
# Create a directory for the app
# RUN mkdir /app
WORKDIR /agrohelp_container
COPY . .
>>>>>>> 9264ce90c8f9336109c89e94b6ae1c7f5db693e7

# Install dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    libgeos-dev \
    libproj-dev \
    gdal-bin \
    libsqlite3-mod-spatialite \
    && rm -rf /var/lib/apt/lists/* \
    && python -m pip install --no-cache-dir --upgrade pip
# Copy requirements file and install dependencies


# Create a directory for the app
# RUN mkdir /app
WORKDIR /django_container
COPY ./requirements.txt /django_container/
RUN python -m pip install --no-cache-dir -r /django_container/requirements.txt
COPY . .

# Copy the Django project into the container


# Set up the SQLite database

RUN python manage.py makemigrations

RUN python ./manage.py shell -c "import django;django.db.connection.cursor().execute('SELECT InitSpatialMetaData(1);')";

RUN python manage.py migrate

# Expose the port the app runs on
EXPOSE 8000

# Start the app
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
