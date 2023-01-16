import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../Firebase/Firebase.init";
const Navbar = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/login");
    localStorage.removeItem("token");
  };
  const menuItem = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/protfolio">Protfolio</Link>
      </li>
      <li>
        <Link to="/reviews">Reviews</Link>
      </li>
      <li>
        <Link to="/blog">Blog</Link>
      </li>
      {user && user ? (
        <>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>{" "}
          <li>
            <button onClick={handleSignOut}>Logout</button>
          </li>
        </>
      ) : (
        <>
          {" "}
          <li>
            <Link to="/login">Login</Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <>
      <div className="navbar bg-base-100 shadow py-5  z-10">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex="0" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex="0"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 "
            >
              {menuItem}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            Electric-manufacturer
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0 text-[20px]">{menuItem}</ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
