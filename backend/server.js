const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");
const { CohereClient } = require("cohere-ai");

dotenv.config();

const cohere = new CohereClient({ apiKey: process.env.CO_API_KEY });

const app = express();
const allowedOrigins = [
  "http://localhost:3000",                
  "https://thenasa-1.onrender.com",       
];


app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
const PORT = process.env.PORT || 5000;

const fetchWithRetry = async (url, params, retries = 3) => {
  while (retries > 0) {
    try {
      const response = await axios.get(url, { params });
      return response.data;
    } catch (err) {
      retries--;
      if (retries === 0) throw err;
      await new Promise((res) => setTimeout(res, 1000));
    }
  }
};
// NASA IMAGE AND VIDEO SEARCH FUNCTIONALITY
app.get("/search-images", async (req, res) => {
  const { q } = req.query;
  try {
    const response = await axios.get(`https://images-api.nasa.gov/search`, {
      params: { q },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to search NASA media" });
  }
});



//Near Earth Object Web Service
app.get("/near-earth-objects", async (req, res) => {
  const { start_date, end_date } = req.query;

  try {
    const nasaRes = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed`, {
      params: {
        start_date,
        end_date,
        api_key:
          process.env.NASA_API_KEY ||
          "tZmwVdjWGefb9jXITvmNJMO6Gnx8VZh9xAIICfa0",
      },
    });
    res.json(nasaRes.data);
  } catch (error) {
    console.error("Error fetching NEO data:", error.message);
    res.status(500).json({ error: "Failed to fetch Near Earth Objects" });
  }
});

// NASA tech
app.get("/nasa/tech", async (req, res) => {
  try {
    const techRes = await axios.get(
      `https://api.nasa.gov/techtransfer/patent/`,
      {
        params: {
          engine: 1,
          api_key:
            process.env.NASA_API_KEY ||
            "tZmwVdjWGefb9jXITvmNJMO6Gnx8VZh9xAIICfa0",
        },
      }
    );
    res.json(techRes.data);
  } catch (err) {
    console.error("Tech API error", err.message);
    res.status(500).json({ error: "NASA Tech API failed" });
  }
});

// AI Assistant using Cohere

app.post("/explain-tech", async (req, res) => {
  const { text } = req.body;

  try {
    const response = await cohere.generate({
      model: "command",
      prompt: `Explain this for a general audience: ${text}`,
      max_tokens: 150,
      temperature: 0.7,
    });

    const explanation = response.generations[0].text.trim();
    res.json({ explanation });
  } catch (err) {
    console.error("Cohere error:", err.message);
    res.status(500).json({ error: "AI explanation failed." });
  }
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
