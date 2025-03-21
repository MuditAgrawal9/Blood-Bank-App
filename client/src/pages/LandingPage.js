import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeartbeat, FaRegHospital, FaUserMd, FaHospitalAlt } from "react-icons/fa";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to BloodBank</h1>
        <p>Connecting Donors, Organizations and Hospitals efficiently.</p>
        <button className="primary-btn" onClick={() => navigate("/login")}>
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <FaHeartbeat size={40} className="icon" />
            <h3>Fast Blood Donations</h3>
            <p>Quickly find and request blood donations from verified donors.</p>
          </div>
          <div className="feature-card">
            <FaRegHospital size={40} className="icon" />
            <h3>Hospital Collaboration</h3>
            <p>Seamlessly connect hospitals and blood banks for smooth operations.</p>
          </div>
          <div className="feature-card">
            <FaUserMd size={40} className="icon" />
            <h3>Trusted & Secure</h3>
            <p>Ensuring donor authenticity and data security for safety.</p>
          </div>
        </div>
      </section>

      {/* Explore Hospitals & Organizations Section */}
      <section className="explore">
        <h2>Explore Hospitals & Organizations</h2>
        <p>Find the nearest hospitals and blood banks that are part of our network.</p>
        <div className="explore-grid">
          <div className="explore-card">
            <FaHospitalAlt size={50} className="icon" />
            <h3>Registered Hospitals</h3>
            <p>View the list of hospitals that collaborate with our platform.</p>
            <button className="secondary-btn" onClick={() => navigate("/availablehospitals")}>
              Explore Hospitals
            </button>
          </div>
          <div className="explore-card">
            <FaHospitalAlt size={50} className="icon" />
            <h3>Blood Organizations</h3>
            <p>Connect with organizations working for blood donation and safety.</p>
            <button className="secondary-btn" onClick={() => navigate("/availableorgs")}>
              Explore Organizations
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Join Our Community</h2>
        <p>Become a donor or request blood in just a few clicks.</p>
        <button className="primary-btn" onClick={() => navigate("/register")}>
          Register Now
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 BloodBank. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
