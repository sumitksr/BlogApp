# 🎨 Frontend – Blog Platform

Welcome to the **frontend** of the Blog Platform!  
A modern React app with Tailwind CSS, beautiful UI, and a floating AI chatbot on every page! 🤖✨

---

## 🌐 Live Frontend

- [https://blogapp-sumitksr.vercel.app/](https://blogapp-sumitksr.vercel.app/)

---

## ⚙️ Setup & Run Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure backend URL:**
   - Edit `src/utils/config.js` if you want to use a local backend:
     ```js
     export const BACKEND_URL = "http://localhost:5000";
     ```
   - By default, it points to the Render backend.

3. **Start the app:**
   ```bash
   npm start
   ```

   The app will run on [http://localhost:3000](http://localhost:3000) by default.

---
## 📁 File Structure Explained

```
frontend/
├── public/                # Static files (index.html, robots.txt)
├── src/                   # Source code
│   ├── components/        # Reusable UI components (Navbar, Footer, Card, ChatBox, etc.)
│   ├── context/           # React Context for global state (e.g., AuthContext)
│   ├── pages/             # Main pages/routes (Home, Login, Register, CreatePost, etc.)
│   ├── utils/             # Utility files (e.g., config.js for backend URL)
│   ├── App.js             # Main app component with routes
│   ├── index.js           # React entry point
│   ├── index.css          # Global styles
│   └── data.js            # (Optional) Sample or static data
├── package.json           # Project dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── README.md              # This file
```

- **public/**: Static files served directly (mainly `index.html`).
- **src/components/**: All reusable UI components (Navbar, Footer, Card, ChatBox, etc.).
- **src/context/**: React Context for authentication and other global state.
- **src/pages/**: Each file is a page/route in the app (e.g., Home, Login, Register, CreatePost, etc.).
- **src/utils/**: Utility files, like `config.js` for backend URL.
- **App.js**: Main React component that sets up routing.
- **index.js**: Entry point for React app.
- **index.css**: Global CSS (includes Tailwind imports).
- **package.json**: Lists dependencies and scripts.
- **tailwind.config.js**: Tailwind CSS setup.
- **postcss.config.js**: PostCSS setup for Tailwind.

---

## ✨ Features

- 📝 Create, edit, and delete blog posts
- ☁️ Upload images with preview
- 💬 Comment and like posts
- 🔒 Register & login
- 🤖 **AI Chatbot**: Floating on every page! Ask anything, get instant answers (may take up to 50 seconds if backend is cold)
- 🎨 Responsive, modern UI with Tailwind CSS

---

## ⚠️ Note About Hosting Delays

> ⏳ **First request to the backend may take up to 50 seconds** (Render cold start).  
> Please be patient and try again if you get a timeout!

---



Enjoy blogging and chatting with AI! 🚀
