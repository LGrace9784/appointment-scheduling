import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ScheduleAppointment from "./pages/ScheduleAppointment";
import MyAppointments from "./pages/MyAppointments";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

import "./index.css";

function App() {

    return (
        <BrowserRouter>

            <Navbar />

            <Routes>
    <Route path="/" element={<Home />} />

    <Route
        path="/schedule"
        element={
            <ProtectedRoute>
                <ScheduleAppointment />
            </ProtectedRoute>
        }
    />

    <Route
        path="/appointments"
        element={
            <ProtectedRoute>
                <MyAppointments />
            </ProtectedRoute>
        }
    />

    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
</Routes>

        </BrowserRouter>
    );
}

export default App;