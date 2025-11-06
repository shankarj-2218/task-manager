import axios from "axios";

const API = axios.create({
  baseURL: "https://your-backend.onrender.com/api", // change after deploy
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
