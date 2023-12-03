import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ data, showViewProfileButton }) => {
  return (
    <div className="max-w-x">
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
