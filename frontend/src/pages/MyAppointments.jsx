import { useEffect, useState } from "react";
import {
    getAppointments,
    updateAppointment
} from "../services/api";

function MyAppointments() {

    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const [editingId, setEditingId] = useState(null);
    const [newDate, setNewDate] = useState("");

    useEffect(() => {
        loadAppointments();
    }, []);

    async function loadAppointments() {

        try {
            const data = await getAppointments();
            setAppointments(data);

        } catch (err) {
            setError(err.message);

        } finally {
            setLoading(false);
        }
    }

    async function handleCancel(id) {

        const confirmed = window.confirm(
            "Are you sure you want to cancel this appointment?"
        );

        if (!confirmed) return;

        try {
            await updateAppointment(id, {
                status: "Cancelled"
            });

            await loadAppointments();

        } catch (err) {
            setError(err.message);
        }
    }

    async function handleReschedule(id) {

        if (!newDate) {
            setError("Please select a new appointment date.");
            return;
        }

        try {

            const updatedDate = new Date(newDate);

            if (updatedDate <= new Date()) {
                setError("Please select a future appointment date.");
                return;
            }

            await updateAppointment(id, {
                appointment_date: updatedDate.toISOString()
            });

            setEditingId(null);
            setNewDate("");
            setError("");

            await loadAppointments();

        } catch (err) {
            setError(err.message);
        }
    }

    if (loading) {
        return <p className="loading">Loading appointments...</p>;
    }

    return (

        <div className="appointments-container">

            <h1>Manage Appointments</h1>

            <p>View, reschedule, or cancel your appointments.</p>

            {error && (
                <div className="error-message" role="alert">
                    {error}
                </div>
            )}

            {appointments.length === 0 && (
                <p>No appointments have been scheduled yet.</p>
            )}

            <div className="appointment-list">

                {appointments.map((appointment) => (

                    <div
                        className="appointment-card"
                        key={appointment.id}
                    >

                        <div className="appointment-header">

                            <h2>{appointment.customer_name}</h2>

                            <span className={`status ${appointment.status.toLowerCase()}`}>
                                {appointment.status}
                            </span>

                        </div>

                        <p>
                            <strong>Email:</strong>{" "}
                            {appointment.customer_email}
                        </p>

                        <p>
                            <strong>Service:</strong>{" "}
                            {appointment.service_type}
                        </p>

                        <p>
                            <strong>Date:</strong>{" "}
                            {new Date(
                                appointment.appointment_date + "Z"
                            ).toLocaleString()}
                        </p>

                        {appointment.notes && (
                            <p>
                                <strong>Notes:</strong>{" "}
                                {appointment.notes}
                            </p>
                        )}

                        {appointment.status !== "Cancelled" && (

                            <div className="appointment-actions">

                                <button
                                    onClick={() => {
                                        setEditingId(appointment.id);
                                        setNewDate("");
                                        setError("");
                                    }}
                                    className="reschedule-button"
                                >
                                    Reschedule
                                </button>

                                <button
                                    onClick={() => handleCancel(appointment.id)}
                                    className="cancel-button"
                                >
                                    Cancel Appointment
                                </button>

                            </div>

                        )}

                        {editingId === appointment.id && (

                            <div className="reschedule-form">

                                <label>Choose a New Date and Time</label>

                                <input
                                    type="datetime-local"
                                    value={newDate}
                                    onChange={(event) =>
                                        setNewDate(event.target.value)
                                    }
                                    min={new Date(
                                        Date.now() -
                                        new Date().getTimezoneOffset() * 60000
                                    ).toISOString().slice(0, 16)}
                                />

                                <button
                                    onClick={() =>
                                        handleReschedule(appointment.id)
                                    }
                                >
                                    Save New Appointment Time
                                </button>

                                <button
                                    className="cancel-edit-button"
                                    onClick={() => {
                                        setEditingId(null);
                                        setNewDate("");
                                    }}
                                >
                                    Go Back
                                </button>

                            </div>

                        )}

                    </div>

                ))}

            </div>

        </div>
    );
}

export default MyAppointments;