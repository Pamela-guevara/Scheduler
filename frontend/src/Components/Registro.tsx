import React, { useState } from "react";
import Axios from "axios";

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
  es_activo: "",
  pago: true,
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
  };

  return (
    <div>
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
        <p>
          <input
            type="radio"
            id="Si"
            name="es_activo"
            value="Si"
            onChange={handleInputChange}
            required
          />
          <label htmlFor="Si">Si está activo</label>
        </p>
        <p>
          <input
            type="radio"
            id="No"
            name="es_activo"
            value="No"
            onChange={handleInputChange}
            required
          />
          <label htmlFor="No">No esta activo</label>
        </p>
        <p>
          <input
            type="radio"
            id="Si"
            name="pago"
            value="Si"
            onChange={handleInputChange}
            required
          />
          <label htmlFor="Si">Si Pago</label>
        </p>
        <p>
          <input
            type="radio"
            id="No"
            name="pago"
            value="No"
            onChange={handleInputChange}
            required
          />
          <label htmlFor="No">No Pago</label>
        </p>
        <button>Subir</button>
      </form>
    </div>
  );
};

export default Nuevo_entrenado;
