import React, { useEffect, useState, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { BACKEND_URL } from '../utils/config';

export default function EditPost() {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Track which post is being edited
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', summary: '', content: '' });

  const [saving, setSaving] = useState(false);
  const imageInputRef = useRef();

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

  // Open the edit form for a specific post
  function handleEdit(post) {
    setEditingId(post._id);
    setEditForm({
      title: post.title || '',
      summary: post.summary || '',
      content: post.content || '',
    });

    if (imageInputRef.current) imageInputRef.current.value = '';
  }

  // Cancel editing
  function handleCancelEdit() {
    setEditingId(null);
    setEditForm({ title: '', summary: '', content: '' });

  }

  // Handle form field changes
  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  }

  // Submit the edit
  async function handleSaveEdit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const form = new FormData();
      form.append('title', editForm.title);
      form.append('summary', editForm.summary);
      form.append('content', editForm.content);
      if (imageInputRef.current && imageInputRef.current.files[0]) {
        form.append('file', imageInputRef.current.files[0]);
      }

      const res = await fetch(`${BACKEND_URL}/api/v1/upload/posts/edit/${editingId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: form,
      });
      const data = await res.json();
      if (data.success) {
        // Update the post in the local list
        setUserPosts(prev =>
          prev.map(p => (p._id === editingId ? { ...p, ...data.post } : p))
        );
        setEditingId(null);
        setEditForm({ title: '', summary: '', content: '' });
        alert('Post updated successfully!');
      } else {
        alert(data.message || 'Failed to update post');
      }
    } catch (err) {
      alert('Error updating post');
      console.error(err);
    }
    setSaving(false);
  }

  function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this post?')) {
      fetch(`${BACKEND_URL}/api/v1/upload/posts/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
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
              <div key={post._id} className="bg-white/90 rounded-xl shadow-lg p-6 flex flex-col gap-4">
                {/* If currently editing this post, show the edit form */}
                {editingId === post._id ? (
                  <form onSubmit={handleSaveEdit} className="space-y-4 animate-fade-in-up">
                    <h2 className="text-lg font-bold text-purple-700 mb-2">Edit Post</h2>
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={editForm.title}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        required
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Summary</label>
                      <input
                        type="text"
                        name="summary"
                        value={editForm.summary}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        required
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Content</label>
                      <textarea
                        name="content"
                        value={editForm.content}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 min-h-[120px]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Replace Image (optional)</label>
                      <input
                        ref={imageInputRef}
                        type="file"
                        accept="image/*"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                      />
                    </div>
                    <div className="flex gap-3 mt-2">
                      <button
                        type="submit"
                        disabled={saving}
                        className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg font-bold shadow-md transition-all duration-300 disabled:opacity-60"
                      >
                        {saving ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-all duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Normal post display */
                  <div className="flex flex-col md:flex-row items-center gap-6">
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
                        onClick={() => handleEdit(post)}
                        className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-all duration-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.4s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
      `}</style>
    </div>
  );
}
