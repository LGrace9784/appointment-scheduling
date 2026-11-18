import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuthToken, logoutUser } from "../services/api";

function Navbar() {
    const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = useState(
        Boolean(getAuthToken())
    );

    useEffect(() => {
        function updateAuth() {
            setLoggedIn(Boolean(getAuthToken()));
        }

        window.addEventListener("authChange", updateAuth);

        return () => {
            window.removeEventListener("authChange", updateAuth);
        };
    }, []);

    function handleLogout() {
        logoutUser();

        window.dispatchEvent(new Event("authChange"));

        navigate("/login");
    }

    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                Appointment Scheduler
            </Link>

            <div className="nav-links">
                <Link to="/">Home</Link>

                {loggedIn ? (
                    <>
                        <Link to="/schedule">Schedule</Link>
                        <Link to="/appointments">My Appointments</Link>

                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;