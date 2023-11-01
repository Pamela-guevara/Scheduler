import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Agenda from "./Components/Scheduler/Scheduler";
import Registro from "./Components/Registro";
import Usuarios from "./Components/Usuarios/Usuarios";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Agenda />
      <Registro />
      <Usuarios />
    </div>
  );
}

export default App;
