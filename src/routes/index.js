import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import SingleUser from "../components/UI/SingleUser";
import CreateNewUser from "../pages/User/CreateNewUser";
import CreateTeam from "../pages/Team/CreateTeam";
import Team from "../pages/Team/Team";
import Users from "../pages/Users/Users";
import MainLayout from "../layouts/MainLayout";
import TeamDetails from "../pages/Team/TeamDetails";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="teams" element={<Team />} />
          <Route path="teams/:id" element={<TeamDetails />} />
          <Route path="users/:id" element={<SingleUser />} />
          <Route path="users/create-new-user" element={<CreateNewUser />} />
          <Route path="users/create-team" element={<CreateTeam />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
