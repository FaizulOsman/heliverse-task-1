import React from "react";
import AllUsersWithTable from "../../components/UI/AllUsersWithTable";
import AllUsersWithCard from "../../components/UI/AllUsersWithCard";

const Home = () => {
  return (
    <div>
      <h1 className="text-white text-center">All Users</h1>
      <AllUsersWithCard />
      <AllUsersWithTable />
    </div>
  );
};

export default Home;
