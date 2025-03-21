import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../../styles/Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const menuItems = {
    organization: [
      { path: "/", icon: "fa-solid fa-warehouse", label: "Inventory" },
      { path: "/donar", icon: "fa-solid fa-hand-holding-medical", label: "Donor" },
      { path: "/hospital", icon: "fa-solid fa-hospital", label: "Hospital" },
      { path: "/analytics", icon: "fa-solid fa-chart-line", label: "Analytics" }
    ],
    hospital: [
      { path: "/organization", icon: "fa-solid fa-building-ngo", label: "Organization" },
      { path: "/consumer", icon: "fa-solid fa-user-injured", label: "Consumer" }
    ],
    donar: [
      { path: "/organization", icon: "fa-solid fa-building-ngo", label: "Organization" },
      { path: "/donation", icon: "fa-solid fa-hand-holding-droplet", label: "Donations" }
    ],
    admin: [
      { path: "/donar-list", icon: "fa-solid fa-hand-holding-medical", label: "Donor List" },
      { path: "/hospital-list", icon: "fa-solid fa-hospital", label: "Hospital List" },
      { path: "/org-list", icon: "fa-solid fa-building-ngo", label: "Organization List" }
    ]
  };

  return (
    <aside className="sidebar">
      <nav className="menu">
        {menuItems[user?.role]?.map((item) => (
          <Link key={item.path} to={item.path} className={`menu-item ${location.pathname === item.path ? "active" : ""}`}>
            <i className={item.icon}></i>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
