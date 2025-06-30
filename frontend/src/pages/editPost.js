import React, { useState } from 'react';
import blogPosts from '../data.js';

// Simulate logged-in user by login id (replace with real auth in production)
const currentUserId = "sumit@email.com"; // Example login id (email)

export default function EditPost() {
  // Filter posts by login id (assuming each post has a 'userId' field)
  const [userPosts, setUserPosts] = useState(
    blogPosts.filter(post => post.userId === currentUserId)
  );

  function handleEdit(id) {
    alert(`Edit post with id: ${id}`);
    // Implement edit logic here
  }

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setUserPosts(prev => prev.filter(post => post.id !== id));
      // Implement backend delete logic here
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-purple-700 mb-8 drop-shadow-lg">
          My Posts
        </h1>
        {userPosts.length === 0 ? (
          <div className="text-center text-gray-500">You have not posted anything yet.</div>
        ) : (
          <div className="space-y-6">
            {userPosts.map(post => (
              <div key={post.id} className="bg-white/90 rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-40 h-24 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
                  <div className="text-gray-600 text-sm mb-2">{post.date}</div>
                  <div className="text-gray-700 text-sm line-clamp-2">{post.summary}</div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleEdit(post.id)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
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
