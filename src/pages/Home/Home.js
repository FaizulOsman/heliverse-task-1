import React, { useState } from "react";
import AllUsersWithTable from "../../components/UI/AllUsersWithTable";
import AllUsersWithCard from "../../components/UI/AllUsersWithCard";

const Home = () => {
  const [showData, setShowData] = useState(1);

  return (
    <div>
      <h1 className="text-white text-center">All Users</h1>
      <div className="flex justify-center items-center pb-4">
        <div
          class={`inline-flex rounded-md shadow-[0px_1px_10px_0px_#3b71ca]`}
          role="group"
        >
          <button
            onClick={() => setShowData(1)}
            type="button"
            class={`${
              showData === 1 && "bg-green-700"
            } inline-block rounded-l px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-green-600 focus:bg-green-600 focus:outline-none focus:ring-0 active:bg-green-700`}
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Card
          </button>
          <button
            onClick={() => setShowData(2)}
            type="button"
            class={`${
              showData === 2 && "bg-green-700"
            } inline-block rounded-r bg-green px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-green-600 focus:bg-green-600 focus:outline-none focus:ring-0 active:bg-green-700`}
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Table
          </button>
        </div>
      </div>
      {showData === 1 && <AllUsersWithCard />}
      {showData === 2 && <AllUsersWithTable />}
    </div>
  );
};

export default Home;
