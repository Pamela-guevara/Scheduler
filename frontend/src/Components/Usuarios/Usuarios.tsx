import React, { useState, useEffect } from "react";
import Axios from "axios";
import Navbar from "../Navbar";

export default function Usuarios() {
  const [users, setUsers] = useState([]);
  const [axiosEffect, setAxiosEffect] = useState(true);

  const listar_entrenados = async () => {
    await Axios.get("http://127.0.0.1:5000/get_entrenados")
      .then((res) => res.data)
      .then((lista_entrenados) => setUsers(lista_entrenados));
    setAxiosEffect(false);
  };

  // Se ejecuta todo cuando se monta/carga la pagina con el componente
  useEffect(() => {
    if (axiosEffect) {
      listar_entrenados();
    }
    //console.log(newUsers);
  }, [axiosEffect]);

  return (
    <div>
      <div><Navbar/></div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Apodo</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((e: any) => (
              <tr key={e.id}>
                <td>{e.nombre}</td>
                <td>{e.apellido}</td>
                <td>{e.apodo}</td>
              </tr>
            ))
          ) : (
            <p>
              <strong>Lista Vacía</strong>
            </p>
          )}
        </tbody>
      </table>
    </div>
  );
}
