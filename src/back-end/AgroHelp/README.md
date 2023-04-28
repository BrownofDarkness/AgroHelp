## Agro help

# Backend instructions

To install the requirements on your local machine
- Step 1:
	create a virtual environment with
	```
	python -m venv env
	``` 
- Step 2:
	activate the virtual environment
	ubuntu
	```
	source ./env/bin/activate
	```
	windows
	```
	.\env\Script\activate
	```

- Step 3:
	install the dependencies with :
	```
	pip install -r requirements.txt
	```

- Step 4:
	Run migrations
	```
	python manage.py makemigrations
	```
	```
	python ./manage.py shell -c "import django;django.db.connection.cursor().execute('SELECT InitSpatialMetaData(1);')";
	```
	```
	python manage.py migrate
	```

	Run Server
	```
	python manage.py runserver
	```

To run the app in docker make sure you have install docker or [install docker](https://docs.docker.com/engine/install/)

Build and Run the docker image
```
docker compose up
```


## How to configure geo django
[How to install](https://kitcharoenp.github.io/gis/2018/06/12/geodjango_installation.html)

[How to fix spatialite problem](https://code.djangoproject.com/ticket/32935)
