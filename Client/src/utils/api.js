 // utils/api.js
import axios from "axios";


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

<<<<<<< HEAD

export const editData = async (URL, data) => {
  try {
    const response = await axios.put(apiUrl + URL, data, {
=======
export const uploadImage = async (URL, updateData, params = {}) => {
  const res = await axios.put(
    apiUrl + URL,
    updateData,
    {
      params, // ✅ now defined
>>>>>>> 8ba69ef (changes in accountsiderbar & myaccount)
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
<<<<<<< HEAD
    });
    return response.data;
  } catch (error) {
    console.error("editData error:", error.response?.data || error.message);
    throw error;
  }
};
=======
    }
  );

  return res.data;
};



export const editData = async (URL, updateData, params = {}) => {
  const res = await axios.put(
    apiUrl + URL,
    updateData,
    {
      params, // ✅ now defined
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};
>>>>>>> 8ba69ef (changes in accountsiderbar & myaccount)
