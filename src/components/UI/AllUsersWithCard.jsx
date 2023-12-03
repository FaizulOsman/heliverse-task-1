import React, { useState } from "react";
import { useGetAllDataQuery } from "../../redux/features/user/userApi";
import { Link } from "react-router-dom";

const AllUsersWithCard = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [sortOrder, setSortOrder] = useState("desc");

  const { data: getAllUsers } = useGetAllDataQuery({
    limit,
    page,
    sortOrder,
  });

  console.log(getAllUsers);
  return (
    <div className="p-4 sm:p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center gap-4 justify-center">
        {getAllUsers?.data?.map((data, index) => (
          <div key={index} className="max-w-x">
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
                      <td className="px-2 py-2">
                        {data?.available ? "Yes" : "No"}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="text-center my-3">
                  <Link
                    className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
                    to={`/${data?.id}`}
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsersWithCard;
