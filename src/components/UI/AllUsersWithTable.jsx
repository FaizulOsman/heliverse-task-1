import React, { useState } from "react";
import Table from "../Shared/Table";
import { useGetAllDataQuery } from "../../redux/features/user/userApi";

const AllUsersWithTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [sortOrder, setSortOrder] = useState("desc");

  const { data: getAllUsers } = useGetAllDataQuery({
    limit,
    page,
    sortOrder,
  });

  return (
    <div>
      <Table
        tableTitle={`All Users (${
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
