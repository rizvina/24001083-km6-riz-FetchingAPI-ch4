import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiSolidMoviePlay } from "react-icons/bi";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Import useNavigate
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTopRatedClick = () => {
    // Navigasi ke halaman "TOP RATED" saat diklik
    navigate("/top_rated");
    // Tutup dropdown setelah navigasi
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex items-start justify-start fixed top-0 left-0 right-0 z-40 bg-gray-800">
      <div className="flex justify-between px-6 py-3 items-center lg:px-10 w-full">
        <Link
          to="/"
          className="flex items-center text-yellow-400 font-bold lg:text-6xl text-lg"
        >
          <BiSolidMoviePlay className="mr-2" />
          <span>IMovie</span>
        </Link>
        <div className="hidden lg:flex justify-between items-center ml-2 w-1/3">
          <div className="flex w-full justify-start ml-5">
            <Link
              className="text-white text-md hover:text-yellow-400 mt-4 mr-4"
              to={`/`}
            >
              HOME
            </Link>
            <Link
              className="text-white text-md hover:text-yellow-400 mt-4 mr-4"
              to={`/all-now-playing`}
            >
              NOW PLAYING
            </Link>
            <Link
              className="text-white text-md hover:text-yellow-400 mt-4 mr-4"
              to={`/all-popular-movies`}
            >
              POPULAR
            </Link>
            <div className="relative">
              <button
                className="text-white text-md hover:text-yellow-400 mt-4 mr-4 focus:outline-none"
                onClick={toggleDropdown}
              >
                MORE
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 bg-gray-800 text-white py-2 mt-2 rounded-md shadow-lg">
                  <Link
                    to="/all-top-rated"
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    TOP RATED
                  </Link>
                  <Link
                    to={`/all-trending-movies`}
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    TRENDING
                  </Link>
                  <Link
                    to={`/all-upcoming-movies`}
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    UPCOMING
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
