import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Header from "../components/Header";
import Footer from "../components/Footer";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const SpaceSightseeing = () => {
  const [sightings, setSightings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSightings = async () => {
      const { data, error } = await supabase
        .from("submissions")
        .select("*")
        .order("created_at", { ascending: false });
      console.log("Fetched data:", data);
      console.log("Fetch error:", error);
      if (!error) {
        setSightings(data);
      }
      setLoading(false);
    };

    fetchSightings();
  }, []);

  return (
    <>
    <Header />
      <div className="sightseeing-content">
       
        <p className="sightseeing-intro">
          In this section, you'll find space-related sightings submitted by
          people from all over the world. From unexplained objects to beautiful
          cosmic views, explore what others have seen in the sky — and feel free
          to contribute your own discoveries!
        </p>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="sightseeing-grid">
            {sightings.map((item) => (
              <div key={item.id} className="sightseeing-card" data-testid={`sightseeing-card-${item.name}`}>
                <div className="sightseeing-info">
                  <h3>{item.name}</h3>
                  <p>
                    <strong>Email:</strong> {item.email}
                  </p>
                  <p>
                    <strong>Description:</strong> {item.description}
                  </p>
                </div>
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="sightseeing-image"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SpaceSightseeing;
