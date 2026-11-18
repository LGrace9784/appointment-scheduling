import re
from datetime import datetime, timezone
from pydantic import BaseModel, Field, field_validator, ConfigDict
from typing import Literal
from pydantic import model_validator


class AppointmentCreate(BaseModel):

    customer_name: str = Field(min_length=2, max_length=100)

    customer_email: str = Field(max_length=255)

    service_type: str = Field(min_length=2, max_length=100)

    appointment_date: datetime

    notes: str | None = Field(default=None, max_length=500)

    @field_validator(
        "customer_name",
        "customer_email",
        "service_type",
        mode="before"
    )
    @classmethod
    def strip_whitespace(cls, value):
        if isinstance(value, str):
            return value.strip()
        return value

    @field_validator("customer_name")
    @classmethod
    def validate_name(cls, value):
        if not value:
            raise ValueError("Customer name cannot be empty.")

        if not re.fullmatch(r"[A-Za-z][A-Za-z\s'-]*", value):
            raise ValueError("Customer name contains invalid characters.")

        return value

    @field_validator("customer_email")
    @classmethod
    def validate_email(cls, value):
        pattern = r"^[^@\s]+@[^@\s]+\.[^@\s]+$"

        if not re.fullmatch(pattern, value):
            raise ValueError("Please provide a valid email address.")

        return value

    @field_validator("appointment_date")
    @classmethod
    def validate_appointment_date(cls, value):
        current_time = datetime.now(timezone.utc)

        if value.tzinfo is None:
            raise ValueError("Appointment date must include a timezone.")

        if value <= current_time:
            raise ValueError("Appointment must be scheduled in the future.")

        return value

    @field_validator("notes")
    @classmethod
    def validate_notes(cls, value):
        if value is not None:
            value = value.strip()

            if not value:
                return None

        return value

class AppointmentResponse(BaseModel):

    model_config = ConfigDict(from_attributes=True)

    id: int
    customer_name: str
    customer_email: str
    service_type: str
    appointment_date: datetime
    notes: str | None
    status: str

class AppointmentUpdate(BaseModel):

    appointment_date: datetime | None = None

    status: Literal["Scheduled", "Cancelled"] | None = None

    @field_validator("appointment_date")
    @classmethod
    def validate_appointment_date(cls, value):

        if value is not None:

            if value.tzinfo is None:
                raise ValueError(
                    "Appointment date must include a timezone."
                )

            if value <= datetime.now(timezone.utc):
                raise ValueError(
                    "Appointment must be scheduled in the future."
                )

        return value

    @model_validator(mode="after")
    def validate_update(self):

        if self.appointment_date is None and self.status is None:
            raise ValueError("At least one update is required.")

        return self