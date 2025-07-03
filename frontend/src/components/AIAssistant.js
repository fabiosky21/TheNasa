import React, { useState, useEffect } from "react";
import aii from "../assets/images/aii.png";
import astro from "../assets/images/astro.png";
import cama from "../assets/images/cama.png";
import loopi from "../assets/images/loopi.png";
import help from "../assets/images/help.gif";
import { useNavigate } from "react-router-dom";

function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const loadingImages = [aii, cama, loopi];
  const [loadingFrame, setLoadingFrame] = useState(0);
  const [messages, setMessages] = useState([]);
  const [showIntro, setShowIntro] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setLoadingFrame((prev) => (prev + 1) % loadingImages.length);
      }, 500);
    } else {
      setLoadingFrame(0);
    }
    return () => clearInterval(interval);
  }, [loading, loadingImages.length]);

  const handleAskAI = async () => {
    if (!userInput.trim()) return;
    const userMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setShowIntro(false);
    setLoading(true);

    const lower = userInput.toLowerCase();

    // === asking for directions ===
    if (
      lower.includes("image") ||
      lower.includes("video") ||
      lower.includes("media")
    ) {
      const aiMessage = {
        sender: "ai",
        text: `You can explore NASA's image and video archive in the <span class="ai-link" data-path="/media-search" style="color:#1976d2; text-decoration: underline; cursor:pointer;">Media Search</span> section.`,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
      return;
    }

    if (
      lower.includes("asteroid") ||
      lower.includes("neo") ||
      lower.includes("near earth") ||
      lower.includes("objects") ||
      lower.includes("charts") ||
      lower.includes("data")
    ) {
      const aiMessage = {
        sender: "ai",
        text: `You can view Near Earth Object data in the <span class="ai-link" data-path="/NEOWS" style="color:#1976d2; text-decoration: underline; cursor:pointer;">NEO Lookup</span> section.`,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
      return;
    }

    if (
      lower.includes("picture of the day") ||
      lower.includes("apod") ||
      lower.includes("technology")
    ) {
      const aiMessage = {
        sender: "ai",
        text: `You can find the NASA Picture of the Day on the <span class="ai-link" data-path="/" style="color:#1976d2; text-decoration: underline; cursor:pointer;">Home Page</span>.`,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
      return;
    }
    if (
      lower.includes("submit") ||
      lower.includes("where can i submit") ||
      lower.includes("i saw") ||
      lower.includes("i catch") ||
      lower.includes("report a sighting") ||
      lower.includes("upload")
    ) {
      const aiMessage = {
        sender: "ai",
        text: `You can share your discovery in the <span class="ai-link" data-path="/DataSpace" style="color:#1976d2; text-decoration: underline; cursor:pointer;">Submit Information</span> section.`,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
      return;
    }
    if (
      lower.includes("sightseeing") ||
      lower.includes("sightings") ||
      lower.includes("what have people seen") ||
      lower.includes("people from all over the world") ||
      lower.includes("unexplained objects") ||
      lower.includes("beautiful cosmic views") ||
      lower.includes("see submissions") ||
      lower.includes("discoveries from others")
    ) {
      const aiMessage = {
        sender: "ai",
        text: `You can explore space sightings and discoveries from people around the world in the <span class="ai-link" data-path="/SpaceSightseeing" style="color:#1976d2; text-decoration: underline; cursor:pointer;">Sightseeing</span> section.`,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
      return;
    }

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || "";
      const res = await fetch(`${backendUrl}/explain-tech`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userInput }),
      });
      const data = await res.json();
      const aiMessage = { sender: "ai", text: data.explanation };
      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      const errorMsg = { sender: "ai", text: "Oops! AI could not explain it." };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  // --- ADD: link click handler for in-app navigation ---
  const handleLinkClick = (e) => {
    if (
      e.target.classList &&
      e.target.classList.contains("ai-link") &&
      e.target.getAttribute("data-path")
    ) {
      const path = e.target.getAttribute("data-path");
      navigate(path);
    }
  };

  return (
    <>
      <div
        className={`ai-floating-icon ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <img
          src={loading ? loadingImages[loadingFrame] : astro}
          alt="astronaut"
          className="ai-floating-img"
        />
      </div>

      {open && (
        <div className="ai-popup">
          {showIntro && (
            <div className="ai-intro">
              <div className="ai-intro-text">
                <strong>Do you need help with something?</strong>
                <br />
                I'm here to help you with anything.
              </div>
              <img src={help} alt="intro" className="ai-intro-img" />
            </div>
          )}

          <div className="ai-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`ai-message ${msg.sender}`}
                style={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                {/* The click handler is attached here for all message links */}
                <span
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                  onClick={handleLinkClick}
                />
              </div>
            ))}
          </div>

          <div className="ai-input-container">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              rows={2}
              className="ai-input"
              placeholder="Ask me something..."
            />
            <button
              onClick={handleAskAI}
              disabled={loading}
              className="ai-send-button"
            >
              {loading ? "Thinking..." : "Ask"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AIAssistant;
