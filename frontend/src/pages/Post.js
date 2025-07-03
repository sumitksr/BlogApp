import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BACKEND_URL } from '../utils/config';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { isLoggedIn } = useAuth();

  // Like state hooks (must be at top level)
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likeLoading, setLikeLoading] = useState(false);

  // Get user id from token
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

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/v1/upload/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPost(data.post);
          // Set like state based on fetched post
          const likes = data.post.likes || [];
          const liked = Array.isArray(likes)
            ? likes.some(like => (like.user ? like.user.toString() : like.toString()) === userId)
            : false;
          setIsLiked(liked);
          setLikeCount(Array.isArray(likes) ? likes.length : (typeof likes === 'number' ? likes : 0));
        } else {
          setError(data.message || 'Post not found');
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load post');
        setLoading(false);
      });
    // eslint-disable-next-line
  }, [id]);

  const handleLike = async () => {
    if (!userId || likeLoading || !post) return;
    setLikeLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/upload/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ post: post._id, user: userId }),
      });
      const data = await res.json();
      if (data.post && typeof data.liked === 'boolean') {
        setIsLiked(data.liked);
        setLikeCount(Array.isArray(data.post.likes) ? data.post.likes.length : likeCount);
      }
    } catch (err) {}
    setLikeLoading(false);
  };

  if (loading) return <div className="text-center mt-10 text-xl">Loading...</div>;
  if (error || !post) return <div className="text-center text-red-500 mt-10 text-xl font-semibold">{error || 'Post not found'}</div>;

  const { title, content, author, date, imageUrl, summary, comments = [] } = post;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-10 px-2 flex justify-center items-start">
      <div className="w-full max-w-3xl mx-auto bg-white/90 rounded-2xl shadow-2xl p-8 animate-fade-in-up">
        <h1 className="text-4xl md:text-4xl font-extrabold text-center text-purple-700 mb-6 drop-shadow-lg">{title}</h1>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
          <span className="font-semibold text-gray-700 text-base">
            By <span className="text-purple-700">{author}</span>
          </span>
          <span className="text-gray-500 text-sm mt-1 md:mt-0">{date}</span>
        </div>
      
        
        
        {imageUrl && (
          <div className="flex justify-center mb-6">
            <img
              src={imageUrl}
              alt={title}
              className="w-full max-w-xl h-72 object-cover rounded-xl shadow-lg border border-purple-100"
            />
          </div>
        )}
        <hr className="mb-6 border-purple-200" />
        <div className="text-gray-800 text-lg leading-relaxed whitespace-pre-line mb-10">
          {content}
        </div>
        <div className="text-gray-600 text-base mb-4 italic">{summary}</div>
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={handleLike}
            disabled={likeLoading || !userId}
            className="focus:outline-none"
            aria-label={isLiked ? 'Unlike' : 'Like'}
          >
            {isLiked ? (
              <FaHeart className="text-red-500 text-2xl" title="Liked" />
            ) : (
              <FaRegHeart className="text-gray-400 text-2xl" title="Like" />
            )}
          </button>
          <span className="text-base text-gray-700 font-semibold">{likeCount}</span>
        </div>
        <div className="mt-10 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2m10-4H7a2 2 0 00-2 2v0a2 2 0 002 2h10a2 2 0 002-2v0a2 2 0 00-2-2z" /></svg>
            Comments
          </h2>
          {comments.length === 0 ? (
            <div className="text-gray-500">No comments yet.</div>
          ) : (
            <ul className="space-y-4">
              {comments.map((comment, idx) => (
                <li key={comment._id || idx} className="flex items-start gap-3 border-b border-purple-100 pb-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center text-lg font-bold text-purple-700 shadow">
                    {comment.user?.name ? comment.user.name.split(' ').map(n => n[0]).join('').toUpperCase() : '?'}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-700 font-semibold mb-1">{comment.user?.name || 'Unknown User'}</div>
                    <div className="text-gray-800 text-base">{comment.body}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {isLoggedIn && (
            <form
              className="mt-8 flex flex-col sm:flex-row gap-2 items-end border-t border-purple-100 pt-6"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!commentText.trim()) return;
                setSubmitting(true);
                try {
                  const res = await fetch(`${BACKEND_URL}/api/v1/upload/comment`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                      post: post._id,
                      user: userId,
                      body: commentText,
                    }),
                  });
                  const data = await res.json();
                  if (data.post) {
                    setPost(data.post);
                    setCommentText('');
                  } else {
                    alert(data.error || 'Failed to add comment');
                  }
                } catch (err) {
                  alert('Error adding comment');
                }
                setSubmitting(false);
              }}
            >
              <input
                type="text"
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                className="flex-1 px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white shadow"
                placeholder="Write a comment..."
                disabled={submitting}
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg font-bold shadow-md transition-all duration-300 disabled:opacity-60"
                disabled={submitting || !commentText.trim()}
              >
                {submitting ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
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
  )
}
