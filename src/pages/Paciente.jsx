import { useEffect, useState } from "react";
import axios from "axios";

const Paciente = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [turnos, setTurnos] = useState([]);
  const [medicos, setMedicos] = useState([]);

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const res = await axios.get(`https://backend-health-06rn.onrender.com/api/turnos/paciente/${usuario.id}`);
        setTurnos(res.data);
      } catch (err) {
        console.error("Error al obtener los turnos:", err);
      }
    };

    const fetchMedicos = async () => {
      try {
        const res = await axios.get("https://backend-health-06rn.onrender.com/api/usuarios");
        const soloMedicos = res.data.filter((u) => u.rol === "MEDICO");
        setMedicos(soloMedicos);
      } catch (err) {
        console.error("Error al obtener los médicos:", err);
      }
    };

    fetchTurnos();
    fetchMedicos();
  }, [usuario.id]);

  const obtenerNombreMedico = (id) => {
    const medico = medicos.find((m) => m.id === id);
    return medico ? medico.nombre : `ID: ${id}`;
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <h2 style={{ color: "#1c3d5a" }}>Bienvenido, {usuario.nombre}</h2>
      <h3 style={{ color: "#1c3d5a" }}>Mis Turnos</h3>

      {turnos.length === 0 ? (
        <p style={{ fontStyle: "italic" }}>No tienes turnos registrados.</p>
      ) : (
        <table style={{ borderCollapse: "collapse", width: "100%", backgroundColor: "#fff", borderRadius: "8px", overflow: "hidden", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
          <thead style={{ backgroundColor: "#ff7f0e", color: "#fff" }}>
            <tr>
              <th style={{ padding: "10px" }}>Especialidad</th>
              <th style={{ padding: "10px" }}>Centro</th>
              <th style={{ padding: "10px" }}>Fecha</th>
              <th style={{ padding: "10px" }}>Hora</th>
              <th style={{ padding: "10px" }}>Estado</th>
              <th style={{ padding: "10px" }}>Médico</th>
            </tr>
          </thead>
          <tbody>
            {turnos.map((turno) => (
              <tr key={turno.id} style={{ textAlign: "center", borderBottom: "1px solid #ccc" }}>
                <td style={{ padding: "8px" }}>{turno.especialidad}</td>
                <td style={{ padding: "8px" }}>{turno.centro}</td>
                <td style={{ padding: "8px" }}>{turno.fecha}</td>
                <td style={{ padding: "8px" }}>{turno.hora}</td>
                <td style={{ padding: "8px" }}>{turno.estado}</td>
                <td style={{ padding: "8px" }}>{obtenerNombreMedico(turno.medicoId)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Paciente;
