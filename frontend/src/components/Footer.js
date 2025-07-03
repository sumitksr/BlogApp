import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 mt-10 border-t-4 border-gradient-to-r from-purple-400 to-blue-400 relative">
        <span className="text-xs mt-2 md:mt-0 flex items-center gap-2">
          Made with <span className="text-red-400 text-base animate-pulse">❤️</span> using <span className="text-purple-400">React</span> &amp; <span className="text-purple-400">Tailwind CSS</span>
          <a href="https://github.com/sumitksr" target="_blank" rel="noopener noreferrer" className="ml-2 hover:text-blue-400 transition-colors duration-300"><svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 012.9-.39c.98.01 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/></svg></a>
<a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-300">
  <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.026-3.036-1.85-3.036-1.851 0-2.134 1.445-2.134 2.939v5.666H9.355V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.368-1.85 3.6 0 4.267 2.368 4.267 5.451v6.29zM5.337 7.433a2.065 2.065 0 110-4.13 2.065 2.065 0 010 4.13zM6.772 20.452H3.893V9h2.879v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.207 24 24 23.227 24 22.271V1.729C24 .774 23.207 0 22.225 0z"/>
  </svg>
</a>
        </span>
      </div>
    </footer>
  )
}
