// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import fl from "../assets/images/nasal.png";

const Footer = () => {
  return (
    <footer style={styles.footerContainer}>
      <div style={styles.footerTop}>
        <img src={fl} alt="Logo" style={styles.footerLogo} />

        <div style={styles.FooternavLinks}>
          <Link to="/media-search" style={styles.link}>
            Media Search
          </Link>
          <Link to="/NEOWS" style={styles.link}>
            NEO Lookup
          </Link>
        </div>

        <div style={styles.socialIcons}>
          <a
            href="https://github.com/fabiosky21"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="GitHub"
              style={styles.socialIcon}
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
              style={styles.socialIcon}
            />
          </a>
        </div>
      </div>

      <div style={styles.copyright}>
        &copy; {new Date().getFullYear()} NASA Explorer | Made for coding challenge
      </div>
    </footer>
  );
};

const styles = {
  footerContainer: {
    marginTop: "auto",
    padding: "2rem 1rem 1rem",
    borderTop: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
    width: "100%",
    fontSize: "0.95rem",
    color: "#444",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowX: "hidden",
    boxSizing: "border-box",
  },
  footerTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    maxWidth: "100%",
    flexWrap: "wrap",
  },
  footerLogo: {
    width: "400px",
    height: "auto",
  },
  FooternavLinks: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "5rem",
    margin: "2rem 0",
  },
  link: {
    fontSize: "1.2rem",
    textDecoration: "none",
    color: "#1976d2",
    border: "1px solid #1976d2",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
  },
  socialIcons: {
    display: "flex",
    gap: "3rem",
  },
  socialIcon: {
    width: "70px",
    height: "70px",
  },
  copyright: {
    textAlign: "center",
    fontSize: "20px",
    color: "#888",
    marginTop: "1rem",
  },
};

export default Footer;
