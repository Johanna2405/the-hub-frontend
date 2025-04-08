import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API = axios.create({
  baseURL: `${BACKEND_URL}/api`,
});

// ------- LISTS -------

// GET all lists per user ID
export const fetchListsPerUserId = async (userId) => {
  const response = await API.get(`/lists/${userId}`);
  return response.data;
};

// GET list by ID
export const fetchListById = async (id) => {
  const response = await API.get(`/lists/${id}`);
  return response.data;
};

// POST new list
export const createList = async (listData) => {
  const response = await API.post("/lists", listData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// PUT update list
export const updateList = async (id, listData) => {
  const response = await API.put(`/lists/${id}`, listData);
  return response.data;
};

// ------- LIST ITEMS -------

// GET all items in a list
export const fetchListItems = async (listId) => {
  const response = await API.get(`/lists/${listId}/items`);
  return response.data;
};

// GET specific item in a list
export const fetchListItemById = async (listId, itemId) => {
  const response = await API.get(`/lists/${listId}/items/${itemId}`);
  return response.data;
};

// POST new item to a list
export const createListItem = async (listId, itemData) => {
  const response = await API.post(`/lists/${listId}/items`, itemData);
  return response.data;
};

// PUT update specific item in a list
export const updateListItem = async (listId, itemId, itemData) => {
  const response = await API.put(`/lists/${listId}/items/${itemId}`, itemData);
  return response.data;
};

// DELETE specific item from a list
export const deleteListItem = async (listId, itemId) => {
  const response = await API.delete(`/lists/${listId}/items/${itemId}`);
  return response.data;
};
