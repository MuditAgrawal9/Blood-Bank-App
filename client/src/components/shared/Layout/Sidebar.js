import React from "react";
import { userMenu } from "./Menu/UserMenu";
import { Link, useLocation } from "react-router-dom";
import "../../../styles/Layout.css";

const Sidebar = () => {
  const location = useLocation();
  return (
    <div>
      <div className="sidebar">
        <div className="menu">
          {userMenu.map((menu) => {
            const isActive = location.pathname === menu.path;
            return (
              // <div className={`menu-item ${isActive && "active"}`}>
              <div
                key={menu.id} // Use a unique key
                className={`menu-item ${isActive ? "active" : ""}`}
              >
                <i className={menu.icons}></i>
                <Link to={menu.path}>{menu.name}</Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
