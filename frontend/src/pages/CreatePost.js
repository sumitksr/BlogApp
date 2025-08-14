import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../utils/config';
import { jwtDecode } from 'jwt-decode';

export default function CreatePost() {
  const imageInputRef = useRef();
  // navigateing to home page
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    author: '',
    date: '',
    image: null,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Decode user id from token if available
    let userid = '';
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        userid = decoded.id || decoded._id || '';
      } catch (err) {
        console.error('Failed to decode token:', err);
      }
    }
    const form = new FormData();
    form.append('title', formData.title);
    form.append('summary', formData.summary);
    form.append('content', formData.content);
    form.append('author', formData.author);
    form.append('userid', userid);
    if (imageInputRef.current && imageInputRef.current.files[0]) {
      form.append('file', imageInputRef.current.files[0]);
    }
    fetch(`${BACKEND_URL}/api/v1/upload/image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: form,
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Post created successfully!');
          navigate('/');
        } else {
          alert(data.message || 'Failed to create post');
        }
      })
      .catch(err => {
        alert('Error creating post');
        console.error(err);
      });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-10 flex items-center justify-center">
      <div className="bg-white/90 rounded-2xl shadow-2xl p-8 w-full max-w-xl animate-fade-in-up">
        <h1 className="text-3xl font-extrabold text-center text-purple-700 mb-8 drop-shadow-lg animate-fade-in-up">Create a New Post</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`peer w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-transparent ${formData.title ? 'has-value' : ''}`}
              placeholder=" "
              required
            />
            <label className="floating-label">Title</label>
          </div>
          <div className="relative">
            <input
              type="text"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              className={`peer w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-transparent ${formData.summary ? 'has-value' : ''}`}
              placeholder=" "
              required
            />
            <label className="floating-label">Summary</label>
          </div>
          <div className="relative">
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className={`peer w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 min-h-[120px] placeholder-transparent ${formData.content ? 'has-value' : ''}`}
              placeholder=" "
              required
            />
            <label className="floating-label">Content</label>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className={`peer w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-transparent ${formData.author ? 'has-value' : ''}`}
                placeholder=" "
                required
              />
              <label className="floating-label">Author</label>
            </div>
            <div className="flex-1 relative">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]} // ✅ limit till today
                className={`peer w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-transparent ${formData.date ? 'has-value' : ''}`}
                placeholder=" "
                required
              />
              <label className="floating-label">Date</label>
            </div> 
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Image</label>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              name="image"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
          </div>
          <button type="submit" className="w-full py-3 mt-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden">
            <span className="z-10"> <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg> Create Post</span>
            <span className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10 pointer-events-none" />
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
        .floating-label {
          position: absolute;
          left: 1rem;
          top: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          color: #4b5563;
          background: white;
          padding: 0 0.25rem;
          border-radius: 0.25rem;
          pointer-events: none;
          transition: all 0.2s;
        }
        input:focus + .floating-label,
        input.has-value + .floating-label,
        textarea:focus + .floating-label,
        textarea.has-value + .floating-label {
          top: -1.25rem;
          font-size: 0.75rem;
          color: #7c3aed;
        }
      `}</style>
    </div>
  );
}
