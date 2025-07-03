# 🚀 NASA Explorer

A modern, full-stack web app to explore NASA’s image & video archives, Near-Earth Objects, and real user space sightings—with smart AI explanations and a live database.
Click here to see the website!!! https://thenasa-1.onrender.com

---

> **💡 Recommendation:**  
> For the best experience, we recommend using Firefox or Microsoft Edge to browse NASA Explorer.  
> [More information in Known Issues.](#known-issues)



## 🛰️ How to Use NASA Explorer

1. **Home Page (Picture of the Day & NASA Technology):**  
   - When you open the app, the Home page displays NASA’s “Picture of the Day” with its description.
   - Scroll down to the “NASA Tech Transfer” section to discover real-world technologies developed by NASA.

2. **Explore NASA Media (Images & Videos):**  
   - Visit the “Explore NASA” page to search for NASA images and videos by keyword (e.g., “Mars”, “Nebula”, “Apollo”).
   - Use quick filter buttons to search popular topics instantly.
   - **Filter by Media Type:** Toggle between images and videos.
   - **Limit Results:** Choose to display 10, 20, or all results to avoid overflow the screen and make browsing easier.

3. **View Near Earth Objects (Asteroids):**  
   - This section displays both hazardous and non-hazardous asteroids approaching Earth.
   - Interactive charts show asteroid diameter vs. velocity, and calculate the risk by finding which object comes closest to Earth.
   - Quickly identify which objects are potentially risky and compare their size, speed, and distance.
     
4. **Submit Your Own Sighting:**  
   - Go to the Submit information page to submit your own space observation or event.
   - Upload an image, add a description, and your entry will be stored live in the database.
     
5. **Sightseeing (Space Sightings Blog):**  
   - Check out the Sightseeing page to view space-related posts shared by other users.
   - Browse real sightings, stories, and images from people around the world.

6. **AI Assistant:**  
   - The built-in AI Assistant helps you navigate the website: just ask your question or mention keywords, and it can provide direct links or guide you to the page you need.
   - On the NASA Tech Transfer section, there’s an “Explain with AI” button next to each item. Click it to get a simple, easy-to-understand summary of any NASA technology.
   - The AI Assistant can also answer questions about NASA, images, tech, and general app usage.
---

## 🛠️ Tech Stack

- **Frontend:** React (responsive to size screens and mobile phone)
- **Backend:** Node.js & Express
- **Database:** Supabase (PostgreSQL, public bucket for images)
- **AI:** Cohere for text explanations & chat
- **Testing:** Jest, React Testing Library, Supertest
- **Deployment:** Render.com

---

## ✨ Features

- **AI Assistant:** Natural language Q&A about NASA, app content, and navigation
- **Loading State Management:** Smooth UX while data loads
- **Tested:** Unit/integration tests for frontend & backend using jest
- **Responsive Design:** Works great on mobile, tablet, and desktop
- **Smart Search & Filters:** Filter NASA images/videos by topic, media type, or result limit
- **User Submissions:** Users can submit sightings (with optional images)
- **Live Database:** Real-time storage and retrieval via Supabase
- **Easy Deployment:** Ready for Render.com (instructions below)

---

## 🚦 Getting Started

- **Clone the repo and install dependencies:**  
  `git clone https://github.com/yourusername/nasa-explorer.git`  
  `cd nasa-explorer`  
  `cd backend && npm install`  
  `cd ../frontend && npm install`

- **Create `.env` files in both `/backend` and `/frontend`:**
  - **Backend (`backend/.env`):**
    - `NASA_API_KEY=your_nasa_key`
    - `CO_API_KEY=your_cohere_key`
    - `REACT_APP_SUPABASE_URL=your_supabase_url`
    - `REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key`
  - **Frontend (`frontend/.env`):**
    - `REACT_APP_SUPABASE_URL=your_supabase_url`
    - `REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key`

---

## 🗄️ Supabase Setup

- **Create a new project at [supabase.com](https://supabase.com)** (free tier works)
- **Set up the `submissions` table:**
  - Columns:
    - `id` (uuid, primary key)
    - `created_at` (timestamp)
    - `name` (varchar)
    - `email` (varchar)
    - `image_url` (varchar, optional)
    - `description` (varchar)
- **Set policy on table:**  
  - Allow insert: `true`
  - Disable Row Level Security (RLS)
- **Create a storage bucket named `images`:**
  - Allow anonymous users to insert files

---

## ▶️ Running Locally

- **Start backend:**  
  `cd backend && node server.js`
- **Start frontend:**  
  `cd frontend && npm start`
- **Frontend connects to backend and Supabase using your `.env` settings**

---

## 🧪 Testing using Jest

- **Frontend tests:**  
  `npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest`  
  `npm install --save-dev @babel/preset-env @babel/preset-react babel-jest @babel/core`  
  `npm test`
- **Backend tests:**  
  `npm install --save-dev supertest`  
  _If test script fails, remove `"type": "module"` from package.json and add `test: jest` to scripts_  
  `npm test`
- **Note:**  
  If testing fails with `react-router-dom` v7+, downgrade to v6:  
  `npm install react-router-dom@6`

---

## 🚀 Deployment

- **Deploy backend and frontend as separate services on Render.com**
- **After deploy, you’ll have:**
  - `https://your-frontend.onrender.com`
  - `https://your-backend.onrender.com`
- **Frontend communicates with backend and Supabase using these URLs**

---

## 🛟 Troubleshooting & Tips

- **Check your `.env` files and Supabase settings if you see errors**
- **Enable anonymous insert policies on Supabase for public submissions**
- **AI features require valid NASA and Cohere API keys**

---
## 🐞 Known Issues

- **Google Chrome API Inconsistency:**  
  Occasionally, API requests to NASA Tech Transfer may fail or behave unexpectedly in Google Chrome. Clearing the cache can sometimes help, but it is not guaranteed to resolve the issue. This problem occurs on the home page, specifically in the second section labeled "NASA Tech Transfer". The rest pages and API's works fine.  
  In contrast, the same feature and rest of the project works perfectly and smoothly in Firefox and Microsoft Edge.    
  - **Status:** Intermittent; cause is under investigation.  
  - **Workaround:** If you experience loading issues in Chrome, it is **recomended** , use Firefox or Edge.

---

## 👨‍💻 Author & Credits

- **Made by Fabio Vargas for a coding challenge**
- **Powered by NASA Open APIs, Supabase, and Cohere**

---
