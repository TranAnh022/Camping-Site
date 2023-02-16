import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Campsite from "./scences/Campsites";
import Login from "./scences/LoginPage";
import Register from "./scences/RegisterPage";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/campsite" element={<Campsite/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
