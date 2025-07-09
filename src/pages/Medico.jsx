import { useEffect, useState } from "react";
import axios from "axios";

const Medico = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [turnos, setTurnos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [form, setForm] = useState({
    pacienteId: "",
    especialidad: "CARDIOLOGIA",
    centro: "CENTRO_CENTRAL",
    fecha: "",
    hora: "",
    estado: "CONFIRMADO",
  });

  useEffect(() => {
    axios.get(`https://backend-health-06rn.onrender.com/api/turnos/medico/${usuario.id}`).then((res) => {
      setTurnos(res.data);
    });

    axios.get("https://backend-health-06rn.onrender.com/api/usuarios").then((res) => {
      const soloPacientes = res.data.filter((u) => u.rol === "PACIENTE");
      setPacientes(soloPacientes);
    });
  }, [usuario.id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAgendar = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...form,
        medicoId: usuario.id,
      };
      await axios.post("https://backend-health-06rn.onrender.com/api/turnos/agendar", data);
      alert("Turno agendado correctamente");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Error al agendar turno");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial", background: "#f4f4f4", minHeight: "100vh" }}>
      <h2 style={{ color: "#2a2a2a" }}>Bienvenido Dr. {usuario.nombre}</h2>

      <h3 style={{ marginTop: "30px", color: "#1f4e79" }}>Turnos asignados a usted</h3>
      {turnos.length === 0 ? (
        <p style={{ color: "#555" }}>No hay turnos registrados.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
          <thead>
            <tr style={{ background: "#ff8c00", color: "white" }}>
              <th>Paciente</th>
              <th>Especialidad</th>
              <th>Centro</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {turnos.map((t) => (
              <tr key={t.id} style={{ backgroundColor: "#ffffff" }}>
                <td>
                {(() => {
                    const paciente = pacientes.find((p) => p.id === t.pacienteId);
                    return paciente ? paciente.nombre : `ID: ${t.pacienteId}`;
                 })()}
                </td>

                <td>{t.especialidad}</td>
                <td>{t.centro}</td>
                <td>{t.fecha}</td>
                <td>{t.hora}</td>
                <td>{t.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <hr style={{ margin: "40px 0" }} />
      <h3 style={{ color: "#1f4e79" }}>Agendar nuevo turno</h3>

      <form onSubmit={handleAgendar} style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
        <select name="pacienteId" onChange={handleChange} required style={selectStyle}>
          <option value="">Seleccione paciente</option>
          {pacientes.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} ({p.correo})
            </option>
          ))}
        </select>

        <select name="especialidad" value={form.especialidad} onChange={handleChange} style={selectStyle}>
          <option value="MEDICINA_GENERAL">Medicina General</option>
          <option value="PEDIATRIA">Pediatría</option>
          <option value="CARDIOLOGIA">Cardiología</option>
        </select>

        <select name="centro" value={form.centro} onChange={handleChange} style={selectStyle}>
          <option value="CENTRO_CENTRAL">Centro Central</option>
          <option value="CENTRO_SUR">Centro Sur</option>
          <option value="CENTRO_NORTE">Centro Norte</option>
        </select>

        <input type="date" name="fecha" onChange={handleChange} required style={inputStyle} />
        <input type="time" name="hora" onChange={handleChange} required style={inputStyle} />
        <button type="submit" style={buttonStyle}>Agendar Turno</button>
      </form>
    </div>
  );
};

// Estilos reusables
const selectStyle = {
  padding: "6px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  minWidth: "150px"
};

const inputStyle = {
  padding: "6px",
  borderRadius: "4px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  padding: "8px 16px",
  backgroundColor: "#1f4e79",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

export default Medico;
