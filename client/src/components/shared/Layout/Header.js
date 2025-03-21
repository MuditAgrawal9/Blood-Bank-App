import React from "react";
import { BiDonateBlood } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../../../styles/Header.css";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

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
        <div className="user-info">
          <FaRegUserCircle className="user-icon" />
          <span className="user-name">
            {user?.name || user?.hospital || user?.organization}
          </span>
          <span className="role-badge">{user?.role}</span>
        </div>

        {["/", "/donar", "/hospital"].includes(location.pathname) ? (
          <Link to="/analytics" className="nav-item">Analytics</Link>
        ) : (
          <Link to="/" className="nav-item">Home</Link>
        )}

        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
};

export default Header;
