import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import SingleUser from "../components/UI/SingleUser";
import CreateNewUser from "../pages/User/CreateNewUser";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/users/:id" element={<SingleUser />} />
        <Route
          exact
          path="/users/create-new-user"
          element={<CreateNewUser />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
