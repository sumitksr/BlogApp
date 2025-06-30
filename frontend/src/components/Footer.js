import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <span className="text-sm">&copy; {new Date().getFullYear()} File Upload App. All rights reserved.</span>
        <span className="text-xs mt-2 md:mt-0 flex items-center gap-1">
          Made with <span className="text-red-400 text-base">❤️</span> using <span className="text-purple-400">React</span> &amp; <span className="text-purple-400">Tailwind CSS</span>
        </span>
      </div>
    </footer>
  )
}
