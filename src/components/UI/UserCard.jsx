import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../Shared/Modal";
import { MdDeleteOutline } from "react-icons/md";
import { useDeleteSingleDataMutation } from "../../redux/features/user/userApi";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";

const UserCard = ({ data, showViewProfileButton }) => {
  const [deleteSingleData, { isSuccess, isError, error }] =
    useDeleteSingleDataMutation();

  const handleDeleteUser = (data) => {
    deleteSingleData({ id: data?.id });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("User deleted successfully!");
    }
    if (isError) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  }, [isSuccess, isError, error]);

  return (
    <div className="max-w-x relative">
      <div className="absolute left-5 top-5">
        <Link to={`/users/update/${data?.id}`}>
          <FaRegEdit
            className={`text-xl border-none  text-green-500 hover:text-red-60 cursor-pointer`}
          />
        </Link>
      </div>
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
                  {data?.first_name} {data?.last_name}
                </span>
                ?
              </h3>
              <div className="py-4 text-center flex justify-around">
                <button
                  onClick={() => {
                    handleDeleteUser(data);
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
        <div className="photo-wrapper p-2">
          <img
            className="w-24 h-24 rounded-full mx-auto"
            src={data?.avatar}
            alt="John Doe"
          />
        </div>
        <div className="p-2">
          <h3 className="text-center text-gray-400 text-xl font-medium leading-8">
            {data?.first_name} {data?.last_name}
          </h3>
          <div className="text-center text-gray-400 text-xs font-semibold">
            <p>{data?.domain}</p>
          </div>
          <table className="text-xs text-gray-500 my-3">
            <tbody>
              <tr>
                <td className="px-2 py-2 font-semibold">Gender</td>
                <td className="px-2 py-2">{data?.gender}</td>
              </tr>
              <tr>
                <td className="px-2 py-2 font-semibold">Email</td>
                <td className="px-2 py-2">{data?.email}</td>
              </tr>
              <tr>
                <td className="px-2 py-2 font-semibold">Available</td>
                <td className="px-2 py-2">{data?.available ? "Yes" : "No"}</td>
              </tr>
            </tbody>
          </table>

          {showViewProfileButton && (
            <div className="text-center my-3">
              <Link
                className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
                to={`/users/${data?.id}`}
              >
                View Profile
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
