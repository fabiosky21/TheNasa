import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MediaSearch from "./pages/MediaSearch";
import NEOWS from "./pages/NEOWS";
import AIAssistant from "./components/AIAssistant";
import DataSpace from "./pages/DataSpace";
import SpaceSightseeing from "./pages/SpaceSightseeing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/media-search" element={<MediaSearch />} />
        <Route path="/neows" element={<NEOWS />} />
        <Route path="/DataSpace" element={<DataSpace />} />
        <Route path="/SpaceSightseeing" element={<SpaceSightseeing />} />
      </Routes>
      <AIAssistant />
    </Router>
  );
}

export default App;
