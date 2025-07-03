import React, { useState } from "react";
import NEOWSCharts from "../components/NEOWSCharts";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ship from "../assets/images/ship.gif";
import aste from "../assets/images/aste.png";
import earth from "../assets/images/earth.png";
import circle from "../assets/images/circle.gif";

const NEOWS = () => {
  const [neoResults, setNeoResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const getFormattedDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const fetchNeoData = async () => {
    setHasSearched(true);
    setLoading(true);
    const today = new Date();
    const weekAhead = new Date();
    weekAhead.setDate(today.getDate() + 7);

    const startDate = getFormattedDate(today);
    const endDate = getFormattedDate(weekAhead);
    const cacheKey = `neo_${startDate}_${endDate}`;

    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setNeoResults(JSON.parse(cached));
      setLoading(false);
      return;
    }

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || "";
const res = await fetch(
  `${backendUrl}/near-earth-objects?start_date=${startDate}&end_date=${endDate}`
);


      const data = await res.json();

      if (!data.near_earth_objects) {
        setError("Invalid response from NASA API.");
        return;
      }

      const flatObjects = Object.values(data.near_earth_objects).flat();
      setNeoResults(flatObjects);
      setError("");
    } catch (err) {
      setError("Failed to fetch NEO data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="neows-page-wrapper">
      <Header />
      <div className="neows-header-section">
        <img src={earth} alt="Left Logo" className="neows-header-logo" />
        <h1 className="neows-header-title">Near Earth Object Lookup</h1>
        <img src={aste} alt="Right Logo" className="neows-header-logo" />
      </div>

      <div className="neows-content">
        <p className="neows-intro">Ready to see what is out in the space.</p>

        <button onClick={fetchNeoData} className="neows-search-button">Search NEOs</button>

        {!hasSearched && (
          <div className="neows-placeholder-section">
            <img src={circle} alt="Ready to search" className="neows-placeholder-image" />
          </div>
        )}

        {error && <p className="neows-error">{error}</p>}

        {loading && (
          <div className="neows-loader">
            <img src={ship} alt="Loading..." className="neows-loader-img" />
            <p>Searching NASA’s database...</p>
          </div>
        )}

        {!loading && neoResults.length > 0 && <NEOWSCharts data={neoResults} />}
      </div>

      <Footer />
    </div>
  );
};


export default NEOWS;
