import React from "react";
import Main from "../Main/Main";
import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
  return (
    <>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Main />
        </div>
        <div className="drawer-side bg-orange">
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default Layout;
