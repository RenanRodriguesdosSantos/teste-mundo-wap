import axios from "axios";

const api = axios.create({
  baseURL: "https://api.xpto.ninja/v1"
});

api.interceptors.request.use(async config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.defaults.headers.common['Content-Type'] = "application/json";
api.defaults.headers.common['Accept'] = "application/json";

export default api;