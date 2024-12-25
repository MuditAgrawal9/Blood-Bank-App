import React from "react";
import { BiDonateBlood } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  //logout button function
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout Successfull");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-brand mb-0">
            <BiDonateBlood color="red" />
            Blood Bank App
          </div>
          <ul className="navbar-nav  flex-row">
            <li className="nav-item mx-3">
              <p className="nav-link">
                <FaRegUserCircle />
                Welcome
                <span className="mx-1">
                  {user?.name || user?.hospital || user?.organization}
                </span>
                <span class="badge text-bg-secondary">{user?.role}</span>
              </p>
            </li>
            <li className="nav-item mx-3">
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
