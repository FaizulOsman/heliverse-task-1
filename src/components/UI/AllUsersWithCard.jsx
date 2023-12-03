import React, { useState } from "react";
import { useGetAllDataQuery } from "../../redux/features/user/userApi";
import { Link } from "react-router-dom";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const AllUsersWithCard = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [sortOrder, setSortOrder] = useState("desc");

  const { data: getAllUsers } = useGetAllDataQuery({
    limit,
    page,
    sortOrder,
  });

  console.log(getAllUsers?.meta);
  const totalPage = Math.ceil(
    parseInt(getAllUsers?.meta?.total) / parseInt(getAllUsers?.meta?.limit)
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage);
    }
  };

  return (
    <div className="p-4 sm:p-10">
      <div className="flex w-full items-center mb-7">
        <div className="flex items-center text-lg sm:text-2xl z-40 text-green-500 border-l-4 pl-3">
          Users ({getAllUsers?.meta?.total})
        </div>
        <div className="ml-auto text-xs inline-flex items-center">
          <span className="mr-3 hidden sm:inline-block text-gray-400">
            Limit {limit}
          </span>
          <button
            onClick={() => setLimit(limit - 1)}
            className={`mr-3 inline-flex items-center h-6 w-6 sm:h-8 sm:w-8 justify-center rounded-md shadow border border-gray-500 text-gray-500 ${
              limit === 1 ? "opacity-50 cursor-not-allowed" : "border-gray-800"
            } leading-none`}
            disabled={limit === 1}
          >
            <BiChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setLimit(limit + 1)}
            className={`inline-flex items-center h-6 w-6 sm:h-8 sm:w-8 justify-center rounded-md shadow border border-gray-500 text-gray-500 ${
              page === totalPage
                ? "opacity-50 cursor-not-allowed"
                : "border-gray-800"
            } leading-none`}
            disabled={limit === parseInt(getAllUsers?.meta?.total)}
          >
            <BiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
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
      <div className="flex flex-wrap w-full mt-5 gap-2 justify-end">
        <button
          onClick={() => handlePageChange(page - 1)}
          className={`inline-flex items-center h-6 w-6 sm:h-8 sm:w-8 justify-center rounded-md shadow border border-gray-500 text-gray-500 ${
            page === 1 ? "opacity-50 cursor-not-allowed" : "border-gray-500"
          } leading-none`}
          disabled={page === 1}
        >
          <BiChevronLeft className="w-5 h-5" />
        </button>
        {Array.from({ length: totalPage >= 5 ? 5 : totalPage }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`inline-flex items-center h-6 w-6 sm:h-8 sm:w-8 justify-center rounded-md shadow border border-gray-500 text-gray-500 ${
              page === index + 1
                ? "bg-green-600 text-white border-green-500"
                : "border-gray-500"
            } leading-none`}
          >
            {index + 1}
          </button>
        ))}
        {page !== 6 && ". . ."}
        {page >= 6 &&
          Array.from(
            { length: totalPage + 1 },
            (_, index) =>
              page === index && (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`inline-flex items-center h-6 w-6 sm:h-8 sm:w-8 justify-center rounded-md shadow border bg-green-600 text-white border-green-500 leading-none`}
                >
                  {index}
                </button>
              )
          )}
        {page >= 6 && page !== totalPage && ". . ."}
        <button
          onClick={() => handlePageChange(page + 1)}
          className={`inline-flex items-center h-6 w-6 sm:h-8 sm:w-8 justify-center rounded-md shadow border border-gray-500 text-gray-500 ${
            page === totalPage
              ? "opacity-50 cursor-not-allowed"
              : "border-gray-500"
          } leading-none`}
          disabled={page === totalPage}
        >
          <BiChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default AllUsersWithCard;
