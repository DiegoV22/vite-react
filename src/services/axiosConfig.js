import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://backend-health-06rn.onrender.com/api",
});

export default api;
