import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function Usuarios() {
  const [newUsers, setNewUsers] = useState([]);

  const listar_entrenados = async () => {
    await Axios.get("http://127.0.0.1:5000/get_entrenados")
      .then((res) => res.data)
      .then((lista_entrenados) => setNewUsers(lista_entrenados));
  };

  // Se ejecuta todo cuando se monta/carga la pagina con el componente
  useEffect(() => {
    listar_entrenados();
    //console.log(newUsers);
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Apodo</th>
          </tr>
        </thead>
        <tbody>
          {newUsers.length > 0 ? (
            newUsers.map((e: any) => (
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
