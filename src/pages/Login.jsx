import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("https://backend-health-06rn.onrender.com/api/usuarios/login", {
        correo,
        contrasena,
      });

      const usuario = response.data;
      localStorage.setItem("usuario", JSON.stringify(usuario));

      if (usuario.rol === "PACIENTE") {
        navigate("/paciente");
      } else if (usuario.rol === "MEDICO") {
        navigate("/medico");
      } else {
        navigate("/admin");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Usuario no registrado o contraseña incorrecta.");
      } else {
        setError("Error al iniciar sesión.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Iniciar Sesión</h2>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Ingresar</button>
        </form>

        <button onClick={() => navigate("/registro")} style={styles.secondaryButton}>
          ¿No tienes cuenta? Regístrate
        </button>

        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#f5f6fa",
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
  secondaryButton: {
    marginTop: "15px",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    padding: "8px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
  error: {
    marginTop: "15px",
    color: "#c0392b",
  },
};

export default Login;
