import React, { useEffect } from "react";
import Modal from "../Shared/Modal";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDeleteSingleTeamMutation } from "../../redux/features/team/teamApi";
import toast from "react-hot-toast";

const TeamCard = ({ data, showViewTeamButton }) => {
  const [deleteSingleTeam, { isSuccess, isError, error }] =
    useDeleteSingleTeamMutation();

  const handleDeleteTeam = (data) => {
    deleteSingleTeam({ id: data?.id });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Team deleted successfully");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  }, [isError, error]);

  return (
    <div>
      <div className="max-w-x relative">
        <div className="absolute right-5 top-5">
          <Modal
            Button={
              <MdDeleteOutline
                className={`text-2xl border-none  text-red-500 hover:text-red-60`}
              />
            }
            data={data}
            modalBody={
              <>
                <h3 className="font-semibold text-md sm:text-lg text-white pb-5 text-center">
                  Do you want to delete:{" "}
                  <span className="text-red-500 font-bold">
                    {data?.team_name}
                  </span>
                  ?
                </h3>
                <div className="py-4 text-center flex justify-around">
                  <button
                    onClick={() => {
                      handleDeleteTeam(data);
                      const modal = document.getElementById(data?.id);
                      if (modal) {
                        modal.close();
                      }
                    }}
                    className="btn bg-blue-700 hover:bg-blue-500 px-2 py-[2px] rounded-md btn-xs sm:btn-sm text-white"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => {
                      const modal = document.getElementById(data?.id);
                      if (modal) {
                        modal.close();
                      }
                    }}
                    className="btn bg-red-700 hover:bg-red-500 px-2 py-[2px] rounded-md btn-xs sm:btn-sm text-white"
                  >
                    No
                  </button>
                </div>
              </>
            }
          />
        </div>
        <div className="bg-[#1d1836] shadow-xl rounded-lg py-3">
          <h4 className="text-xl text-gray-400 font-bold text-center p-2">
            {data?.team_name}
          </h4>
          <h4 className="text-lg text-green-400 font-bold p-5">User List</h4>

          <div className="p-2">
            <table className="w-full text-left">
              <thead>
                <tr className="font-bold text-blue-500">
                  <th key="name" className="sm:px-3 pt-0 pb-3">
                    Name
                  </th>
                  <th key="domain" className="sm:px-3 pt-0 pb-3">
                    Domain
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.users?.map((user, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-800 text-gray-400 text-sm"
                  >
                    <td className="sm:p-3 py-2">
                      {user?.first_name} {user.last_name}
                    </td>
                    <td className="sm:p-3 py-2">{user?.domain}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {showViewTeamButton && (
              <div className="text-center my-3">
                <Link
                  className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
                  to={`/teams/${data?.id}`}
                >
                  Team Details
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
