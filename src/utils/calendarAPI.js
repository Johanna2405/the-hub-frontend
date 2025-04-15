import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const API = axios.create({
  baseURL: `${BACKEND_URL}/api`,
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
    console.error("API error:", error);
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
  try {
    const response = await API.post("/events", eventData);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating event:",
      error.response?.data || error.message
    );
    throw error.response?.data?.message || "Failed to create event";
  }
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

// GET community events
export const fetchCommunityEvents = async (communityId) => {
  const response = await API.get(`/communities/${communityId}/events`);
  return response.data;
};

// GET: Community-Pinboard
export const fetchCommunityPinBoard = async (communityId) => {
  const res = await API.get(`/communities/${communityId}/pinboard`);
  return res.data;
};

// POST: Update Pin at specific index
export const updateCommunityPin = async (communityId, index, eventId) => {
  const res = await API.post(`/communities/${communityId}/pinboard`, {
    index,
    eventId,
  });
  return res.data;
};

// POST: Update Community Pinboard
export const updateCommunityPinBoard = async (communityId, pinBoard) => {
  const response = await API.put(`/communities/${communityId}/pinboard`, {
    pin_board: pinBoard,
  });
  return response.data;
};
