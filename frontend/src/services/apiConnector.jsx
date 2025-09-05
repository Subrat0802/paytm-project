import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true, 
});

export const apiConnector = async (method, url, data = {}, headers = {}, params = {}) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,     
      headers,
      params,
    });

    return response.data; 
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error; 
  }
};
