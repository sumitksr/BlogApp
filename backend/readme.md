/blog-backend
├── /controllers         # Logic for each route (e.g. create post, register user)
│   ├── authController.js
│   └── postController.js
├── /models              # Mongoose schemas
│   ├── User.js
│   └── Post.js
├── /routes              # Express route definitions
│   ├── authRoutes.js
│   └── postRoutes.js
├── /middlewares         # Custom middleware (auth, error handlers)
│   └── authMiddleware.js
├── /config              # DB connection and environment configs
│   └── db.js
├── .env                 # Environment variables
├── .gitignore
├── package.json
├── server.js            # Entry point
└── README.md
