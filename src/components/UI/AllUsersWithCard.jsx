import React, { useState } from "react";
import { useGetAllDataQuery } from "../../redux/features/user/userApi";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import UserCard from "./UserCard";
import Loader from "../Shared/Loader";

const AllUsersWithCard = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterByDomain, setFilterByDomain] = useState("");
  const [filterByGender, setFilterByGender] = useState("");
  const [filterByAvailability, setFilterByAvailability] = useState("");

  const { data: getAllUsers } = useGetAllDataQuery({
    limit,
    page,
    sortOrder,
    searchTerm,
    filterByDomain,
    filterByGender,
    filterByAvailability,
  });

  const totalPage = Math.ceil(
    parseInt(getAllUsers?.meta?.total) / parseInt(getAllUsers?.meta?.limit)
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage);
    }
  };

  const allDomains = [];
  getAllUsers?.data?.map((data) => {
    if (allDomains?.length > 0) {
      const isDomainExist = allDomains?.find(
        (item) => item?.domain === data?.domain
      );

      if (!isDomainExist) {
        allDomains.push(data);
      }
    } else {
      allDomains.push(data);
    }
  });

  return (
    <>
      {getAllUsers?.data?.length > 0 ? (
        <div className="max-w-7xl mx-auto p-4 sm:p-10">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-7">
            <div className="max-w-7xl mx-auto sm:mx-0">
              <input
                className="bg-transparent shadow appearance-none border border-blue-500 rounded max-w-4xl py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                id="search-input"
                type="text"
                placeholder="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="max-w-7xl mx-auto sm:mx-0 flex flex-col gap-2">
              <select
                onChange={(e) => {
                  setFilterByDomain(e.target.value);
                }}
                className="select select-bordered border border-blue-500 rounded px-3 text-gray-400 font-normal select-xs sm:select-sm max-w-xs bg-[#080925] py-2"
              >
                <option value="">Domain</option>
                <option value="Business Development">
                  Business Development
                </option>
                <option value="Sales">Sales</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="UI Designing">UI Designing</option>
                <option value="Management">Management</option>
                <option value="IT">IT</option>
              </select>
              <select
                onChange={(e) => {
                  setFilterByGender(e.target.value);
                }}
                className="select select-bordered border border-blue-500 rounded px-3 text-gray-400 font-normal select-xs sm:select-sm max-w-xs bg-[#080925] py-2"
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Bigender">Bigender</option>
                <option value="Agender">Agender</option>
                <option value="Polygender">Polygender</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Genderfluid">Genderfluid</option>
                <option value="Genderqueer">Genderqueer</option>
              </select>
              <select
                onChange={(e) => {
                  setFilterByAvailability(e.target.value);
                }}
                className="select select-bordered border border-blue-500 rounded px-3 text-gray-400 font-normal select-xs sm:select-sm max-w-xs bg-[#080925] py-2"
              >
                <option value="">Availability</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
          </div>
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
                  limit === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "border-gray-500 text-gray-500"
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
                    : "border-gray-500 text-gray-500"
                } leading-none`}
                disabled={limit === parseInt(getAllUsers?.meta?.total)}
              >
                <BiChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center gap-4 justify-center">
            {getAllUsers?.data?.map((data, index) => (
              <UserCard key={index} data={data} showViewProfileButton={true} />
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
            {Array.from(
              { length: totalPage >= 5 ? 5 : totalPage },
              (_, index) => (
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
              )
            )}
            {page !== 6 && <span className="text-gray-500">. . .</span>}
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
            {page >= 6 && page !== totalPage && (
              <span className="text-gray-500">. . .</span>
            )}

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
      ) : (
        <div className="min-h-[30vh] flex items-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default AllUsersWithCard;
