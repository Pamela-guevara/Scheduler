import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import Navbar from "../Navbar";
import UserCard from "./UserCard";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import styled from "styled-components";

export default function Usuarios() {
  const [users, setUsers] = useState([]);
  const [axiosEffect, setAxiosEffect] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  const listar_entrenados = async () => {
    await Axios.get("http://127.0.0.1:5000/get_entrenados")
      .then((res) => res.data)
      .then((lista_entrenados) => setUsers(lista_entrenados));
    setAxiosEffect(false);
  };

  //Manejador de evento para mostrar la información completa del usuario
  const handleClick = (user: object) => {
    // Navega al componente de detalle con el usuario seleccionado
    console.log(user);
    navigate("/usuario", {
      state: {
        user,
      },
    });
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
      <div>
        <Navbar />
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Apodo</th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((e: any) => (
              <tr key={e.id} onClick={() => handleClick(e)}>
                <td>{e.nombre}</td>
                <td>{e.apellido}</td>
                <td>{e.apodo}</td>
                <td>
                  <button>Más info</button>
                </td>
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
