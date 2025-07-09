import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Registro from "./pages/Registro.jsx";
import Paciente from "./pages/Paciente.jsx";
import Medico from "./pages/Medico.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/paciente" element={<Paciente />} />
      <Route path="/medico" element={<Medico />} />
    </Routes>
  </BrowserRouter>
);
