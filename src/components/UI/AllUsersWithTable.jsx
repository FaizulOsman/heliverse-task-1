import React, { useState } from "react";
import Table from "../Shared/Table";
import { useGetAllDataQuery } from "../../redux/features/user/userApi";

const AllUsersWithTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [filterOrder, setFilterOrder] = useState("");
  const [showFilterItem, setShowFilterItem] = useState(0);

  const { data: getAllUsers } = useGetAllDataQuery({
    limit,
    page,
    sortOrder,
    searchTerm,
    filterBy,
    filterOrder,
  });

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
    <div>
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-7 p-4 sm:p-10">
        <div className="max-w-7xl mx-auto sm:mx-0">
          <input
            className="bg-transparent shadow appearance-none border border-blue-500 rounded max-w-4xl py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
            id="search-input"
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="max-w-7xl mx-auto sm:mx-0 flex gap-2">
          <select
            onChange={(e) => {
              setShowFilterItem(
                (e.target.value === "domain" && 1) ||
                  (e.target.value === "gender" && 2) ||
                  (e.target.value === "available" && 3)
              );
            }}
            className="select p-2 select-bordered border border-blue-500 rounded px-3 text-gray-400 font-normal select-xs sm:select-sm max-w-xs bg-[#080925]"
          >
            <option value="">Filter by</option>
            <option value="domain">Domain</option>
            <option value="gender">Gender</option>
            <option value="available">Availability</option>
          </select>
          {showFilterItem === 1 && (
            <select
              onChange={(e) => {
                setFilterBy("domain");
                setFilterOrder(e.target.value);
              }}
              className="select select-bordered border border-blue-500 rounded px-3 text-gray-400 font-normal select-xs sm:select-sm max-w-xs bg-[#080925]"
            >
              <option>Select One</option>
              {allDomains?.map((data, index) => (
                <option value={data?.domain} key={index}>
                  {data?.domain}
                </option>
              ))}
            </select>
          )}
          {showFilterItem === 2 && (
            <select
              onChange={(e) => {
                setFilterBy("gender");
                setFilterOrder(e.target.value);
              }}
              className="select select-bordered border border-blue-500 rounded px-3 text-gray-400 font-normal select-xs sm:select-sm max-w-xs bg-[#080925]"
            >
              <option value="">Select One</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Bigender">Bigender</option>
              <option value="Agender">Agender</option>
            </select>
          )}
          {showFilterItem === 3 && (
            <select
              onChange={(e) => {
                setFilterBy("available");
                setFilterOrder(e.target.value);
              }}
              className="select select-bordered border border-blue-500 rounded px-3 text-gray-400 font-normal select-xs sm:select-sm max-w-xs bg-[#080925]"
            >
              <option value="">Select One</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          )}
        </div>
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
          <th key="image" className="sm:px-3 pt-0 pb-3 hidden md:table-cell">
            Image
          </th>,
          <th key="name" className="sm:px-3 pt-0 pb-3 hidden sm:table-cell">
            Name
          </th>,
          <th key="email" className="sm:px-3 pt-0 pb-3">
            Email
          </th>,
          <th key="gender" className="sm:px-3 pt-0 pb-3">
            Gender
          </th>,
          <th key="domain" className="sm:px-3 pt-0 pb-3">
            Domain
          </th>,
          <th key="available" className="sm:px-3 pt-0 pb-3">
            Available
          </th>,
        ]}
        tableBodyData={getAllUsers?.data?.map((data, index) => (
          <tr key={index} className="border-b border-gray-800">
            <td className="sm:p-3 py-2 hidden md:table-cell">
              <img
                src={data?.avatar}
                alt="profile"
                className="w-7 h-7 mr-2.5 border border-gray-800 rounded-full"
              />
            </td>
            <td className="sm:p-3 py-2 hidden sm:table-cell">
              {data?.first_name} {data.last_name}
            </td>
            <td className="sm:p-3 py-2 hidden sm:table-cell">{data?.email}</td>
            <td className="sm:p-3 py-2 sm:hidden table-cell">
              {data?.email.slice(0, -7)}...
            </td>
            <td className="sm:p-3 py-2">{data?.gender}</td>
            <td className="sm:p-3 py-2">{data?.domain}</td>
            <td className="sm:p-3 py-2">
              {data?.available ? "true" : "false"}
            </td>
          </tr>
        ))}
      />
    </div>
  );
};

export default AllUsersWithTable;
