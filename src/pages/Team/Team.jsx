import React, { useState } from "react";
import { useGetAllTeamQuery } from "../../redux/features/team/teamApi";
import TeamCard from "../../components/UI/TeamCard";

const Team = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [showViewTeamButton, setShowViewTeamButton] = useState(true);

  const { data: getAllTeams } = useGetAllTeamQuery({
    limit,
    page,
    searchTerm,
  });

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-10 mb-20">
      <h1 className="text-white text-center">All Teams</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
        {getAllTeams?.data?.map((data, index) => (
          <TeamCard
            key={index}
            data={data}
            showViewTeamButton={showViewTeamButton}
          />
        ))}
      </div>
    </div>
  );
};

export default Team;
