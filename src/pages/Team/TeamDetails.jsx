import React from "react";
import { useParams } from "react-router";
import { useGetSingleTeamQuery } from "../../redux/features/team/teamApi";

const TeamDetails = () => {
  const { id } = useParams();

  const { data: getSingleTeam } = useGetSingleTeamQuery({ id });

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-10">
      <h3 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center mb-5">
        {getSingleTeam?.data?.team_name}
      </h3>
      <div className="mt-10">
        <table className="w-full text-left">
          <thead>
            <tr className="font-bold text-blue-500">
              <th key="name" className="sm:px-3 pt-0 pb-3">
                Name
              </th>
              <th
                key="email"
                className="sm:px-3 pt-0 pb-3 hidden sm:table-cell"
              >
                Email
              </th>
              <th key="domain" className="sm:px-3 pt-0 pb-3">
                Domain
              </th>
              <th key="available" className="sm:px-3 pt-0 pb-3">
                Available
              </th>
            </tr>
          </thead>
          <tbody>
            {getSingleTeam?.data?.users?.map((user, index) => (
              <tr
                key={index}
                className="border-b border-gray-800 text-gray-400 text-sm"
              >
                <td className="sm:p-3 py-2">
                  {user?.first_name} {user.last_name}
                </td>
                <td className="sm:p-3 py-2 hidden sm:table-cell">
                  {user?.email}
                </td>
                <td className="sm:p-3 py-2">{user?.domain}</td>
                <td className="sm:p-3 py-2">
                  {user?.available ? "true" : "false"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamDetails;
