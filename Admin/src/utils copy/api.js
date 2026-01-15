/*  / utils/api.js
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL; // e.g. http://localhost:8000

// 🔹 POST (JSON)
export const postData = async (URL, data) => {
  try {
    const response = await axios.post(apiUrl + URL, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("postData error:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 PUT (JSON data)
export const editData = async (URL, updateData, params = {}) => {
  try {
    const response = await axios.put(apiUrl + URL, updateData, {
      params,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("editData error:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 PUT (Image / multipart)
export const uploadImage = async (URL, updateData, params = {}) => {
  try {
    const response = await axios.put(apiUrl + URL, updateData, {
      params,
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "uploadImage error:",
      error.response?.data || error.message
    );
    throw error;
  }
};


const API_URL = "http://localhost:8000";

export const postData = async (url, data) => {
  const response = await axios.post(`${API_URL}${url}`, data, {
    withCredentials: true,
  });
  return response.data;
};



*/



// utils/api.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// 🔹 POST (JSON)
export const postData = async (url, data) => {
  try {
    const response = await axios.post(`${API_URL}${url}`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("postData error:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 PUT (JSON data)
export const editData = async (url, updateData, params = {}) => {
  try {
    const response = await axios.put(`${API_URL}${url}`, updateData, {
      params,
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("editData error:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 PUT (Image / multipart)
export const uploadImage = async (url, updateData, params = {}) => {
  try {
    const response = await axios.put(`${API_URL}${url}`, updateData, {
      params,
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error(
      "uploadImage error:",
      error.response?.data || error.message
    );
    throw error;
  }
};
