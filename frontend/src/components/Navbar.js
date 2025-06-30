import React from 'react'

export default function Navbar() {
  return (
    <div>
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
            <a href="/" className="text-white text-lg font-bold">File Upload App</a>
            <div>
                <a href="/" className="text-gray-300 hover:text-white px-3">Home</a>
                <a href="/create" className="text-gray-300 hover:text-white px-3">Create Post</a>
                <a href="/login" className="text-gray-300 hover:text-white px-3">Login</a>
                <a href="/register" className="text-gray-300 hover:text-white px-3">Register</a>
            </div>
            </div>
        </nav>
    </div>
  )
}
