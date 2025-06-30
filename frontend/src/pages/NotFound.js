import React from 'react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
      <h1 className="text-6xl font-extrabold text-purple-700 mb-4 drop-shadow-lg">404</h1>
      <h2 className="text-2xl font-bold text-gray-700 mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-6 text-center max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <a
        href="/"
        className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold shadow transition"
      >
        Go to Home
      </a>
    </div>
  )
}
