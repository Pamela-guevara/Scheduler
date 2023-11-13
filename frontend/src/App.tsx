import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Agenda from "./Components/Scheduler/Scheduler";
import Registro from "./Components/Registro";
import Usuarios from "./Components/Usuarios/Usuarios";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <BrowserRouter>        
         <Routes>
            <Route path="/" Component={Navbar}/>
            <Route path="/Registro" Component={Registro}/>
            <Route path="/Agenda" Component={Agenda}/>
            <Route path="/Usuarios" Component={Usuarios}/>
          </Routes>
        </BrowserRouter>       
    </div>
  );
}

export default App;
