import React from "react";
import { useState } from "react";

export default function Navbar() {
  const [login, setLogin] = useState(false);
  return (
    <nav className="bg-gray-900 bg-opacity-80 backdrop-blur-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-lg font-bold">
          File Upload App
        </a>
        <div>
          {login ? (
            <div>
              <a href="/" className="text-gray-300 hover:text-white px-3">
                Home
              </a>
              <a
                href="/create"
                className="text-gray-300 hover:text-white px-3"
              >
                Create Post
              </a>
              <a
                href="/edit/:id"
                className="text-gray-300 hover:text-white px-3"
              >
                edit Post
              </a>
            </div>
          ) : (
            <div>
              <a
                href="/login"
                className="text-gray-300 hover:text-white px-3"
              >
                Login
              </a>
              <a
                href="/register"
                className="text-gray-300 hover:text-white px-3"
              >
                Register
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
