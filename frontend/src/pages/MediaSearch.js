import React, { useState, useEffect } from "react";
import ship from "../assets/images/ship.gif";
import log from "../assets/images/log.jpeg";
import searchim from "../assets/images/searchim.jpg";
import Footer from "../components/Footer";
import Header from "../components/Header";
import cama from "../assets/images/cama.png";

const quickFilters = ["Mars", "Moon", "Earth", "Galaxy", "Nebula", "Apollo"];

function MediaSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalMedia, setModalMedia] = useState(null);
  const [activeFilter, setActiveFilter] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [mediaType, setMediaType] = useState("image"); // "image" or "video"
  const [resultLimit, setResultLimit] = useState(10); // 5, 10, 20 or "all"

  // Search function
  const searchMedia = async (term = "") => {
    const searchTerm = term || query;
    if (!searchTerm.trim()) return;

    setQuery(searchTerm);
    setHasSearched(true);
    setLoading(true);

    try {
      const res = await fetch(
        `/search-images?q=${encodeURIComponent(searchTerm)}`
      );
      const data = await res.json();

      let items = data.collection.items || [];

      // Filter by media type
      items = items.filter((item) => item.data?.[0]?.media_type === mediaType);

      // Limit results
      if (resultLimit !== "all") {
        items = items.slice(0, resultLimit);
      }

      setResults(items);
    } catch (err) {
      console.error("Error searching:", err);
    } finally {
      setLoading(false);
    }
  };
  // Re-filter the results instantly when mediaType or resultLimit change
useEffect(() => {
  if (!hasSearched) return;

  const filterAndLimitResults = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/search-images?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();

      let items = data.collection.items || [];

      // Filter by media type
      items = items.filter(item => item.data?.[0]?.media_type === mediaType);

      // Limit results
      if (resultLimit !== "all") {
        items = items.slice(0, resultLimit);
      }

      setResults(items);
    } catch (err) {
      console.error("Error updating filters:", err);
    } finally {
      setLoading(false);
    }
  };

  filterAndLimitResults();
}, [mediaType, resultLimit, query, hasSearched]);


  const getVideoUrl = async (nasaId) => {
    const res = await fetch(`https://images-api.nasa.gov/asset/${nasaId}`);
    const data = await res.json();
    const video = data.collection.items.find((item) =>
      item.href.endsWith(".mp4")
    );
    return video?.href;
  };

  // Effect to handle Escape key for closing modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setModalMedia(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="media-wrapper">
      <Header />
      <div className="media-header">
        <img src={cama} alt="NASA Logo left" className="media-logo" />
        <h1 className="media-title">NASA Image and Video Search</h1>
        <img src={log} alt="NASA Logo" className="media-logo" />
      </div>

      {/* Search input */}
      <div className="media-search-bar">
        <input
          type="text"
          placeholder="Search for moon, mars, nebula, etc..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchMedia()}
          className="media-search-input"
        />
        <button onClick={() => searchMedia()} className="media-search-button">
          Search
        </button>
      </div>
      {/* Result limit by image or video selector */}
      <div className="media-type-filters">
        {["image", "video"].map((type) => (
          <button
            key={type}
            onClick={() => setMediaType(type)}
            className={`media-filter-button ${
              mediaType === type ? "active" : ""
            }`}
          >
            {type === "image" ? "Images" : "Videos"}
          </button>
        ))}
      </div>

      {/* Quick filter pills */}
      <div className="media-quick-filters">
        {quickFilters.map((term, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveFilter(term);
              searchMedia(term);
            }}
            className={`media-quick-filtersbutton ${
              activeFilter === term ? "active" : ""
            }`}
          >
            {term}
          </button>
        ))}
      </div>
      {/* Result limit of numbers selector */}
      <div className="media-limit-filters">
        {[5, 10, 20, "all"].map((limit) => (
          <button
            key={limit}
            onClick={() => setResultLimit(limit)}
            className={`media-limit-button ${
              resultLimit === limit ? "active" : ""
            }`}
          >
            {limit === "all" ? "All" : limit}
          </button>
        ))}
      </div>

      {/* Static image before search */}
      {!hasSearched && !loading && (
        <div className="media-placeholder">
          <img src={searchim} alt="Welcome" className="media-placeholder-img" />
          <p className="media-placeholder-text">
            Start exploring NASA’s archives!
          </p>
        </div>
      )}

      {/* Loader */}
      {loading && (
        <div className="media-loader">
          <img src={ship} alt="Loading..." className="media-loader-img" />
          <p>Searching NASA’s archive...</p>
        </div>
      )}

      {/* Results */}
      <div className="media-results-grid">
        {!loading &&
          results.map((item, index) => {
            const data = item.data[0];
            const mediaType = data.media_type;
            const nasaId = data.nasa_id;
            const thumbnail = item.links?.[0]?.href;

            return (
              <div key={index} className="media-result-item">
                <h3>{data.title}</h3>
                <p>{data.description?.substring(0, 100)}...</p>

                {mediaType === "image" && thumbnail && (
                  <img
                    src={thumbnail}
                    alt={data.title}
                    className="media-thumbnail"
                    onClick={() =>
                      setModalMedia({ type: "image", url: thumbnail })
                    }
                  />
                )}

                {mediaType === "video" && (
                  <>
                    {!item.videoUrl ? (
                      <div
                        onClick={async () => {
                          const videoUrl = await getVideoUrl(nasaId);
                          if (videoUrl) {
                            setModalMedia({ type: "video", url: videoUrl });
                          }
                        }}
                        className="media-video-wrapper"
                      >
                        <img
                          src={thumbnail}
                          alt="video thumbnail"
                          className="media-thumbnail"
                        />
                        <p className="media-video-text">Click to Play</p>
                      </div>
                    ) : (
                      <video
                        src={item.videoUrl}
                        controls
                        className="media-video-player"
                      />
                    )}
                  </>
                )}
              </div>
            );
          })}
      </div>

      {modalMedia && (
        <div
          onClick={() => setModalMedia(null)}
          className="media-modal-overlay"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="media-modal-content"
          >
            <button
              onClick={() => setModalMedia(null)}
              className="media-modal-close"
            >
              X
            </button>

            {modalMedia.type === "image" ? (
              <img
                src={modalMedia.url}
                alt="Full"
                className="media-modal-image"
              />
            ) : (
              <video
                src={modalMedia.url}
                controls
                autoPlay
                className="media-modal-video"
              />
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default MediaSearch;
