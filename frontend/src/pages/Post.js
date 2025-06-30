import React, { use } from 'react'
import { useParams } from 'react-router-dom';
import blogPosts from '../data.js';
export default function Post() {
  const { id } = useParams();
  const post = blogPosts.find((post) => post.id === parseInt(id));
  if (!post) {
    return <div className="text-center text-red-500">Post not found</div>;
  }
  const { title, content, author, date, image } = post;
  return (
    <div>
      <div>
        <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-8 drop-shadow-lg">{title}</h1>
        <div className="max-w-2xl mx-auto bg-white/80 rounded-xl shadow-lg p-6">
          {image && (
            <img
              src={image}
              alt={title}
              className="w-full h-48 object-cover rounded-t-xl mb-4"
            />
          )}
          <div className="text-gray-600 text-sm mb-2">
            <span className="font-semibold">By {author}</span> | {date}
          </div>
          <div className="text-gray-800 text-lg mb-4">{content}</div>
        </div>
      </div>
    </div>
  )
}
