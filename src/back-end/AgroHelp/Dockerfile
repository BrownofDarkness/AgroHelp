# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.11.1-alpine

EXPOSE 8000

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1

RUN apk --update add gcc build-base libffi-dev

RUN apk update && apk add binutils libproj-dev

RUN apk add libgdal-dev

RUN apk update && \
    apk add --no-cache gdal-dev

RUN pip add GDAL==3.2.2.1


# Update C env vars so compiler can find gdal
ENV CPLUS_INCLUDE_PATH=/usr/include/gdal
ENV C_INCLUDE_PATH=/usr/include/gdal

# This are geo django requirements



# Installing Geospatial Libraries

# On Debian/Ubuntu, you are advised to install the following packages which will install, 
# directly or by dependency, the required geospatial libraries:

RUN apk add binutils libproj-dev gdal-bin

# GEOS API

# GEOS stands for Geometry Engine - Open Source, and is a C++ library, ported from the 
# Java Topology Suite.


RUN apk add libgeos++

# PROJ.4

# PROJ is a generic coordinate transformation software, that transforms geospatial coordinates from one coordinate reference system (CRS) to another. On Ubuntu the APT package manager is used:


RUN apk add proj-bin


# GDAL API

# GDAL stands for Geospatial Data Abstraction Library, and is a veritable “Swiss army knife” of GIS data functionality.

RUN apk add gdal-bin

# To enable spatialite in sqlite database

RUN apk add libsqlite3-mod-spatialite

ENV PYTHONUNBUFFERED=1


WORKDIR /django_backend
COPY . .

# Install pip requirements
RUN python -m pip install --upgrade pip