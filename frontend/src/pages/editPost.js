import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { BACKEND_URL } from '../utils/config';

export default function EditPost() {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user id from token
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

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/v1/upload/posts`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // Filter posts by current user
          setUserPosts((data.posts || []).filter(post => post.userid === userid));
        } else {
          setError(data.message || 'Failed to load posts');
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load posts');
        setLoading(false);
      });
  }, [userid]);

  function handleEdit(id) {
    // Edit functionality is currently disabled
  }

  function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this post?')) {
      fetch(`${BACKEND_URL}/api/v1/upload/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setUserPosts(prev => prev.filter(post => post._id !== id));
          } else {
            alert(data.message || 'Failed to delete post');
          }
        })
        .catch(err => {
          alert('Error deleting post');
          console.error(err);
        });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-purple-700 mb-8 drop-shadow-lg">
          My Posts
        </h1>
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : userPosts.length === 0 ? (
          <div className="text-center text-gray-500">You have not posted anything yet.</div>
        ) : (
          <div className="space-y-6">
            {userPosts.map(post => (
              <div key={post._id} className="bg-white/90 rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-40 h-24 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
                  <div className="text-gray-600 text-sm mb-2">{post.time ? new Date(post.time).toLocaleDateString() : ''}</div>
                  <div className="text-gray-700 text-sm line-clamp-2">{post.summary}</div>
                </div>
                <div className="flex flex-col gap-2">
                  
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
