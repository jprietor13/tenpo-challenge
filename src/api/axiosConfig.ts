import axios from "axios";
import { AuthService } from "../services/AuthService";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

axiosInstance.interceptors.request.use((config => {
  const token  = AuthService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}))

export default axiosInstance;

