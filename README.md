full-stack real-time chat application using **Node.js**, **Express**, **Socket.IO**, and **MongoDB** on the backend, with a **React** frontend powered by **Redux Toolkit** and **React Query (TanStack)** for state and data management.

---

## 🚀 Features

- Real-time messaging with Socket.IO
- Chat history persisted with MongoDB
- REST API to fetch messages
- React frontend with Redux Toolkit for local state
- React Query for async server state and caching
- User join/leave notifications

---

## 🛠️ Tech Stack

### 🧠 Backend

- **Node.js**
- **Express**
- **Socket.IO**
- **Mongoose** (MongoDB)

### 💻 Frontend

- **React**
- **Redux Toolkit**
- **React Query (TanStack)**
- **Axios**
- **Tailwind CSS** (optional)

---

## 📁 Project Structure

kf-echo-messaging-app/
├── client/ # React frontend
│ ├── public/ # Static files
│ └── src/
│ ├── app/ # Redux store setup
│ ├── components/ # Reusable UI components
│ ├── features/ # Redux slices (chat, user)
│ ├── hooks/ # Custom React Query hooks
│ ├── pages/ # React page components
│ ├── services/ # API utilities (Axios + Query fns)
│ ├── socket/ # Socket.IO client config
│ ├── App.jsx
│ └── main.jsx
│
├── server/ # Node.js backend
│ ├── config/ # DB config, env setup
│ ├── controllers/ # Request/response logic
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API route definitions
│ ├── sockets/ # Socket.IO server-side events
│ ├── middleware/ # Custom middleware (auth, error handling)
│ ├── utils/ # Utility functions
│ ├── server.js # Main Express server entry
│ └── .env # Env variables
│
├── package.json # Root package (or separate for client/server)
├── README.md
└── .gitignore
