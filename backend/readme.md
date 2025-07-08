# 🛠️ Backend – Blog Platform

Welcome to the **backend** of the Blog Platform!  
This is a Node.js + Express API with MongoDB, Cloudinary for image uploads, and an integrated AI chatbot powered by Groq. 🤖

---

## 🚀 Live Backend

- [https://blogapp-yakt.onrender.com](https://blogapp-yakt.onrender.com)

---

## 📦 Features

- User authentication (JWT)
- CRUD for blog posts
- Image upload (Cloudinary)
- Comments & likes
- AI Chatbot endpoint (`/api/v1/upload/ai`)

---

## ⚙️ Setup & Run Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Create a `.env` file in `/backend`:
     ```
     MONGODB_URI=your-mongodb-uri
     CLOUDINARY_CLOUD_NAME=your-cloud-name
     CLOUDINARY_API_KEY=your-api-key
     CLOUDINARY_API_SECRET=your-api-secret
     JWT_SECRET=your-jwt-secret
     GROQ_API_KEY=your-groq-api-key
     ```
   - (Get a free Groq API key at [https://console.groq.com/keys](https://console.groq.com/keys))

3. **Start the server:**
   ```bash
   npm start
   ```

   The backend will run on [http://localhost:5000](http://localhost:5000) by default.

---

## 📁 File Structure Explained

```
backend/
├── config/                # Configuration files (Cloudinary, database)
├── controllers/           # Route handler logic (login, blog posts, comments, likes, chatbot)
├── middlewares/           # Express middlewares (e.g., authentication)
├── models/                # Mongoose models (User, Post, Comment, Like, File)
├── routes/                # Express route definitions (main blog and user routes, e.g., fileUpload.js)
├── files/                 # (Optional) Uploaded files (if not using cloud storage)
├── index.js               # Main server entry point
├── package.json           # Project dependencies and scripts
├── package-lock.json      # Dependency lock file
├── .env                   # Environment variables (not committed)
├── .gitignore             # Files/folders to ignore in git
└── readme.md              # This file
```

- **config/**: Configuration for Cloudinary and database connection.
- **controllers/**: Functions that handle each route's logic (login, signup, blog posts, comments, likes, chatbot, etc.).
- **middlewares/**: Express middleware functions (e.g., authentication checks).
- **models/**: Mongoose schemas/models for MongoDB collections (User, Post, Comment, Like, etc.).
- **routes/**: Route definitions for the API (main blog and user routes, e.g., fileUpload.js).
- **files/**: (Optional) Local storage for uploaded files (if not using cloud storage).
- **index.js**: Entry point for the Express server.
- **package.json**: Lists dependencies and scripts.
- **.env**: Environment variables (API keys, DB URI, secrets).
- **.gitignore**: Specifies files/folders to ignore in git.

---

## 🤖 AI Chatbot

- **Endpoint:** `POST /api/v1/upload/ai`
- **Body:** `{ "question": "Your question here" }`
- **Response:** `{ "success": true, "answer": "AI's answer" }`

> **Note:**  
> ⏳ If using the Render-hosted backend, the first request may take up to 50 seconds to respond due to server cold starts.

---

## 🧩 API Overview

- `/api/v1/upload/login` – User login
- `/api/v1/upload/signup` – User registration
- `/api/v1/upload/posts` – Get all posts
- `/api/v1/upload/posts/:id` – Get, delete post by ID
- `/api/v1/upload/image` – Upload image (auth required)
- `/api/v1/upload/like` – Like a post
- `/api/v1/upload/unlike` – Unlike a post
- `/api/v1/upload/comment` – Add comment
- `/api/v1/upload/allComments` – Get all comments
- `/api/v1/upload/ai` – **Ask the AI chatbot!**

---

## 📝 License

MIT

---

Happy coding! 🚀
