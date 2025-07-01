import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-md p-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        <a href="/" className="flex items-center gap-2 text-purple-100 text-xl font-bold">
          <span className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow text-lg">📝</span>
          <span className="font-serif ">Blog Website</span>
        </a>
        <div>
          {isLoggedIn ? (
            <div className="flex gap-3 items-center">
              <a href="/" className="nav-btn">Home</a>
              <a href="/create" className="nav-btn">Create Post</a>
              <a href="/edit/:id" className="nav-btn">Manage your Post</a>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <a href="/login" className="nav-btn">Login</a>
              <a href="/register" className="nav-btn">Sign Up</a>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .nav-btn {
          position: relative;
          padding: 0.45rem 0.2rem;
          border-radius: 0.5rem;
          font-weight: 600;
          color: #c7d2fe;
          background: transparent;
          border: 2px solid transparent;
          overflow: hidden;
          transition: color 0.2s;
        }
        .nav-btn::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: 0.3rem;
          transform: translateX(-50%) scaleX(0);
          width: 70%;
          height: 2.5px;
          background: linear-gradient(90deg, #6366f1 0%, #a78bfa 100%);
          border-radius: 2px;
          transition: transform 0.3s cubic-bezier(.4,0,.2,1);
          z-index: 1;
        }
        .nav-btn:hover, .nav-btn:focus {
          color: #fff;
        }
        .nav-btn:hover::after, .nav-btn:focus::after {
          transform: translateX(-50%) scaleX(1);
        }
        .logout-btn {
          padding: 0.45rem 1.2rem;
          border-radius: 0.5rem;
          font-weight: 600;
          color: #fff;
          border: 2px solid transparent;
          transition: 
            background 0.2s,
            color 0.2s,
            border 0.2s,
            box-shadow 0.2s;
        }
        .logout-btn:hover, .logout-btn:focus {
          background: linear-gradient(90deg, #dc2626 0%, #be185d 100%);
          color: #fff;
          border: 2px solid #be185d;
          box-shadow: 0 2px 8px 0 rgba(244,114,182,0.15);
        }
      `}</style>
    </nav>
  );
}
