// utils/api.js
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

const apiClient = axios.create({
    baseURL: apiUrl,
    withCredentials: true
});

const normalizeError = (error) => {
    if (!error) {
        return { message: 'Unknown error', error: true, success: false };
    }

    if (error?.error !== undefined) {
        return error;
    }

    if (error?.message) {
        return {
            message: error.message,
            error: true,
            success: false
        };
    }

    return {
        message: 'Request failed',
        error: true,
        success: false
    };
};

export const fetchDataFromApi = async (url, config = {}) => {
    try {
        const { data } = await apiClient.get(url, config);
        return data;
    } catch (error) {
        console.log(error);
        return normalizeError(error);
    }
};