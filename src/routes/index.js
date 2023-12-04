import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import SingleUser from "../components/UI/SingleUser";
import CreateNewUser from "../pages/User/CreateNewUser";
import CreateTeam from "../pages/Team/CreateTeam";
import Team from "../pages/Team/Team";
import Users from "../pages/Users/Users";
import MainLayout from "../layouts/MainLayout";

const Routers = () => {
  return (
    <BrowserRouter>
      {/* <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/teams" element={<Team />} />
        <Route exact path="/users/:id" element={<SingleUser />} />
        <Route
          exact
          path="/users/create-new-user"
          element={<CreateNewUser />}
        />
        <Route exact path="/users/create-team" element={<CreateTeam />} />
      </Routes> */}
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="teams" element={<Team />} />
          <Route path="users/:id" element={<SingleUser />} />
          <Route path="users/create-new-user" element={<CreateNewUser />} />
          <Route path="users/create-team" element={<CreateTeam />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
