
# Task Management System

A full-stack **Task Management Web Application** built using the **MERN** stack (MongoDB, Express, React, Node.js).
This project allows users to register, log in, and manage their personal tasks — including adding, editing, deleting, and filtering by status, title, or tags.

---

## Features

- Secure **User Authentication** (Signup & Login) using JWT
- Passwords securely hashed with **bcrypt**
- **CRUD** operations for tasks
- Filter tasks by:
  - Status (Pending / In-Progress / Completed)
  - Title or Tag (case-insensitive)
- Clean, responsive UI
- Error handling and validation
- Bonus: Pagination-ready backend structure

---

## Tech Stack

| Layer             | Technology                           |
| :---------------- | :----------------------------------- |
| Frontend          | React.js                             |
| Backend           | Node.js, Express.js                  |
| Database          | MongoDB Atlas                        |
| Authentication    | JWT (JSON Web Token)                 |
| Password Security | bcrypt                               |
| Deployment        | Render (Backend) + Vercel (Frontend) |

---

## Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_JWT_secret
```

---

## 1. Installation & Setup

### Clone the repository

```bash
git clone https://github.com/shankarj-2218/task-management-system.git
cd task-management-system
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file as shown above.

Start backend:

```bash
npm run dev
```

Backend will run on `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

Frontend will run on `http://localhost:3000`

---

### 4. Folder Structure

```
task-management-system/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.js
│   └── package.json
└── README.md
```

---

## Deployment Links

| Service                     | URL                                              |
| :-------------------------- | :----------------------------------------------- |
| **Frontend (Vercel)** | https://task-manager-4zyp.vercel.app/            |
| **Backend (Render)**  | https://task-manager-g9fu.onrender.com/api/tasks |

**Test User Credentials:**

```
Email: test@example.com
Password: pass1234
```

---

## Approach & Notes

- Implemented **modular architecture** separating controllers, routes, and models for scalability.
- Added JWT middleware to protect routes and ensure user-specific task visibility.
- Used Mongoose schemas with timestamps for tracking task creation/updates.
- Designed the frontend with React functional components and clean CSS.
- Filters combine `status` + `search` for AND-based matching — ensuring accurate results.
- Integrated error handling for both client and server sides for smooth UX.
