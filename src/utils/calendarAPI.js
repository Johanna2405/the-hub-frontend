import axios from "axios";

// Base URL, proxied to http://localhost:8080 from vite.config.js
const API = axios.create({
    baseURL: "/api",
});

// Attach token to headers if available
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor to log API errors
API.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API error:', error);
        return Promise.reject(error);
    }
);

// GET all events
export const fetchEvents = async (filters = {}) => {
    const response = await API.get("/events", { params: filters });
    return response.data;
};

// GET single event
export const fetchEventById = async (id) => {
    const response = await API.get(`/events/${id}`);
    return response.data;
};

// POST create event
export const createEvent = async (eventData) => {
    const response = await API.post("/events", eventData);
    return response.data;
};

// PUT update event
export const updateEvent = async (id, eventData) => {
    const response = await API.put(`/events/${id}`, eventData);
    return response.data;
};

// DELETE event
export const deleteEvent = async (id) => {
    const response = await API.delete(`/events/${id}`);
    return response.data;
};

// POST add attendee
export const addAttendee = async (event_id, user_id) => {
    const response = await API.post("/event-attendees", { event_id, user_id });
    return response.data;
};

// DELETE remove attendee
export const removeAttendee = async (event_id, user_id) => {
    const response = await API.delete(`/event-attendees/${event_id}/${user_id}`);
    return response.data;
};