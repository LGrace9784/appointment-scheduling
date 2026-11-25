from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)

    # User role: user or admin
    role = Column(
        String(20),
        nullable=False,
        default="user",
        server_default="user"
    )

    appointments = relationship(
        "Appointment",
        back_populates="user"
    )


class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String(100), nullable=False)
    customer_email = Column(String(255), nullable=False)
    service_type = Column(String(100), nullable=False)
    appointment_date = Column(DateTime, nullable=False)
    notes = Column(String(500), nullable=True)
    status = Column(String(30), default="Scheduled")

    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)

    user = relationship(
        "User",
        back_populates="appointments"
    )