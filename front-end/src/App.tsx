import React, { useEffect } from "react";

import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Campsite from "./scences/Campsites";
import Create from "./scences/Campsites/Create";
import Login from "./scences/LoginPage";
import Register from "./scences/RegisterPage";

export interface CampsiteType {
  _id: string;
  title: string;
  location: string;
  geometry?: {
    type: string;
    coordinates: Array<Number>;
  };
  reviews?: Array<Number>;
  price?: number;
  description: string;
  author: number;
  images: [
    {
      fileName: string;
      url: string;
    }
  ];
}
function App() {

  return (
    <div className={`app`}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/campsites" element={<Campsite />} />
          <Route path="/campsites/create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
