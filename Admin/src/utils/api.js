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

//remove old uploadImages code.

export const uploadImages = async (url, formData) => {
  // Added try-catch block 
  try {
    // Renamed 'params' to 'config' 
    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, 
        'Content-Type': 'multipart/form-data', 
      },
    };

    // Removed the mixed async/await and .then() syntax into a clean
    const response = await axios.post(apiUrl + url, formData, config);
    return response;
  } catch (error) {
    // Log the error and throw it
    console.error("uploadImages error:", error.response?.data || error.message);
    throw error;
  }
};


export const deleteImages = async (url) => {
  try{
    const params = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, 
      // Include your API key in the Authorization header

      'Content-Type': 'multipart/form-data', 
      // Adjust the content type as needed

      
    },
  };

  const response = await axios.delete(apiUrl + url, params);
  return response;
  }
  catch(error){
    console.log("Delete Error:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchDataFromApi = async (endpoint) => {
  try {
    const  data  = await axios.get(apiUrl + endpoint);
    return data;
  } catch (error) {
    console.log("Fetch API Error:", error);
    return error.response?.data || error.message;
  }
  
};

export const deleteData = async (url) => {
  try{
    const params = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, 
      },
    }
    // console.log("REached deleteData")
    const response = await axios.delete(apiUrl + url, params);
    return response;
  }
  catch(error){
    console.log(error)
    console.log("Error in deleteData AXIOS Call")
  }
}
