import React from 'react'
import blogPosts from '../data.js';
import Card from '../components/Card.js'
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-8 drop-shadow-lg">Blog Posts</h1>
        <div className="bg-white/80 rounded-xl shadow-lg p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            blogPosts.map((post) => (
              <Card key={post.id} post={post} />
            ))
          }
        </div>
      </div>
    </div>
  )
}
