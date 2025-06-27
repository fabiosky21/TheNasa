// ✅ NEOWS.js
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
      const res = await fetch(
        `/near-earth-objects?start_date=${startDate}&end_date=${endDate}`
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
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", gap: "1rem", margin: "1.5rem 0" }}>
        <img src={earth} alt="Left Logo" style={{ height: "200px", objectFit: "contain" }} />
        <h1 style={{ margin: 0, fontSize: "2.5rem" }}>Near Earth Object Lookup</h1>
        <img src={aste} alt="Right Logo" style={{ height: "200px" }} />
      </div>

      <div style={{ flex: 1, padding: "2rem", textAlign: "center" }}>
        <p style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          Ready to see what is out in the space.
        </p>

        <button
          onClick={fetchNeoData}
          style={{ padding: "0.8rem 2rem", marginTop: "3rem", fontSize: "2rem", cursor: "pointer", backgroundColor: "#0077cc", color: "white", border: "none", borderRadius: "5px", marginBottom: "1rem" }}>
          Search NEOs
        </button>

        {!hasSearched && (
          <div style={{ marginBottom: "2rem" }}>
            <img src={circle} alt="Ready to search" style={{ width: "1000px", opacity: 0.8 }} />
          </div>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}

        {loading && (
          <div style={{ textAlign: "center", marginTop: "5rem" }}>
            <img src={ship} alt="Loading..." style={{ width: "500px", height: "500px" }} />
            <p>Searching NASA’s database...</p>
          </div>
        )}

        {!loading && neoResults.length > 0 && (
          <NEOWSCharts data={neoResults} />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default NEOWS;
