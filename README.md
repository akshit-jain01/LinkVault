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

### Step 2:-  Backend Setup

-cd backend
-npm install
-node index.js

## The Server should print:-  "MongoDB connected"

The server itself runs at :- http://localhost:3000


---

### Stwp 3:- Frontend Setup

-cd frontend
-npm install
-npm run dev

The frontend runs at:- http://localhost:5173

---

##  How It Works

- Files are stored in a local `uploads/` directory.
- MongoDB stores metadata:
  - shareId
  - type (text/file)
  - content reference
  - filePath
  - originalName
  - expiry timestamp
- Expiry is validated server-side.
- Expired content is deleted after user accesses the link upon its expiry.
- File downloads use a dedicated `/api/download/:id` endpoint.

---
## API endPoints

# Frontend Routes
- /                        :-  Upload Page (Text and File tabs)
- /view/:id                :-  View Shared Content

# Backend Endpoints
base URL:-  http://localhost:3000/api
- POST  /upload            :-  Upload Text
- POST  /upload-file       :-  Upload File
- GET   /view/:id          :-  view Metadata
- GET   /download/:id      :-  download file
---

##  Design Decisions

- Separation of metadata and file download endpoints
- Short link generation using `nanoid`
- Lazy deletion for expired content
- Tailwind-based component UI for consistency
- Drag-and-drop UX for modern file uploads

---

---

##  Future Improvements

- Image preview before download
- Upload progress indicator
- Countdown timer for expiry
- Cloud object storage integration
- password based file access
- cron job for content deletion in real time

---

## Author
Akshit Jain
25CS60R31
M.Tech CSE
