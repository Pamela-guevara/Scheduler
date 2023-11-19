import React, { useState } from "react";
import Axios from "axios";
import Navbar from "../Navbar/Navbar";
import styled from "styled-components";

const initialState = {
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
};

const Nuevo_entrenado = function () {
  // ESTADO INICIAL
  const [newTrained, setNewTrained] = useState(initialState);

  // HANDLERS

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewTrained({
      ...newTrained,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    alert(JSON.stringify(newTrained));
    await Axios.post("http://127.0.0.1:5000/post_entrenados", newTrained)
      .then((res) => console.log(res.data))
      .catch((err) => {
        //console.log(err);
        if (err.message === "Network Error") {
          return alert("El usuario ya existe");
        }
      });
    setNewTrained(initialState);
  };

  return (
    <FormContainer>
      <div>
        <Navbar />
      </div>
      <form onSubmit={handleOnSubmit}>
        <p>
          <input
            placeholder="Nombre"
            type="text"
            name="nombre"
            value={newTrained.nombre}
            onChange={handleInputChange}
            required
          />
        </p>
        <p>
          <input
            placeholder="Apellido"
            type="text"
            name="apellido"
            value={newTrained.apellido}
            onChange={handleInputChange}
            required
          />
        </p>

        <p>
          <input
            placeholder="Apodo"
            type="text"
            name="apodo"
            value={newTrained.apodo}
            onChange={handleInputChange}
            required
          />
        </p>
        <p>
          <input
            placeholder="DNI"
            type="tel"
            name="dni"
            value={newTrained.dni}
            onChange={handleInputChange}
            required
          />
        </p>
        <p>
          <input
            placeholder="Fecha de nacimiento"
            type="date"
            name="fecha_nacimiento"
            value={newTrained.fecha_nacimiento}
            onChange={handleInputChange}
            required
          />
        </p>
        <p>
          <input
            placeholder="Grupo sanguineo"
            type="text"
            name="grupo_sanguineo"
            value={newTrained.grupo_sanguineo}
            onChange={handleInputChange}
            required
          />
        </p>
        <p>
          <input
            placeholder="Antecedentes de salud"
            type="text"
            name="antecedentes_salud"
            value={newTrained.antecedentes_salud}
            onChange={handleInputChange}
            required
          />
        </p>
        <p>
          <input
            placeholder="Talle"
            type="text"
            name="talle"
            value={newTrained.talle}
            onChange={handleInputChange}
            required
          />
        </p>
        <p>
          <input
            placeholder="Dirección"
            type="text"
            name="direccion"
            value={newTrained.direccion}
            onChange={handleInputChange}
            required
          />
        </p>
        <p>
          <input
            placeholder="Teléfono"
            type="tel"
            name="telefono"
            value={newTrained.telefono}
            onChange={handleInputChange}
            required
          />
        </p>
        <p>
          <input
            placeholder="Correo electrónico"
            type="email"
            name="correo"
            value={newTrained.correo}
            onChange={handleInputChange}
            required
          />
        </p>

        <button>Subir</button>
      </form>
    </FormContainer>
  );
};

export default Nuevo_entrenado;

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
