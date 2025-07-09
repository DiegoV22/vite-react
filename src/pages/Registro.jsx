import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registro = () => {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    rol: "PACIENTE",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("https://backend-health-06rn.onrender.com/api/usuarios/registrar", form);
      console.log("Usuario creado:", res.data);
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError("El correo ya está registrado.");
      } else {
        setError("Error al registrar usuario.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Registro</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo"
            value={form.correo}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="contrasena"
            placeholder="Contraseña"
            value={form.contrasena}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <select name="rol" value={form.rol} onChange={handleChange} style={styles.select}>
            <option value="PACIENTE">Paciente</option>
            <option value="MEDICO">Médico</option>
          </select>
          <button type="submit" style={styles.button}>Crear cuenta</button>
        </form>

        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#f6f6f6",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: "30px 40px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    color: "#2f3640",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #dcdde1",
    fontSize: "16px",
  },
  select: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #dcdde1",
    fontSize: "16px",
    backgroundColor: "#fff",
    color: "#2f3640",
  },
  button: {
    backgroundColor: "#e67e22",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  },
  error: {
    marginTop: "15px",
    color: "#c0392b",
  },
};

export default Registro;
