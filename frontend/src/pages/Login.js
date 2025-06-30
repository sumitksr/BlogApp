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
    // Here you would handle authentication logic
    console.log("Login Data Submitted:", formData);
    alert("Logged in successfully!");
    navigate('/');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-10 flex items-center justify-center">
      <div className="bg-white/90 rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-purple-700 mb-8 drop-shadow-lg">Login</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="w-full py-3 mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-md transition-colors">Login</button>
        </form>
      </div>
    </div>
  )
}
