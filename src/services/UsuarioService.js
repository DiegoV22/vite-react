import api from "./axiosConfig";

// ejemplo
export const login = (correo, contrasena) =>
  api.post("/usuarios/login", { correo, contrasena });
