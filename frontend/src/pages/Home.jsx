import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home-container">

            <section className="hero">
                <h1>Schedule Your Appointment</h1>

                <Link to="/schedule" className="primary-button">
                    Schedule an Appointment
                </Link>
            </section>
        </div>
    );
}

export default Home;