#  NASA Explorer

A modern, full-stack web app to explore NASA’s image & video archives, Near-Earth Objects, and real user space sightings—with smart AI explanations and a live database.

---

##  Tech Stack

- **Frontend:** React (responsive, mobile-first)
- **Backend:** Node.js & Express
- **Database:** Supabase (PostgreSQL, public bucket for images)
- **AI:** Cohere for text explanations & chat
- **Testing:** Jest, React Testing Library, Supertest
- **Deployment:** Render.com

---

##  Features

-  **AI Assistant:** Natural language Q&A about NASA, app content, and navigation (with deep links)
-  **Loading State Management:** Smooth UX while data loads
-  **Tested:** Unit/integration tests for frontend & backend
-  **Responsive Design:** Works great on mobile, tablet, and desktop
-  **Smart Search & Filters:** Filter NASA images/videos by topic, media type, or result limit
-  **User Submissions:** Users can submit sightings (with optional images)
-  **Live Database:** Real-time storage and retrieval via Supabase
-  **Easy Deployment:** Ready for Render.com (instructions below)

---

##  Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/nasa-explorer.git
cd nasa-explorer

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

2. Environment Variables
You need .env files in BOTH backend and frontend folders:
Backend (backend/.env)

NASA_API_KEY=your_nasa_key
CO_API_KEY=your_cohere_key
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key

Frontend (frontend/.env)

REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key

3. Supabase Setup

    Go to supabase.com and create a new project (free tier is fine).

    Database Table:

        Table name: submissions

        Columns:

            id (uuid, primary key)

            created_at (timestamp)

            name (varchar)

            email (varchar)

            image_url (varchar, optional)

            description (varchar)

    Policies:

        In the Table editor, create an insert policy:

            Policy statement: true

            Disable RLS (Row Level Security) for the table.

    Storage Bucket:

        Create a bucket named images

        Create a policy to allow anon users to insert files.

4. Run the Project Locally
Backend

cd backend
npm start

Frontend

cd frontend
npm start

The frontend should connect to the backend and to Supabase automatically via your .env settings.
Testing
Frontend

npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest
npm install --save-dev @babel/preset-env @babel/preset-react babel-jest @babel/core

To run tests:

npm test

Backend

npm install --save-dev supertest
# If test script fails, remove `"type": "module"` from package.json, and add:
# "test": "jest" to "scripts"
npm test

Note:
If you have issues running tests with react-router-dom v7+, you may need to downgrade to v6 for compatibility:

npm install react-router-dom@6

Deployment (Render.com)

You’ll have two live URLs after deploying:

    Frontend: https://your-frontend.onrender.com

    Backend: https://your-backend.onrender.com

The frontend will talk to the backend and Supabase just like in development.
Troubleshooting & Notes

    If you see connection/auth errors, double-check your .env files and Supabase settings.

    Make sure Supabase policies allow inserts for anonymous users if you want public submissions.

    For AI features, you must have valid NASA and Cohere API keys.


Author & Credits

    Made by Fabio Vargas for a coding challenge

    Thanks to NASA Open APIs and Supabase
