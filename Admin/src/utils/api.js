// utils/api.js
import axios from "axios";

console.log("API URL =", import.meta.env.VITE_API_URL);

const apiUrl = import.meta.env.VITE_API_URL; // e.g. http://localhost:8000

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