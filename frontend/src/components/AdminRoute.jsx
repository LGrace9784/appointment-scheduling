import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
    const token = sessionStorage.getItem("access_token");
    const storedUser = sessionStorage.getItem("user");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    let user;

    try {
        user = JSON.parse(storedUser);
    } catch {
        return <Navigate to="/" replace />;
    }

    if (!user || user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default AdminRoute;
