import React, { useEffect } from "react";
import {
  useGetSingleDataQuery,
  useUpdateSingleDataMutation,
} from "../../redux/features/user/userApi";
import toast from "react-hot-toast";
import { useParams } from "react-router";

const UpdateUser = () => {
  const { id } = useParams();

  const { data: getSingleUserData } = useGetSingleDataQuery({ id });

  const [updateSingleData, { isSuccess, isError, error }] =
    useUpdateSingleDataMutation();

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const first_name = e.target.first_name.value;
    const last_name = e.target.last_name.value;
    const email = e.target.email.value;
    const avatar = e.target.avatar.value;
    const domain = e.target.domain.value;
    const gender = e.target.gender.value;
    const available = e.target.available.value === "true" ? true : false;

    const body = {
      first_name,
      last_name,
      email,
      avatar,
      domain,
      gender,
      available,
    };

    updateSingleData({ id, body });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("User updated successfully!");
    }
    if (isError) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  }, [isSuccess, isError, error]);

  return (
    <div className="pb-20">
      <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto mt-5 border rounded-lg border-blue-500 p-5">
        <h3 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center mb-5">
          Update User
        </h3>
        <form
          onSubmit={(e) => handleUpdateUser(e)}
          className="grid grid-cols-1 sm:grid-cols-2 justify-between gap-6 mt-4"
        >
          <div className="relative">
            <label
              htmlFor="setTime"
              className="absolute text-sm left-6 -top-3 text-gray-400 bg-[#1d1836] rounded-lg px-2 text-primary transition-all duration-300"
            >
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              className="w-full bg-transparent shadow appearance-none border border-blue-500 rounded max-w-4xl py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
              defaultValue={getSingleUserData?.data?.first_name}
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="setTime"
              className="absolute text-sm left-6 -top-3 text-gray-400 bg-[#1d1836] rounded-lg px-2 text-primary transition-all duration-300"
            >
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              className="w-full bg-transparent shadow appearance-none border border-blue-500 rounded max-w-4xl py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
              defaultValue={getSingleUserData?.data?.last_name}
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="setTime"
              className="absolute text-sm left-6 -top-3 text-gray-400 bg-[#1d1836] rounded-lg px-2 text-primary transition-all duration-300"
            >
              Image URL
            </label>
            <input
              type="text"
              name="avatar"
              placeholder="Image URL"
              className="w-full bg-transparent shadow appearance-none border border-blue-500 rounded max-w-4xl py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
              defaultValue={getSingleUserData?.data?.avatar}
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="setTime"
              className="absolute text-sm left-6 -top-3 text-gray-400 bg-[#1d1836] rounded-lg px-2 text-primary transition-all duration-300"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="w-full bg-transparent shadow appearance-none border border-blue-500 rounded max-w-4xl py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
              defaultValue={getSingleUserData?.data?.email}
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="setTime"
              className="absolute text-sm left-6 -top-3 text-gray-400 bg-[#1d1836] rounded-lg px-2 text-primary transition-all duration-300"
            >
              Domain
            </label>
            <select
              name="domain"
              className="w-full select select-bordered border border-blue-500 rounded px-3 text-gray-400 font-normal select-xs sm:select-sm bg-[#080925] py-2"
            >
              <option value={getSingleUserData?.data?.domain}>
                {getSingleUserData?.data?.domain}
              </option>
              <option value="Business Development">Business Development</option>
              <option value="Sales">Sales</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="UI Designing">UI Designing</option>
              <option value="Management">Management</option>
              <option value="IT">IT</option>
            </select>
          </div>
          <div className="relative">
            <label
              htmlFor="setTime"
              className="absolute text-sm left-6 -top-3 text-gray-400 bg-[#1d1836] rounded-lg px-2 text-primary transition-all duration-300"
            >
              Gender
            </label>
            <select
              name="gender"
              className="w-full select select-bordered border border-blue-500 rounded px-3 text-gray-400 font-normal select-xs sm:select-sm bg-[#080925] py-2"
            >
              <option value={getSingleUserData?.data?.gender}>
                {getSingleUserData?.data?.gender}
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Bigender">Bigender</option>
              <option value="Agender">Agender</option>
              <option value="Polygender">Polygender</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Genderfluid">Genderfluid</option>
              <option value="Genderqueer">Genderqueer</option>
            </select>
          </div>
          <div className="relative text-gray-400">
            <select
              name="available"
              className="w-full select select-bordered border border-blue-500 rounded px-3 text-gray-400 font-normal select-xs sm:select-sm bg-[#080925] py-2"
            >
              {getSingleUserData?.data?.available === true ? (
                <>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </>
              ) : (
                <>
                  <option value="false">False</option>
                  <option value="true">True</option>
                </>
              )}
            </select>
            <label
              htmlFor="setTime"
              className="absolute text-sm left-6 -top-3  bg-[#1d1836] rounded-lg px-2 text-primary transition-all duration-300"
            >
              Availability
            </label>
          </div>
          <button
            type="submit"
            className="btn bg-green-700 hover:bg-green-500 py-2 px-3 text-white rounded-sm mx-auto w-full"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
