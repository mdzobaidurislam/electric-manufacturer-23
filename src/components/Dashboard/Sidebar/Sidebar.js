import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../Firebase/Firebase.init";
import useAdmin from "../../Hooks/useAdmin";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const { admin } = useAdmin(user);
  return (
    <>
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <ul className="menu p-4 overflow-y-auto w- bg-base-100 text-base-content">
        <li>
          <Link to="profile">Profile</Link>
        </li>

        {admin && admin ? (
          <>
            <li>
              <Link to="manage-order">Manage All Orders</Link>
            </li>
            <li>
              <Link to="manage-product">Manage Products</Link>
            </li>
            <li>
              <Link to="add-product">Add Product</Link>
            </li>
            <li>
              <Link to="manage-user">All User</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="blog">All Blog</Link>
            </li>
            <li>
              <Link to="orders">My Orders</Link>
            </li>
            <li>
              <Link to="add-review">Add review</Link>
            </li>
          </>
        )}
      </ul>
    </>
  );
};

export default Sidebar;
