import React from "react";
import { useParams } from "react-router";
import { useGetSingleDataQuery } from "../../redux/features/user/userApi";
import UserCard from "./UserCard";
import Navbar from "../Shared/Navbar";

const SingleUser = () => {
  const { id } = useParams();

  const { data: getSingleUserData } = useGetSingleDataQuery({ id });

  console.log(getSingleUserData);
  return (
    <>
      <Navbar />
      <div className="p-4 sm:p-10">
        <h1 className="text-white text-center">User Profile</h1>
        <UserCard data={getSingleUserData?.data} />
      </div>
    </>
  );
};

export default SingleUser;
