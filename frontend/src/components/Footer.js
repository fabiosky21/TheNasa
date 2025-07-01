// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import fl from "../assets/images/nasal.png";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <img src={fl} alt="Logo" className="footer-logo" />

        <div className="footer-nav-links">
          <Link to="/Home" className="footer-link">
            Home
          </Link>
          <Link to="/media-search" className="footer-link">
            Media Search
          </Link>
          <Link to="/NEOWS" className="footer-link">
            NEO Lookup
          </Link>
         
          
        </div>

        <div className="footer-social-icons">
          <a
            href="https://github.com/fabiosky21"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="GitHub"
              className="footer-social-icon"
            />
          </a>
          <a
            href="https://linkedin.com/in/fabiorodrigocv"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              alt="LinkedIn"
              className="footer-social-icon"
            />
          </a>
        </div>
      </div>

      <div className="footer-copyright">
        &copy; {new Date().getFullYear()} NASA Explorer | Made for coding challenge
      </div>
    </footer>
  );
};

export default Footer;
