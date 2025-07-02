import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import { BACKEND_URL } from '../utils/config';

export default function Card({ post }) {
  console.log('⭐ Card got post:', post);

  const { _id, title, summary, content, author, time, imageUrl, likes = [] } = post;

  // Get current user id from token
  let userId = '';
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.id || decoded._id || '';
    } catch (err) {
      userId = '';
    }
  }

  // likes is an array of Like objects, each with a user field
  const initialIsLiked = Array.isArray(likes)
    ? likes.some(like => (like.user ? like.user.toString() : like.toString()) === userId)
    : false;
  const initialLikeCount = Array.isArray(likes) ? likes.length : (typeof likes === 'number' ? likes : 0);

  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (!userId || loading) return;
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/upload/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ post: _id, user: userId }),
      });
      const data = await res.json();
      if (data.post && typeof data.liked === 'boolean') {
        setIsLiked(data.liked);
        setLikeCount(Array.isArray(data.post.likes) ? data.post.likes.length : likeCount);
      }
    } catch (err) {
      // Optionally show an error
    }
    setLoading(false);
  };

  return (
    <div className="relative bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-1 mb-4 group transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg border-2 border-transparent hover:border-purple-300">
      <div className="bg-white rounded-2xl overflow-hidden flex flex-col h-full">
        {imageUrl && (
          <div className="overflow-hidden rounded-t-2xl">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-purple-500 font-semibold bg-purple-50 px-2 py-1 rounded-full">
              {new Date(time).toLocaleDateString()}
            </span>
            <span className="text-xs text-gray-400">by {author}</span>
          </div>
          <Link to={`/post/${_id}`}>
            <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 bg-gradient-to-r from-purple-200 to-blue-100 px-2 py-1 rounded hover:text-purple-700 transition-colors cursor-pointer shadow-sm">
              {title}
            </h2>
          </Link>
          <div className="text-gray-600 text-sm mb-2 line-clamp-2">{summary}</div>
          <div className="text-gray-700 text-sm flex-1 line-clamp-3">{content}</div>
          {/* Like section */}
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={handleLike}
              disabled={loading || !userId}
              className="focus:outline-none"
              aria-label={isLiked ? 'Unlike' : 'Like'}
            >
              {isLiked ? (
                <FaHeart className="text-red-500 text-xl" title="Liked" />
              ) : (
                <FaRegHeart className="text-gray-400 text-xl" title="Like" />
              )}
            </button>
            <span className="text-sm text-gray-700 font-semibold">{likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
