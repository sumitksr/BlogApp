import React, { use, useEffect, useState } from 'react';
import Card from '../components/Card.js';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  async function fetchPosts() {
    try { 
      setLoading(true);
      const response = await fetch(`https://blogapp-6vji.onrender.com/api/v1/upload/posts`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPosts(data.posts || []);
      setLoading(false);
    } catch (err) {
      setError('Failed to load posts');
      setLoading(false);
     }}

useEffect(() => {
  fetchPosts();
}, []); 

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-8">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto mb-10 px-4">
        <div className="bg-gradient-to-r from-purple-400/80 to-blue-400/80 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center text-center animate-fade-in-up">
          <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg tracking-tight animate-fade-in-up">Welcome to File Upload Blog</h1>
          <p className="text-lg text-white/90 mb-6 animate-fade-in-up">Share your stories, ideas, and images with the world. Create, edit, and explore beautiful posts!</p>
          <a href="/create" className="inline-block px-6 py-3 bg-white/90 text-purple-700 font-bold rounded-lg shadow-md hover:bg-purple-100 transition-all duration-300 animate-bounce">Create Your First Post</a>
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-8 drop-shadow-lg animate-fade-in-up">Blog Posts</h2>
        <div className="bg-white/80 rounded-xl shadow-lg p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
          {loading ? (
            <div className="col-span-full text-center text-gray-500">Loading...</div>
          ) : error ? (
            <div className="col-span-full text-center text-red-500">{error}</div>
          ) : posts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">No posts found.</div>
          ) : (
            posts.map((post, idx) => (
              <div style={{ animationDelay: `${idx * 80}ms` }} className="animate-fade-in-up" key={post.id || post._id}>
                <Card post={post} />
              </div>
            ))
          )}
        </div>
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
  );
}
