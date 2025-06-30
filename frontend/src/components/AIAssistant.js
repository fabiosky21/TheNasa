import React, { useState, useEffect } from "react";
import aii from "../assets/images/aii.png";
import astro from "../assets/images/astro.png";
import cama from "../assets/images/cama.png";
import loopi from "../assets/images/loopi.png";
import help from "../assets/images/help.gif";

function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const loadingImages = [aii, cama, loopi];
  const [loadingFrame, setLoadingFrame] = useState(0);
  const [messages, setMessages] = useState([]);
  const [showIntro, setShowIntro] = useState(true);

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

    try {
      const res = await fetch("http://localhost:5000/explain-tech", {
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
                <span dangerouslySetInnerHTML={{ __html: msg.text }} />
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
