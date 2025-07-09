import axios from "axios";

const API_URL = "https://backend-healthturn.onrender.com/api/usuarios"; // o la URL que uses

export const getUsuarios = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
