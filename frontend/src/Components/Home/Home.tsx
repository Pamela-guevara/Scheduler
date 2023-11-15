import React from "react";
import Navbar from "../Navbar/Navbar";
import "./home.css";
import portait_1 from "../../public/portait_1.jpg";

export default function Home() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        {/* <img src="https://drive.google.com/file/d/16ZPWrvLllQEY5gsZE3dFFyDMn9uiUhfS/view?usp=sharing" /> */}
        <img src={portait_1} />
        <h1>Actitud Running</h1>
      </div>
    </div>
  );
}
