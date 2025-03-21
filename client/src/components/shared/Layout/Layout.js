import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../../../styles/Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div className="layout-container">
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="content-container">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
