import React from "react";
import nasaHeader from "../assets/images/nasaw.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <style>
        {`
          .pill-button {
            font-size: 1.5rem;
            text-decoration: none;
            color: #1976d2;
            border: 2px solid #1976d2;
            padding: 0.6rem 1.4rem;
            border-radius: 999px;
            background-color: transparent;
            transition: all 0.2s ease-in-out;
            display: inline-block;
          }

          .pill-button:hover {
            background-color: #1976d2;
            color: white;
          }
        `}
      </style>
      <header style={styles.header}>
        <img src={nasaHeader} alt="NASA Logo" style={{ width: "100%", maxWidth: "500px", margin: "0 auto", display: "block", paddingTop: "40px" }} />
        <h1 style={styles.title}>Welcome to NASA Explorer</h1>
        <p style={styles.subtitle}>Explore NASA media, Mars rovers, and near-Earth objects.</p>
      </header>
       <nav style={styles.navLinks}>
            <Link to="/" className="pill-button">
              Home
            </Link>
            <Link to="/media-search" className="pill-button">
              Media Search
            </Link>
            <Link to="/NEOWS" className="pill-button">
              NEO Lookup
            </Link>
          </nav>
    </>
  );
};

const styles = {
  header: {
    marginBottom: "2rem",
    textAlign: "center",
  },
  navLinks: {
    display: "flex",
    gap: "2rem",
    flexWrap: "wrap",
    justifyContent: "center",
    margin: "2rem 0",
  },
  pillButton: {
    fontSize: "1rem",
    textDecoration: "none",
    color: "#1976d2",
    border: "2px solid #1976d2",
    padding: "0.6rem 1.4rem",
    borderRadius: "999px",
    transition: "all 0.2s ease-in-out",
    backgroundColor: "transparent",
  },
  title: {
    fontSize: "2.5rem", 
    margin: "1rem 0",
  },
  subtitle: {
    fontSize: "1.3rem", 
    color: "#444",
    marginBottom: "2rem",
  },
};

export default Header;
