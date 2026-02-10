// utils/api.js
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL; // e.g. http://localhost:8000

// 🔹 POST (JSON)
export const postData = async (URL, data) => {
  try {
    const response = await apiClient.post(URL, data, {
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
    const response = await apiClient.put(URL, updateData, {
      params,
      headers: { "Content-Type": "application/json" },
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
    const response = await apiClient.put(URL, updateData, {
      params,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("uploadImage error:", error.response?.data || error.message);
    throw error;
  }
};


const apiClient = axios.create({
    baseURL: apiUrl,
    withCredentials: true
});

// 🔐 Add Authorization header from localStorage if available
// This is needed because cookies may not work in cross-origin development
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
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



// 🔹 DELETE (JSON data)

export const deleteData = async (URL, updateData) => {
  try {
    const response = await apiClient.delete(URL, {
      data: updateData,   // ✅ body goes here
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("deleteData error:", error.response?.data || error.message);
    throw error;
  }
};
