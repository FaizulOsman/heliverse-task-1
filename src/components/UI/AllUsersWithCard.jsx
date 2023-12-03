import React from "react";
import { useGetAllDataQuery } from "../../redux/features/user/userApi";

const AllUsersWithCard = () => {
  const { data: getAllUsers } = useGetAllDataQuery();

  return <div></div>;
};

export default AllUsersWithCard;
