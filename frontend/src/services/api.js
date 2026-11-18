const API_URL = import.meta.env.VITE_API_BASE_URL;

export function getAuthToken() {
    return sessionStorage.getItem("access_token");
}

async function authenticatedFetch(url, options = {}) {
    const token = getAuthToken();

    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`
        }
    });

    if (response.status === 401) {
        logoutUser();

        window.dispatchEvent(new Event("authChange"));

        window.location.href = "/login";

        throw new Error("Your session has expired. Please log in again.");
    }

    return response;
}

export async function getAppointments() {
    const response = await authenticatedFetch(
        `${API_URL}/api/appointments/`
    );

    if (!response.ok) {
        throw new Error("Unable to retrieve appointments.");
    }

    return response.json();
}

export async function createAppointment(appointment) {
    const response = await authenticatedFetch(
    `${API_URL}/api/appointments/`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(appointment)
    }
);

    const data = await response.json();

    if (!response.ok) {
        if (Array.isArray(data.detail)) {
            const messages = data.detail.map(error => error.msg);
            throw new Error(messages.join(", "));
        }

        throw new Error(data.detail || "Unable to schedule appointment.");
    }

    return data;
}

export async function updateAppointment(id, updateData) {
    const response = await authenticatedFetch(
    `${API_URL}/api/appointments/${id}`,
    {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
    }
);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "Unable to update appointment."
        );
    }

    return data;
}

export async function registerUser(userData) {
    const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "Unable to register account."
        );
    }

    return data;
}


export async function loginUser(email, password) {
    const formData = new URLSearchParams();

    formData.append("username", email);
    formData.append("password", password);

    const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "Unable to log in."
        );
    }

    sessionStorage.setItem(
        "access_token",
        data.access_token
    );

    return data;
}


export function logoutUser() {
    sessionStorage.removeItem("access_token");
}