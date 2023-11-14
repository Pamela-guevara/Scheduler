import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar";

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

  var fecha_nac = fecha_nacimiento.slice(0, 10);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <h2>Información detallada</h2>
      <ul>
        <li>Nombre: {nombre}</li>
        <li>Apellido: {apellido}</li>
        <li>Apodo: {apodo}</li>
        <li>DNI: {dni}</li>
        <li>Fecha de Nacimiento: {fecha_nac}</li>
        <li>Grupo Sanguíneo: {grupo_sanguineo}</li>
        <li>Antecedentes de salud: {antecedentes_salud}</li>
        <li>Talle: {talle}</li>
        <li>Dirección: {direccion}</li>
        <li>Teléfono: {telefono}</li>
        <li>Correo electrónico: {correo}</li>
      </ul>
    </div>
  );
}
