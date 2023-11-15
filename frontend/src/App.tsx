import React from "react";
import "./App.css";
import Agenda from "./Components/Scheduler/Scheduler";
import Registro from "./Components/Registro";
import Usuarios from "./Components/Usuarios/Usuarios";
import Navbar from "./Components/Navbar/Navbar";
import UserCard from "./Components/Usuarios/UserCard";
import Home from "./Components/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/" Component={Navbar} />
          <Route path="/Registro" Component={Registro} />
          <Route path="/Agenda" Component={Agenda} />
          <Route path="/Usuarios" Component={Usuarios} />
          <Route path="/usuario" Component={UserCard} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
