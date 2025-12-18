import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "";

export const postData = async (URL, formData) => {
  try {
    const response = await axios.post(apiUrl + URL, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("postData error:", error);
    throw error;
  }
};

