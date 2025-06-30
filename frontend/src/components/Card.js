import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({ post }) {
  console.log('⭐ Card got post:', post);

  const { _id, title, summary, content, author, time, imageUrl } = post;

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
        </div>
      </div>
    </div>
  );
}
