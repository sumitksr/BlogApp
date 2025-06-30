import React from 'react';
import { Link } from 'react-router-dom';
export default function Card({ post }) {
  const { id, title, summary, content, author, date, image } = post;

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-0 flex flex-col overflow-hidden border border-purple-100">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-t-2xl mb-0"
        />
      )}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-purple-500 font-semibold bg-purple-50 px-2 py-1 rounded-full">{date}</span>
          <span className="text-xs text-gray-400">by {author}</span>
        </div>
        <Link to={`/post/${id}`}>
          <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 hover:text-purple-700 transition-colors cursor-pointer">
            {title}
          </h2>
        </Link>
        <div className="text-gray-600 text-sm mb-2 line-clamp-2">{summary}</div>
        <div className="text-gray-700 text-sm flex-1 line-clamp-3">{content}</div>
      </div>
    </div>
  );
}
