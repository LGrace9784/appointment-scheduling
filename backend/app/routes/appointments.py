from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from .. import models, schemas
from ..database import get_db
from ..models import Appointment, User
from ..security import get_current_user
from datetime import timezone


router = APIRouter(
    prefix="/api/appointments",
    tags=["Appointments"]
)


@router.post("/", response_model=schemas.AppointmentResponse, status_code=201)
def create_appointment(
    appointment: schemas.AppointmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        new_appointment = models.Appointment(
            customer_name=appointment.customer_name,
            customer_email=appointment.customer_email,
            service_type=appointment.service_type,
            appointment_date=appointment.appointment_date.astimezone(timezone.utc).replace(tzinfo=None),
            notes=appointment.notes,
            user_id=current_user.id
        )

        db.add(new_appointment)
        db.commit()
        db.refresh(new_appointment)

        return new_appointment

    except SQLAlchemyError:
        db.rollback()

        raise HTTPException(
            status_code=500,
            detail="Unable to schedule appointment. Please try again."
        )


@router.get("/", response_model=list[schemas.AppointmentResponse])
def get_appointments(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    try:
        appointments = db.query(Appointment).filter(
        Appointment.user_id == current_user.id).order_by(
        Appointment.appointment_date).all()

        return appointments

    except SQLAlchemyError:
        raise HTTPException(
            status_code=500,
            detail="Unable to retrieve appointments."
        )

@router.patch("/{appointment_id}",
              response_model=schemas.AppointmentResponse)
def update_appointment(
    appointment_id: int,
    update: schemas.AppointmentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    try:

        appointment = db.query(Appointment).filter(
            Appointment.id == appointment_id,
            Appointment.user_id == current_user.id
    ).first()

        if appointment is None:
            raise HTTPException(
                status_code=404,
                detail="Appointment not found."
            )

        if appointment.status == "Cancelled":
            raise HTTPException(
                status_code=409,
                detail="Cancelled appointments cannot be updated."
            )

        if update.appointment_date is not None:

            new_date = (
                update.appointment_date
                .astimezone(timezone.utc)
                .replace(tzinfo=None)
            )

            existing_appointment = (
                db.query(models.Appointment)
                .filter(
                    models.Appointment.appointment_date == new_date,
                    models.Appointment.status != "Cancelled",
                    models.Appointment.id != appointment_id
                )
                .first()
            )

            if existing_appointment:
                raise HTTPException(
                    status_code=409,
                    detail="This appointment time is already occupied."
                )

            appointment.appointment_date = new_date

        if update.status is not None:
            appointment.status = update.status

        db.commit()
        db.refresh(appointment)

        return appointment

    except SQLAlchemyError:
        db.rollback()

        raise HTTPException(
            status_code=500,
            detail="Unable to update appointment."
        )