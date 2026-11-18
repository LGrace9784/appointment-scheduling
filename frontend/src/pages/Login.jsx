import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        try {
            await loginUser(email, password);
            window.dispatchEvent(new Event("authChange"));
            navigate("/appointments");
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="form-container">
            <h1>Login</h1>

            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>
            </form>

            <p>
                Don't have an account?{" "}
                <Link to="/register">Register here</Link>
            </p>
        </div>
    );
}

export default Login;