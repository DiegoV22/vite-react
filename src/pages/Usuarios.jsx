import { useEffect, useState } from "react";
import { getUsuarios } from "../services/UsuarioService";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    getUsuarios().then((data) => setUsuarios(data));
  }, []);

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>
            {u.nombre} - {u.correo} - Rol: {u.rol}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Usuarios;
