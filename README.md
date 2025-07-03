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
    - `REACT_APP_BACKEND_URL=your_deployed_backend_url`  <!-- 🚨 IMPORTANT -->

> **Note:**  
> After you have finished setting up and deploying your backend, replace `your_deployed_backend_url` with the actual URL where your backend API is live (e.g., `https://your-backend.onrender.com`).  
> This ensures your frontend communicates with the correct backend in production.

---

## 🗄️ Supabase Setup

1. **Create a new project at [supabase.com](https://supabase.com)** (free tier works).
2. **Get your Supabase Project URL and anon key:**
    - Go to your project’s dashboard.
    - Click on **Settings** in the left sidebar, then **API**.
    - You’ll see:
      - **Project URL** (e.g., `https://xyzcompany.supabase.co`)
      - **anon public API key** (`anon key`)
    - Copy both values.

3. **Set up the `submissions` table:**
    - In the Table Editor, create a table named `submissions` with columns:
        - `id` (uuid, primary key)
        - `created_at` (timestamp)
        - `name` (varchar)
        - `email` (varchar)
        - `image_url` (varchar, optional)
        - `description` (varchar)

4. **Set policy on table:**
    - Allow insert: `true`
    - Disable Row Level Security (RLS) for public write access (for testing/demo projects).

5. **Create a storage bucket named `images`:**
    - Go to **Storage** → **Create a new bucket** → name it `images`.
    - Set permissions to allow anonymous users to insert files (for demo/testing).

6. **Add your credentials to your environment files:**
    - In `/frontend/.env` and `/backend/.env`:
      ```env
      REACT_APP_SUPABASE_URL=your_supabase_project_url
      REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
      ```

---

## 🌌 NASA API Key Setup

To use NASA’s open APIs, you need a (free) NASA API key.

1. **Go to [https://api.nasa.gov/](https://api.nasa.gov/)**
2. **Fill out the simple form** under “Generate API Key” with your name and email.
3. **Check your email** for your API key (it usually arrives instantly).
4. **Add your NASA API key to your environment files:**
   - In `/backend/.env`:
     ```
     NASA_API_KEY=your_nasa_api_key_here
     ```
---

## 🧠 Cohere AI Setup

To enable AI-powered explanations, you need a Cohere API key.

1. Visit [cohere.com](https://dashboard.cohere.com/) and sign up or log in.
2. Go to the **API Keys** section in your dashboard.
3. Copy your default API key.
4. Add the key to your `/backend/.env` file like this:

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

Deploy both backend and frontend as separate services using your chosen deployment platform (for this I use Render).  
Below is a general guide using GitHub integration:

### 1. **Create an Account and Connect Your GitHub**
- Sign up using GitHub, or connect your GitHub account.
- Import your project repository.

### 2. **Deploy the Backend (Node/Express API)**
- Navigate to your imported project in the dashboard (e.g., “thenasa”).
- **Create a new Web Service** for your backend:
    - **Region:** Choose your preferred region (e.g., `Frankfurt`)
    - **Branch:** `main` (or your default branch)
    - **Root directory:** `backend`
    - **Build command:** `npm install`
    - **Start command:** `node server.js`
- Scroll down and click **Deploy**.
- Wait for the deployment to finish (you’ll see a green “Deployed” status).
- **Copy the generated backend link** (e.g., `https://thenasa-backend.onrender.com`).

### 3. **Update Frontend Environment Variable**
- In `/frontend/.env`, set:
    ```
    REACT_APP_BACKEND_URL=your-backend-link-here
    ```
- This ensures the frontend communicates with the deployed backend.

### 4. **Deploy the Frontend (React App)**
- In your dashboard, create a **Static Site** for the frontend:
    - **Root directory:** `frontend`
    - **Build command:** `npm install && npm run build`
    - **Publish directory:** `build`
- Click **Deploy**.
- Wait until the deployment is complete (look for a green “Deployed” badge).
- **Copy the frontend URL** (e.g., `https://thenasa-frontend.onrender.com`).

### **IMPORTANT:**
> The `REACT_APP_BACKEND_URL` variable in your frontend `.env` file **must be set to your deployed backend link**.  
> This is essential for your frontend and backend to communicate.

---

**After deployment, you will have:**
- **Frontend:** `https://your-frontend-url`
- **Backend:** `https://your-backend-url`
- The frontend will use the backend URL for all API requests.

---


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

> **Note on API Keys:**  
> This project uses public/free API keys for NASA and Supabase. These keys are intended for use in client-side and open source projects—no sensitive or paid resources are exposed.  
> **Important:** Public API keys may reach a request limit or quota, especially if multiple users are testing the project at the same time.  
> For best results, it is advisable to [create your own API keys](https://api.nasa.gov/) and follow the setup steps provided in this README.

---

## 👨‍💻 Author & Credits

- **Made by Fabio Vargas for a coding challenge**
- **Powered by NASA Open APIs, Supabase, Render and Cohere**

---
