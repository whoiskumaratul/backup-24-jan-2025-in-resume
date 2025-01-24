
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../accounts/AuthContext";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  
  return (
    <div className="bg-gray-700 text-white shadow-md shadow-slate-600 ">
    {/* fixed top-0 left-0 w-full z-50 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  ">
        <div className="flex items-center justify-between ">
          {/* Left-aligned brand */}
          <div>
            <li
              className="text-white list-none cursor-pointer py-2 rounded-md text-sm font-bold hover:text-[#FF6A00]"
              onClick={() => navigate("/")}
            >
              Quleep
            </li>
          </div>

          {/* Right-aligned buttons */}
          <div className="flex ">
            {isAuthenticated ? (
              <>
                <span  className="text-white list-none cursor-pointer py-2 px-4 rounded-md text-sm font-bold hover:text-[#FF6A00]">Welcome, {user?.name || "User"}</span>
                <button
                   className="text-white list-none cursor-pointer py-2 px-4 rounded-md text-sm font-bold hover:text-[#FF6A00]"
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
                <div>
                  <button  className="text-white list-none cursor-pointer py-2 px-4 rounded-md text-sm font-bold hover:text-[#FF6A00]"
                  onClick={() => navigate("/profile")}
                 >Profile</button>
                </div>
              </>
            ) : (
              <>
                <li
                  className="text-white list-none cursor-pointer py-2 px-4 rounded-md text-sm font-bold hover:text-[#FF6A00]"
                  onClick={() => navigate("/login")}
                >
                  Login
                </li>
                <li
                  className="text-white list-none cursor-pointer py-2 px-4 rounded-md text-sm font-bold hover:text-[#FF6A00]"
                  onClick={() => navigate("/")}
                >
                  Signup
                </li>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
