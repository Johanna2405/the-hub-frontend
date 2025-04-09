import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const API = axios.create({
  baseURL: `${BACKEND_URL}/api`,
});

const handleError = (error) => {
  throw new Error(error.response?.data?.message || "Something went wrong");
};

// --- Community --- //
export const fetchAllCommunities = async () => {
  try {
    const res = await API.get("/communities");
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchJoinedCommunities = async () => {
  try {
    const res = await API.get("/communities/my");
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const createCommunity = async (data) => {
  try {
    const res = await API.post("/communities", data);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const joinCommunity = async (id) => {
  try {
    const res = await API.post(`/communities/${id}/join`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchCommunityById = async (id) => {
  try {
    const res = await API.get(`/communities/${id}`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

//(admin only)
export const updateCommunity = async (id, data) => {
  try {
    const res = await API.put(`/communities/${id}`, data);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

// (admin only)
export const deleteCommunity = async (id) => {
  try {
    const res = await API.delete(`/communities/${id}`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

// community settings
export const fetchCommunitySettings = async (id) => {
  try {
    const res = await API.get(`/communities/${id}/settings`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

// (admin only)
export const updateCommunitySettings = async (id, settings) => {
  try {
    const res = await API.put(`/communities/${id}/settings`, { settings });
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

// --- Community Posts --- //

export const fetchCommunityPosts = async (communityId) => {
  try {
    const res = await API.get(`/communities/${communityId}/posts`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const createCommunityPost = async (communityId, postData) => {
  try {
    const res = await API.post(`/communities/${communityId}/posts`, postData);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchCommunityPostById = async (communityId, postId) => {
  try {
    const res = await API.get(`/communities/${communityId}/posts/${postId}`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateCommunityPost = async (communityId, postId, postData) => {
  try {
    const res = await API.put(
      `/communities/${communityId}/posts/${postId}`,
      postData
    );
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteCommunityPost = async (communityId, postId) => {
  try {
    const res = await API.delete(`/communities/${communityId}/posts/${postId}`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

// --- Community Messages --- //

export const fetchCommunityMessages = async (communityId) => {
  try {
    const res = await API.get(`/communities/${communityId}/messages`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const createCommunityMessage = async (communityId, messageData) => {
  try {
    const res = await API.post(
      `/communities/${communityId}/messages`,
      messageData
    );
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

// --- Community Lists --- //

export const fetchCommunityLists = async (communityId) => {
  try {
    const res = await API.get(`/communities/${communityId}/lists`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchCommunityListById = async (communityId, listId) => {
  try {
    const res = await API.get(`/communities/${communityId}/lists/${listId}`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

// (admin only)
export const createCommunityList = async (communityId, listData) => {
  try {
    const res = await API.post(`/communities/${communityId}/lists`, listData);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

// (admin only)
export const updateCommunityList = async (communityId, listId, listData) => {
  try {
    const res = await API.put(
      `/communities/${communityId}/lists/${listId}`,
      listData
    );
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

//  (admin only)
export const deleteCommunityList = async (communityId, listId) => {
  try {
    const res = await API.delete(`/communities/${communityId}/lists/${listId}`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

// --- Community List Items --- //

// 1. Get all items in a list
export const fetchCommunityListItems = async (communityId, listId) => {
  try {
    const res = await API.get(
      `/communities/${communityId}/lists/${listId}/items`
    );
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

// (admin only)
export const createCommunityListItem = async (
  communityId,
  listId,
  itemData
) => {
  try {
    const res = await API.post(
      `/communities/${communityId}/lists/${listId}/items`,
      itemData
    );
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

// (admin only)
export const updateCommunityListItem = async (
  communityId,
  listId,
  itemId,
  itemData
) => {
  try {
    const res = await API.put(
      `/communities/${communityId}/lists/${listId}/items/${itemId}`,
      itemData
    );
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

//(admin only)
export const deleteCommunityListItem = async (communityId, listId, itemId) => {
  try {
    const res = await API.delete(
      `/communities/${communityId}/lists/${listId}/items/${itemId}`
    );
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

// --- Community Events --- //

export const fetchCommunityEvents = async (communityId) => {
  try {
    const res = await API.get(`/communities/${communityId}/events`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const createCommunityEvent = async (communityId, eventData) => {
  try {
    const res = await API.post(`/communities/${communityId}/events`, eventData);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchCommunityEventById = async (communityId, eventId) => {
  try {
    const res = await API.get(`/communities/${communityId}/events/${eventId}`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateCommunityEvent = async (communityId, eventId, eventData) => {
  try {
    const res = await API.put(
      `/communities/${communityId}/events/${eventId}`,
      eventData
    );
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteCommunityEvent = async (communityId, eventId) => {
  try {
    const res = await API.delete(
      `/communities/${communityId}/events/${eventId}`
    );
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

// --- Community Event Attendees --- //

export const fetchCommunityEventAttendees = async (communityId, eventId) => {
  try {
    const res = await API.get(
      `/communities/${communityId}/events/${eventId}/attendees`
    );
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

// (admin only)
export const addCommunityEventAttendee = async (
  communityId,
  eventId,
  attendeeData
) => {
  try {
    const res = await API.post(
      `/communities/${communityId}/events/${eventId}/attendees`,
      attendeeData
    );
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

// (admin only)
export const removeCommunityEventAttendee = async (
  communityId,
  eventId,
  userId
) => {
  try {
    const res = await API.delete(
      `/communities/${communityId}/events/${eventId}/attendees/${userId}`
    );
    return res.data;
  } catch (error) {
    handleError(error);
  }
};
