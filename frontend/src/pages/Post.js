import React from 'react'
import { useParams } from 'react-router-dom';
import blogPosts from '../data.js';

export default function Post() {
  const { id } = useParams();
  const post = blogPosts.find((post) => post.id === parseInt(id));
  if (!post) {
    return <div className="text-center text-red-500 mt-10 text-xl font-semibold">Post not found</div>;
  }
  const { title, content, author, date, image } = post;
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
      </div>
    </div>
  )
}
