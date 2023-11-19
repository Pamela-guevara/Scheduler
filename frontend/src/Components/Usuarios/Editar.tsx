import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import styled from "styled-components";
import Axios from "axios";

const Editar = () => {
  const location = useLocation();
  const [editedUser, setEditedUser] = useState({
    nombre: "",
    apellido: "",
    apodo: "",
    dni: "",
    fecha_nacimiento: "",
    grupo_sanguineo: "",
    antecedentes_salud: "",
    talle: "",
    direccion: "",
    telefono: "",
    correo: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.editingUser) {
      setEditedUser(location.state.editingUser);
    }
  }, [location.state]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    Axios.put("http://127.0.0.1:5000/put_one/" + editedUser.dni, editedUser)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
    navigate("/usuarios", { state: { editedUser } });

    setEditedUser({
      nombre: "",
      apellido: "",
      apodo: "",
      dni: "",
      fecha_nacimiento: "",
      grupo_sanguineo: "",
      antecedentes_salud: "",
      talle: "",
      direccion: "",
      telefono: "",
      correo: "",
    });
  };

  return (
    <FormContainer>
      <div>
        <Navbar />
      </div>
      <form onSubmit={handleSubmit}>
        <p>
          <input
            placeholder="Nombre"
            type="text"
            name="nombre"
            value={editedUser.nombre}
            onChange={handleInputChange}
            required
          />
        </p>
        <p>
          <input
            placeholder="Apellido"
            type="text"
            name="apellido"
            value={editedUser.apellido}
            onChange={handleInputChange}
            required
          />
        </p>

        <p>
          <input
            placeholder="Apodo"
            type="text"
            name="apodo"
            value={editedUser.apodo}
            onChange={handleInputChange}
            required
          />
        </p>
        <p>
          <input
            placeholder="DNI"
            type="tel"
            name="dni"
            value={editedUser.dni}
            onChange={handleInputChange}
            required
          />
        </p>
        <p>
          <input
            placeholder="Fecha de nacimiento"
            type="date"
            name="fecha_nacimiento"
            value={editedUser.fecha_nacimiento.split("T")[0]}
            onChange={handleInputChange}
            required
          />
        </p>
        <p>
          <input
            placeholder="Grupo sanguineo"
            type="text"
            name="grupo_sanguineo"
            value={editedUser.grupo_sanguineo}
            onChange={handleInputChange}
            required
          />
        </p>
        <p>
          <input
            placeholder="Antecedentes de salud"
            type="text"
            name="antecedentes_salud"
            value={editedUser.antecedentes_salud}
            onChange={handleInputChange}
            required
          />
        </p>
        <p>
          <input
            placeholder="Talle"
            type="text"
            name="talle"
            value={editedUser.talle}
            onChange={handleInputChange}
            required
          />
        </p>
        <p>
          <input
            placeholder="Dirección"
            type="text"
            name="direccion"
            value={editedUser.direccion}
            onChange={handleInputChange}
            required
          />
        </p>
        <p>
          <input
            placeholder="Teléfono"
            type="tel"
            name="telefono"
            value={editedUser.telefono}
            onChange={handleInputChange}
            required
          />
        </p>
        <p>
          <input
            placeholder="Correo electrónico"
            type="email"
            name="correo"
            value={editedUser.correo}
            onChange={handleInputChange}
            required
          />
        </p>
        <button type="submit">Guardar cambios</button>
      </form>
    </FormContainer>
  );
};

export default Editar;

const FormContainer = styled.div`
  form{
    padding: 50px 55px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2)
    border-radius: 20%;
    text-aling: center;
    width: auto;
  }
  input{
    padding:10px 20px;
    border-radius: 25px;
    margin-bottom: 20px;
    border:2px solid white;
    color: black;
  }
  button{
    font-size: 16px;
    padding:10px 20px;
    border-radius: 25px;
    color: black;
  }
  button:hover{
    background-color: hotpink ;
  }
`;
