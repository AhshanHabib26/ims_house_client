import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase_init";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth);
    navigate("/");
  };

  return (
    <div>
      <div class="navbar bg-primary text-white">
        <div class="navbar-start">
          <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabindex="0"
              class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-primary text-white rounded-box w-52"
            >
              {user && (
                <>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/manage-product">Manage Product</Link>
                  </li>
                  <li>
                    <Link to="add-product">Add Product</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <Link to="/" class="btn btn-ghost normal-case text-xl">
            IMS
          </Link>
        </div>
        <div class="navbar-center hidden lg:flex">
          <ul class="menu menu-horizontal p-0">
            {user && (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/manage-product">Manage Product</Link>
                </li>
                <li>
                  <Link to="add-product">Add Product</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div class="navbar-end">
          {user ? (
            <>
              <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn">
                  {user.displayName ? user.displayName : "User"}
                </label>
                <ul
                  tabindex="0"
                  class="dropdown-content menu p-2 shadow bg-primary text-white rounded-box w-52"
                >
                  <li>
                    <Link
                      className=" text-lg my-3 font-semibold "
                      to="/profile"
                    >
                      View Profile
                    </Link>
                  </li>
                  <button className="btn" onClick={logout}>
                    Log out
                  </button>
                </ul>
              </div>
            </>
          ) : (
            <div class="dropdown dropdown-end">
              <label tabindex="0" class="btn">
                Register
              </label>
              <ul
                tabindex="0"
                class="dropdown-content menu p-2 shadow bg-primary text-white rounded-box w-52"
              >
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
