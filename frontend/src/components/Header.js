import React from "react";
import nasaHeader from "../assets/images/nasaw.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="header">
        <img src={nasaHeader} alt="NASA Logo" className="header-logo" />
        <h1 className="header-title">Welcome to NASA Explorer</h1>
        <p className="header-subtitle">Explore NASA media, Mars rovers, and near-Earth objects.</p>
      </header>
      <nav className="nav-links">
        <Link to="/" className="pill-button">Home</Link>
        <Link to="/media-search" className="pill-button">Media Search</Link>
        <Link to="/NEOWS" className="pill-button">NEO Lookup</Link>
        <Link to="/DataSpace" className="pill-button">Submit Information</Link>
        <Link to="/SpaceSightseeing" className="pill-button">Sightseeing</Link>
      </nav>
    </>
  );
};

export default Header;
