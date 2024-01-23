import axios from "axios";

const TIMEOUT_DURATION = 110000;
const BASE_URL = "http://localhost:3000";

const axiosInstance = axios.create({
    baseURL:BASE_URL,
    timeout: TIMEOUT_DURATION,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
