import React, { useEffect } from "react";
import { useInsertDataMutation } from "../../redux/features/user/userApi";
import toast from "react-hot-toast";

const CreateNewUser = () => {
  const [insertData, { isSuccess, isError, error }] = useInsertDataMutation();

  const handleCreateNewUser = (e) => {
    e.preventDefault();
    const first_name = e.target.first_name.value;
    const last_name = e.target.last_name.value;
    const email = e.target.email.value;
    const avatar = e.target.avatar.value;
    const domain = e.target.domain.value;
    const gender = e.target.gender.value;
    const available = e.target.available.value === true ? true : false;

    const data = {
      first_name,
      last_name,
      email,
      avatar,
      domain,
      gender,
      available,
    };

    insertData(data);

    e.target.first_name.value = "";
    e.target.last_name.value = "";
    e.target.email.value = "";
    e.target.avatar.value = "";
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("User created successfully!");
    }
    if (isError) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  }, [isSuccess, isError, error]);

  return (
    <div className="pb-20">
      <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto mt-5 border rounded-lg border-blue-500 p-5">
        <h3 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center mb-5">
          Create New User
        </h3>
        <form
          onSubmit={(e) => handleCreateNewUser(e)}
          className="grid grid-cols-1 sm:grid-cols-2 justify-between gap-6 mt-4"
        >
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            className="bg-transparent shadow appearance-none border border-blue-500 rounded max-w-4xl py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            className="bg-transparent shadow appearance-none border border-blue-500 rounded max-w-4xl py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          <input
            type="text"
            name="avatar"
            placeholder="Image URL"
            className="bg-transparent shadow appearance-none border border-blue-500 rounded max-w-4xl py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="bg-transparent shadow appearance-none border border-blue-500 rounded max-w-4xl py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          <select
            name="domain"
            className="max-w-4xl select select-bordered border border-blue-500 rounded px-3 text-gray-400 font-normal select-xs sm:select-sm bg-[#080925] py-2"
          >
            <option value="Business Development">Domain</option>
            <option value="Business Development">Business Development</option>
            <option value="Sales">Sales</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="UI Designing">UI Designing</option>
            <option value="Management">Management</option>
            <option value="IT">IT</option>
          </select>
          <select
            name="gender"
            className="max-w-4xl select select-bordered border border-blue-500 rounded px-3 text-gray-400 font-normal select-xs sm:select-sm bg-[#080925] py-2"
          >
            <option value="Male">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Bigender">Bigender</option>
            <option value="Agender">Agender</option>
          </select>
          <select
            name="available"
            className="max-w-4xl select select-bordered border border-blue-500 rounded px-3 text-gray-400 font-normal select-xs sm:select-sm bg-[#080925] py-2"
          >
            <option value="true">Availability</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          <button
            type="submit"
            className="btn bg-green-700 hover:bg-green-500 py-2 px-3 text-white rounded-sm mx-auto w-full"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewUser;
