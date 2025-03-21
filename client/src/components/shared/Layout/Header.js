import React from "react";
import { BiDonateBlood } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../../styles/Header.css";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  // const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout Successful");
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <BiDonateBlood className="logo-icon" />
        <span>Blood Bank</span>
      </div>

      <nav className="nav-links">
        <Link to="/" className="nav-item">
          Home
        </Link>
        <div className="user-info">
          <FaRegUserCircle className="user-icon" />
          <span className="user-name">
            {user?.name || user?.hospitalName || user?.organizationName}
          </span>
          <span className="role-badge">{user?.role}</span>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
