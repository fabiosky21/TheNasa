import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ship from "../assets/images/ship.gif";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const DataSpace = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    imageFile: null,
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [showShip, setShowShip] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, imageFile: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.description || !formData.imageFile) {
      setStatus("Please fill out all fields and attach an image.");
      return;
    }

    setLoading(true);
    setShowShip(true);
    setStatus("");

    let imageUrl = "";

    const { data, error: uploadError } = await supabase.storage
      .from("images")
      .upload(`public/${Date.now()}_${formData.imageFile.name}`, formData.imageFile);

    if (uploadError) {
      setStatus("Error uploading image");
      setLoading(false);
      setShowShip(false);
      return;
    }

    imageUrl = supabase.storage.from("images").getPublicUrl(data.path).data.publicUrl;

    const { error } = await supabase.from("submissions").insert([
      {
        name: formData.name,
        email: formData.email,
        description: formData.description,
        image_url: imageUrl,
      },
    ]);

    if (error) {
      setStatus("Error saving data");
      setLoading(false);
      setShowShip(false);
    } else {
      setStatus("Submission sent!");
      setFormData({ name: "", email: "", description: "", imageFile: null });
      setTimeout(() => {
        setShowShip(false);
        setStatus("");
      }, 2000);
      setLoading(false);
    }
  };

  return (
    <div className="dataspace-container">
      <Header />
      <div className="dataspace-form-wrapper">
        <p className="dataspace-intro">
          Here you can submit information about sightings or anything else happening around space.
        </p>
        <form onSubmit={handleSubmit} className="dataspace-form">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input type="file" name="image" accept="image/*" onChange={handleChange} required />
          <button type="submit" disabled={loading}>
            Submit
          </button>
        </form>
        {showShip && (
          <div className="dataspace-ship-popup">
            <img src={ship} alt="Submitting..." className="dataspace-ship" />
          </div>
        )}
        {status && <p className="dataspace-status">{status}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default DataSpace;

