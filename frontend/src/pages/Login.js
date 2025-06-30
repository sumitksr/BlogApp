import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:8000/api/v1/upload/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      credentials: 'include', // Important: allows cookies to be sent/received
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // Store token in localStorage for client-side checks and API calls
          localStorage.setItem('token', data.token);
          alert("Logged in successfully!");
          navigate('/');
        } else {
          alert(data.message || "Login failed");
        }
      })
      .catch(err => {
        alert("Login error");
        console.error(err);
      });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-10 flex items-center justify-center">
      <div className="bg-white/90 rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in-up">
        <h1 className="text-3xl font-extrabold text-center text-purple-700 mb-8 drop-shadow-lg animate-fade-in-up">Login</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="peer w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-transparent"
              placeholder="Enter your email"
              required
            />
            <label className="absolute left-4 top-2 text-sm font-semibold text-gray-700 mb-1 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-purple-700 bg-white px-1 rounded pointer-events-none">Email</label>
          </div>
          <div className="relative">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="peer w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-transparent"
              placeholder="Enter your password"
              required
            />
            <label className="absolute left-4 top-2 text-sm font-semibold text-gray-700 mb-1 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-purple-700 bg-white px-1 rounded pointer-events-none">Password</label>
          </div>
          <button type="submit" className="w-full py-3 mt-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2">
            <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
            Login
          </button>
        </form>
      </div>
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
      `}</style>
    </div>
  )
}
