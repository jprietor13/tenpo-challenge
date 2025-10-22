import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

axiosInstance.interceptors.request.use((config => {
  //TODO: BUSCR FORMA DE PERSISTIR EL TOKEN, MIENTRAS USO LOCALSTORAGE
  const token  = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}))

export default axiosInstance;

