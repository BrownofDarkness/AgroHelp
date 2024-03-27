from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from .database import DATABASE_URL, initDb

from tortoise.contrib.fastapi import register_tortoise
from .router import parcel, user, culture, culture_parcel

from fastapi.openapi.docs import get_redoc_html, get_swagger_ui_html

from fastapi.staticfiles import StaticFiles

from tortoise import run_async


app = FastAPI(
    redoc_url=None,
    docs_url=None,
    title="Parcel Service",
    description="Parcel Service",
    contact={
        "name": "ivantom",
        "url": "http://github.com/tomdieu",
        "email": "ivantom.python@gmail.com",
    },
    version="0.3.4",
)


# run_async is a helper function to run simple async Tortoise scripts.
run_async(initDb())


register_tortoise(
    app,
    db_url=DATABASE_URL,
    modules={"models": ["parcel_app.models"]},
    generate_schemas=True,
    add_exception_handlers=True,
)

origins = ["*"]

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_methods=["*"])

app.mount("/static", StaticFiles(directory="./static"), name="static")

# addin the api routes
app.include_router(parcel.router)
app.include_router(user.router)
app.include_router(culture.router)
app.include_router(culture_parcel.router)


@app.get("/docs", include_in_schema=False)
async def custom_swagger_ui_html():
    return get_swagger_ui_html(
        openapi_url=app.openapi_url,
        title=app.title + " - Swagger UI",
        oauth2_redirect_url=app.swagger_ui_oauth2_redirect_url,
        swagger_js_url="/static/swagger-ui-bundle.js",
        swagger_css_url="/static/swagger-ui.css",
    )


@app.get(app.swagger_ui_oauth2_redirect_url, include_in_schema=False)
@app.get("/redoc", include_in_schema=False)
async def redoc_html():
    return get_redoc_html(
        openapi_url=app.openapi_url,
        title=app.title + " - Redoc",
        redoc_js_url="/static/redoc.standalone.js",
    )
