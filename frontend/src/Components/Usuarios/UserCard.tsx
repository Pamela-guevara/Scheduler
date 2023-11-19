import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./UserCard.css";
import Axios from "axios";

export default function UserCard({ ...props }) {
  const location = useLocation();
  const {
    nombre,
    apellido,
    apodo,
    dni,
    fecha_nacimiento,
    grupo_sanguineo,
    antecedentes_salud,
    talle,
    direccion,
    telefono,
    correo,
  } = location.state.user;
  const navigate = useNavigate();

  var fecha_nac = fecha_nacimiento.slice(0, 10);

  const handleDelete = async () => {
    await Axios.delete("http://127.0.0.1:5000/delete_one/" + dni)
      .then((res) => res.data)
      .then((data) => alert("El usuario ha sido eliminado"));
    navigate("/Usuarios");
  };
  

  
  const handleEdit = async () => {
    navigate("/Edit", {state:{editingUser: location.state.user}});
  };

  
  

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="div-list">
        <h2>Información detallada</h2>
        <ul>
          <li>
            <span>Nombre:</span> {nombre}
          </li>
          <li>
            <span>Apellido:</span> {apellido}
          </li>
          <li>
            <span>Apodo:</span> {apodo}
          </li>
          <li>
            <span>DNI:</span> {dni}
          </li>
          <li>
            <span>Fecha de Nacimiento:</span> {fecha_nac}
          </li>
          <li>
            <span>Grupo Sanguíneo:</span> {grupo_sanguineo}
          </li>
          <li>
            <span>Antecedentes de salud:</span> {antecedentes_salud}
          </li>
          <li>
            <span>Talle:</span> {talle}
          </li>
          <li>
            <span>Dirección:</span> {direccion}
          </li>
          <li>
            <span>Teléfono:</span> {telefono}
          </li>
          <li>
            <span>Correo electrónico:</span> {correo}
          </li>
          <button onClick={handleEdit}>Editar</button>
          <button
            onClick={() => {
              handleDelete();
            }}
          >
            Borrar
          </button>
        </ul>
      </div>
    </div>
  );
}
