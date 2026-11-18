import { useState } from "react";
import { createAppointment } from "../services/api";

function ScheduleAppointment() {

    const [form, setForm] = useState({
        customer_name: "",
        customer_email: "",
        service_type: "",
        appointment_date: "",
        notes: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setForm({
            ...form,
            [name]: value
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {
            const appointmentData = {
                ...form,
                appointment_date: new Date(
                    form.appointment_date
                ).toISOString()
            };

            await createAppointment(appointmentData);

            setMessage("Your appointment was successfully scheduled!");

            setForm({
                customer_name: "",
                customer_email: "",
                service_type: "",
                appointment_date: "",
                notes: ""
            });

        } catch (err) {
            setError(err.message);

        } finally {
            setLoading(false);
        }
    }

    const minDateTime = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString().slice(0, 16);

    return (
        <div className="form-container">

            <h1>Schedule an Appointment</h1>

            <p>Complete the form below to schedule your appointment.</p>

            {message && (
                <div className="success-message" role="status">
                    {message}
                </div>
            )}

            {error && (
                <div className="error-message" role="alert">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>

                <label>Full Name</label>

                <input
                    type="text"
                    name="customer_name"
                    value={form.customer_name}
                    onChange={handleChange}
                    minLength="2"
                    maxLength="100"
                    required
                />

                <label>Email Address</label>

                <input
                    type="email"
                    name="customer_email"
                    value={form.customer_email}
                    onChange={handleChange}
                    maxLength="255"
                    required
                />

                <label>Service Type</label>

                <select
                    name="service_type"
                    value={form.service_type}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a service</option>
                    <option value="General Consultation">
                        General Consultation
                    </option>
                    <option value="Follow-Up Appointment">
                        Follow-Up Appointment
                    </option>
                    <option value="Professional Consultation">
                        Professional Consultation
                    </option>
                </select>

                <label>Appointment Date and Time</label>

                <input
                    type="datetime-local"
                    name="appointment_date"
                    value={form.appointment_date}
                    onChange={handleChange}
                    min={minDateTime}
                    required
                />

                <label>Additional Notes</label>

                <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    maxLength="500"
                    rows="4"
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Scheduling..." : "Schedule Appointment"}
                </button>

            </form>

        </div>
    );
}

export default ScheduleAppointment;