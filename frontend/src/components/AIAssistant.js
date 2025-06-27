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

    const lower = userInput.toLowerCase();

    if (
      lower.includes("image") ||
      lower.includes("video") ||
      lower.includes("media")
    ) {
      const aiMessage = {
        sender: "ai",
        text: `You can explore NASA's image and video archive in the <a href="/Media-Search" style="color:#1976d2; text-decoration: underline;">Media Search</a> section.`,
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
        text: `You can view Near Earth Object data in the <a href="/NEOWS" style="color:#1976d2; text-decoration: underline;">NEO Lookup</a> section.`,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
      return;
    }

    if (lower.includes("picture of the day") || lower.includes("apod")) {
      const aiMessage = {
        sender: "ai",
        text: `You can find the NASA Picture of the Day on the <a href="/" style="color:#1976d2; text-decoration: underline;">Home Page</a>.`,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
      return;
    }

    // Fallback to AI explanation
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
      {/* Floating Icon */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "40px",
          right: "20px",
          width: "90px",
          height: "90px",
          borderRadius: "50%",
          backgroundColor: open ? "#4caf50" : "#1976d2",
          color: "white",
          fontSize: "32px",
          textAlign: "center",
          lineHeight: "60px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
          zIndex: 9999,
        }}
      >
        <img
          src={loading ? loadingImages[loadingFrame] : astro}
          alt="astronauta"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Assistant Popup */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "150px",
            left: "132rem",
            width: "360px",
            height: "600px",
            padding: "15px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            zIndex: 9999,
          }}
        >
          {/* Intro message (disappears after first user input) */}
          {showIntro && (
            <div>
              <div style={{ marginBottom: "10px", fontSize: "1.5rem" }}>
                <strong>Do you need help with something?</strong>
                <br />
                I'm here to help you with anything.
              </div>
              <img
                src={help}
                alt="intro"
                style={{
                  width: "200px",
                  marginBottom: "10px",
                  borderRadius: "10px",
                  margin: "0 auto",
                  display: "block",
                }}
              />
            </div>
          )}

          {/* Messages */}
          <div
            style={{
              flexGrow: 1,
              overflowY: "auto",
              paddingRight: "5px",
              marginBottom: "10px",
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    backgroundColor:
                      msg.sender === "user" ? "#dcf8c6" : "#e4e6eb",
                    padding: "10px 14px",
                    borderRadius: "20px",
                    maxWidth: "80%",
                    fontSize: "1.5rem",
                  }}
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                ></span>
              </div>
            ))}
          </div>

          {/* Input + Button */}
          <div>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              rows={2}
              style={{
                width: "100%",
                resize: "none",
                marginBottom: "6px",
                padding: "6px",
                fontSize: "1.5rem",
              }}
              placeholder="Ask me something..."
            />
            <button
              onClick={handleAskAI}
              disabled={loading}
              style={{
                width: "70%",
                padding: "8px",
                backgroundColor: "#1976d2",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "1.3rem",
                margin: "0 auto",
                display: "block",
              }}
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
