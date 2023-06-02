FROM python:3.8-slim-buster

EXPOSE 8003

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Create a directory for the app
# RUN mkdir /app
WORKDIR /parcel_service


# Install dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    libgeos-dev \
    libproj-dev \
    gdal-bin \
    libsqlite3-mod-spatialite \
    && rm -rf /var/lib/apt/lists/*

# Create a virtual environment
RUN python -m venv /opt/venv

# Activate the virtual environment
ENV PATH="/opt/venv/bin:$PATH"

# Copy requirements file and install dependencies
COPY ./requirements.txt /parcel_service/
RUN python -m pip install --upgrade pip \ 
    && python -m pip install -r /parcel_service/requirements.txt

# Copy the Django project into the container
COPY . .

# Set up the SQLite database

RUN python manage.py makemigrations

RUN python ./manage.py shell -c "import django;django.db.connection.cursor().execute('SELECT InitSpatialMetaData(1);')";

RUN python manage.py migrate

# Expose the port the app runs on
EXPOSE 8003

# Start the app
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8003"]
