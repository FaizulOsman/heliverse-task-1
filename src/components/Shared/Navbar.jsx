import React, { useState } from "react";
import TeamLogo from "../../assets/team-logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav class="bg-[#1d1836]">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative py-3">
          <div class="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              type="button"
              class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span class="absolute -inset-0.5"></span>
              <span class="sr-only">Open main menu</span>

              <svg
                class="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                class="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex flex-shrink-0 items-center">
              <Link to="/">
                <img class="h-8 w-auto" src={TeamLogo} alt="Your Company" />
              </Link>
            </div>
            {
              <div class="hidden sm:ml-6 sm:block">
                <div class="flex space-x-4">
                  <Link
                    to="/"
                    class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                    aria-current="page"
                  >
                    Home
                  </Link>
                  <Link
                    to="/users/create-new-user"
                    class="bg-green-700 hover:bg-green-500 text-white rounded-md px-3 py-2 text-sm"
                  >
                    <span className="font-bold">+</span> Create New User
                  </Link>
                </div>
              </div>
            }
          </div>
        </div>
      </div>

      {showDropdown && (
        <div class="sm:hidden" id="mobile-menu">
          <div class="space-y-1 px-2 pb-3 pt-2">
            <Link
              to="/"
              class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
              aria-current="page"
            >
              Home
            </Link>
            <Link
              to="#"
              class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Team
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
