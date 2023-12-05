import React, { useEffect, useState } from "react";
import Table from "../../components/Shared/Table";
import { useGetAllDataQuery } from "../../redux/features/user/userApi";
import { IoMdAddCircle } from "react-icons/io";
import { IoRemoveCircle } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";
import toast from "react-hot-toast";
import { useCreateTeamMutation } from "../../redux/features/team/teamApi";

const CreateTeam = () => {
  const [selectedUser, setSelectedUser] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [filterOrder, setFilterOrder] = useState("");

  const { data: getAllUsers } = useGetAllDataQuery({
    limit,
    page,
    sortOrder,
    searchTerm,
    filterBy,
    filterOrder,
  });

  const [createTeam, { isSuccess }] = useCreateTeamMutation();

  const handleSelectUser = (user) => {
    const isDomainExist = selectedUser?.filter(
      (s) => s?.domain === user?.domain
    );

    if (!isDomainExist?.length > 0) {
      if (user?.available) {
        setSelectedUser([...selectedUser, user]);
      } else {
        toast.error("Please select a user with availability true.");
      }
    } else {
      toast.error("Please select a user with unique domain.");
    }
  };

  const handleRemoveUser = (id) => {
    setSelectedUser(selectedUser?.filter((user) => user?.id !== id));
  };

  const handleCreateTeamSubmit = (e) => {
    e.preventDefault();
    const team_name = e.target.team_name.value;
    const data = {
      team_name,
      users: selectedUser,
    };
    if (selectedUser?.length > 0) {
      createTeam(data);

      e.target.team_name.value = "";
      setSelectedUser([]);
    } else {
      toast.error("Please select at least one user to create a new team.");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Team created successfully");
    }
  }, [isSuccess]);

  return (
    <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto mt-5 border rounded-lg border-blue-500 p-5 mb-20">
      <h3 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center mb-5">
        Create New Team
      </h3>
      <form
        onSubmit={(e) => handleCreateTeamSubmit(e)}
        className="grid grid-cols-1 justify-between gap-6 mt-4 max-w-[318px] sm:max-w-[623px] mx-auto"
      >
        <input
          type="text"
          name="team_name"
          placeholder="Team Name"
          className="bg-transparent shadow appearance-none border border-blue-500 rounded max-w-4xl py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
        <div>
          {selectedUser?.length > 0 && (
            <div className="mt-7">
              <h3 className="text-lg sm:text-2xl z-40 text-green-500 border-l-4 mb-5 pl-0 sm:pl-2">
                Selected Users ({selectedUser?.length})
              </h3>
              <div className="flex flex-col">
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
                      <th key="remove" className="sm:px-3 pt-0 pb-3">
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedUser?.map((user, index) => (
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
                        <td className="sm:p-3 py-2 flex items-center justify-center">
                          <IoRemoveCircle
                            onClick={() => handleRemoveUser(user?.id)}
                            className="cursor-pointer hover:text-blue-500 w-5 h-5"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        <Table
          tableTitle={`Users (${
            getAllUsers?.meta?.total ? getAllUsers?.meta?.total : 0
          })`}
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          meta={getAllUsers?.meta}
          allData={getAllUsers?.data}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          tableHeadData={[
            <th key="name" className="sm:px-3 pt-0 pb-3">
              Name
            </th>,
            <th key="email" className="sm:px-3 pt-0 pb-3 hidden sm:table-cell">
              Email
            </th>,
            <th key="domain" className="sm:px-3 pt-0 pb-3">
              Domain
            </th>,
            <th key="available" className="sm:px-3 pt-0 pb-3">
              Available
            </th>,
            <th key="select" className="sm:px-3 pt-0 pb-3">
              Select
            </th>,
          ]}
          tableBodyData={getAllUsers?.data?.map((data, index) => (
            <tr key={index} className="border-b border-gray-800">
              <td className="sm:p-3 py-2">
                {data?.first_name} {data.last_name}
              </td>
              <td className="sm:p-3 py-2 hidden sm:table-cell">
                {data?.email}
              </td>
              <td className="sm:p-3 py-2">{data?.domain}</td>
              <td className="sm:p-3 py-2">
                {data?.available ? "true" : "false"}
              </td>
              <td className="sm:p-3 py-2 flex items-center justify-center">
                {selectedUser?.find((s) => s?.id === data?.id) ? (
                  <GiCheckMark className="cursor-pointer hover:text-blue-500 w-4 h-4" />
                ) : (
                  <IoMdAddCircle
                    onClick={() => handleSelectUser(data)}
                    className="cursor-pointer hover:text-blue-500 w-5 h-5"
                  />
                )}
              </td>
            </tr>
          ))}
        />
        <button
          type="submit"
          className="btn bg-green-700 hover:bg-green-500 py-2 px-3 text-white rounded-sm mx-auto w-full"
        >
          Create Team
        </button>
      </form>
    </div>
  );
};

export default CreateTeam;
