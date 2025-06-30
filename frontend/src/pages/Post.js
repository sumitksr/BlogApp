import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BACKEND_URL } from '../utils/config';

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/upload/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPost(data.post);
        } else {
          setError(data.message || 'Post not found');
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load post');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-10 text-xl">Loading...</div>;
  if (error || !post) return <div className="text-center text-red-500 mt-10 text-xl font-semibold">{error || 'Post not found'}</div>;

  const { title, content, author, date, image, comments = [] } = post;
  return (
    <div className="minscreen-h- bg-gradient-to-br from-blue-50 to-purple-100 py-10 px-2">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-4xl font-extrabold text-center text-purple-700 mb-6 drop-shadow-lg">{title}</h1>
        <div >
          {image && (
            <img
              src={image}
              alt={title}
              className="w-1/2 h-1/2 object-cover rounded-xl mb-6 shadow"
            />
          )}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
            <span className="font-semibold text-gray-700 text-base">
              By <span className="text-purple-700">{author}</span>
            </span>
            <span className="text-gray-500 text-sm mt-1 md:mt-0">{date}</span>
          </div>
          <hr className="mb-6 border-purple-100" />
          <div className="text-gray-800 text-lg leading-relaxed whitespace-pre-line">
            {content}
          </div>
        </div>
        {/* Comments Section */}
        <div className="mt-10 bg-white/80 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">Comments</h2>
          {comments.length === 0 ? (
            <div className="text-gray-500">No comments yet.</div>
          ) : (
            <ul className="space-y-4">
              {comments.map((comment, idx) => (
                <li key={comment._id || idx} className="border-b border-purple-100 pb-2">
                  <div className="text-sm text-gray-700 font-semibold mb-1">{comment.user}</div>
                  <div className="text-gray-800">{comment.body}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
