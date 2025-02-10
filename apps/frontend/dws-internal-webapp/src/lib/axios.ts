import axios from "axios";

const apiPrefix = import.meta.env.VITE_PUBLIC_API_HOST_PREFIX;
const apiHost = import.meta.env.VITE_PUBLIC_API_HOST;
const apiPort = import.meta.env.VITE_PUBLIC_API_PORT;

const axiosInstance = axios.create({
  baseURL: `${apiPrefix}${apiHost}:${apiPort}`,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
