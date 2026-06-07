import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../index.css";
function Navbar({ searchTerm, setSearchTerm }) {
  const { user, logoutUser } = useContext(AuthContext);
  
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        LocalMart
      </Link>
      <input 
            type="text" 
            className="searchbar" 
            placeholder="Search"
            onChange={(e)=> setSearchTerm(e.target.value)}
            value={searchTerm}
            />
            
        <img src="src/assets/cart.png" alt="" className="w-10 ml-170"/>

      <div className="space-x-4">
        {user ? (
          <>
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-600"
            >
              Dashboard
            </Link>

            <button
              onClick={logoutUser}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;