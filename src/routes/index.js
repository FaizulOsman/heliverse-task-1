import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import SingleUser from "../components/UI/SingleUser";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/users/:id" element={<SingleUser />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
