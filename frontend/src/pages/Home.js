import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  const [apod, setApod] = useState(null);
  const [techItems, setTechItems] = useState([]);
  const api_key = "tZmwVdjWGefb9jXITvmNJMO6Gnx8VZh9xAIICfa0";
  const [loadingIdx, setLoadingIdx] = useState(null);
  const [explanations, setExplanations] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleExplain = async (idx, originalText) => {
    setLoadingIdx(idx);
    try {
      const res = await fetch("http://localhost:5000/explain-tech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: originalText }),
      });
      const data = await res.json();
      setExplanations((prev) => ({ ...prev, [idx]: data.explanation }));
    } catch (error) {
      console.error("AI explain error:", error.message);
      setExplanations((prev) => ({ ...prev, [idx]: "AI failed to explain." }));
    } finally {
      setLoadingIdx(null);
    }
  };

  // fetch retry logic
  const fetchWithRetry = async (url, setState, label) => {
    let retries = 3;
    while (retries > 0) {
      try {
        const res = await fetch(url, {
          headers: {
            Accept: "application/json",
          },
        });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data = await res.json();
        if (label === "apod") {
          setState(data);
        } else if (label === "tech") {
          const items = data.results || [];
          setState(items || []);
        }
        return;
      } catch (error) {
        console.error(`Error fetching ${label}:`, error.message);
        retries--;
        if (retries === 0) {
          console.error(`${label} failed after multiple attempts.`);
        } else {
          await new Promise((res) => setTimeout(res, 1000));
        }
      }
    }
  };

  useEffect(() => {
    const apodURL = `https://api.nasa.gov/planetary/apod?api_key=${api_key}`;
    const techURL = `https://api.nasa.gov/techtransfer/patent/?engine=1&api_key=${api_key}&t${Date.now()}`;

    fetchWithRetry(apodURL, setApod, "apod");
    fetchWithRetry(techURL, setTechItems, "tech");
  }, []);

  const filteredTechItems = techItems.filter((item) => {
    const description = item[3] ? item[3].toLowerCase() : "";
    if (selectedCategory === "All") return true;
    if (selectedCategory === "Environment")
      return (
        description.includes("climate") ||
        description.includes("water") ||
        description.includes("green")
      );
    if (selectedCategory === "Robotics")
      return (
        description.includes("robot") ||
        description.includes("autonomous") ||
        description.includes("drone")
      );
    if (selectedCategory === "Sensors")
      return (
        description.includes("sensor") ||
        description.includes("detection") ||
        description.includes("monitor")
      );
    return true;
  });
  const displayTechItems =
    selectedCategory === "All"
      ? filteredTechItems.slice(0, 5)
      : filteredTechItems;

  return (
   

      <div className="home-wrapper">
      <Header />
        <div className="home-container">

          <section className="home-news-section">
            <h2> NASA Picture of the Day</h2>
            {apod ? (
              <div>
                <img
                  src={apod.url}
                  alt={apod.title}
                  style={{ maxWidth: "100%", borderRadius: "10px" }}
                />
                <h3>{apod.title}</h3>
                <p>{apod.explanation}</p>
              </div>
            ) : (
              <p>Loading Picture of the Day</p>
            )}
          </section>

          <section className="home-news-section">
            <h2> NASA Tech Transfer</h2>
            <label style={{ fontWeight: "bold", marginRight: "10px" }}>
              Filter by Category:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ marginBottom: "20px", padding: "5px", fontSize: "1.2rem" }}
            >
              <option value="All">All</option>
              <option value="Environment">Environment</option>
              <option value="Robotics">Robotics</option>
              <option value="Sensors">Sensors</option>
            </select>

            {displayTechItems.length > 0 ? (
              displayTechItems.map((item, idx) => (
                <div key={idx} className="home-tech-item">
                  <h3>{item[1]}</h3>
                  <p>{item[3]}</p>
                  {item[10] && (
                    <img
                      src={item[10]}
                      alt="Tech visual"
                      style={{ maxWidth: "100%", borderRadius: "6px" }}
                    />
                  )}

                  <button
                    onClick={() => handleExplain(idx, item[3])}
                    disabled={loadingIdx === idx}
                  >
                    {loadingIdx === idx ? "Explaining..." : "Explain with AI"}
                  </button>
                  {explanations[idx] && (
                    <p style={{ fontStyle: "italic", color: "#444" }}>
                      AI says: {explanations[idx]}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p>Loading Tech Innovations...</p>
            )}
          </section>
        </div>
        <Footer />
      </div>
    
  );
}



export default Home;
