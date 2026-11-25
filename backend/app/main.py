import logging

from fastapi import FastAPI
from .database import engine, Base
from . import models
from .routes import appointments
from .routes import auth
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from .rate_limit import limiter
from fastapi import Request
from fastapi.responses import JSONResponse

logger = logging.getLogger(__name__)


app = FastAPI(
    title="Appointment Scheduling System",
    description="API for managing customer appointments",
    version="1.0.0"
)

app.state.limiter = limiter

app.add_exception_handler(
    RateLimitExceeded,
    _rate_limit_exceeded_handler
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST", "PATCH", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"]
)


# Makes database tables
Base.metadata.create_all(bind=engine)


# Register application routes
app.include_router(appointments.router)
app.include_router(auth.router)


@app.get("/")
def home():
    return {
        "message": "Appointment Scheduling API is running!"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }

@app.exception_handler(Exception)
async def general_exception_handler(
    request: Request,
    exc: Exception
):
    logger.error(
        "Unexpected application error",
        exc_info=(type(exc), exc, exc.__traceback__)
    )

    return JSONResponse(
        status_code=500,
        content={
            "detail": "An unexpected error occurred. Please try again later."
        }
    )