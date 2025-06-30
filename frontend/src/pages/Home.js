import React from 'react'
import blogPosts from '../data.js';
import Card from '../components/Card.js'
export default function Home() {
  return (
    <div>
        <h1 className='text-3xl font-bold text-center my-4'>Blog Posts</h1>
      {
        blogPosts.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      
    </div>
  )
}
