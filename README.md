# LinkVault

LinkVault is a full-stack web application that allows users to securely share text and files via temporary links with custom expiry times.

Built using **React, Node.js, Express, and MongoDB**.

---

## Features

-  Upload text content
-  Upload files (drag & drop supported)
-  Generates short shareable links
-  Custom expiry (preset + custom minutes)
-  Automatic cleanup of expired content
-  Copy-to-clipboard support
-  Modern UI using Tailwind CSS
-  Separate metadata & download APIs
-  Secure server-side expiry validation

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Multer (for file handling)

---

##  Project Structure

linkvault/
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── uploads/
│ └── index.js
│
├── frontend/
│ ├── src/
│ └── vite.config.js
│
└── README.md


---

##  Setup Instructions

### STEP 1:- Clone the repository

git clone <your-repo-url>
cd linkvault


---

### 2️⃣ Backend Setup

cd backend
npm install
node index.js

## The Server should print:-  "MongoDB connected"

The server itself runs at :- http://localhost:3000


---

### 3️⃣ Frontend Setup

cd frontend
npm install
npm run dev



