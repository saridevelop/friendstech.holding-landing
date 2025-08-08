'use client'

import { Twitter, MessageSquare, Github, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-12 text-center">
      <div className="flex justify-center space-x-6 mb-6">
        <a href="https://twitter.com/friendstechdev" target="_blank" rel="noopener noreferrer" aria-label="X" className="text-gray-400 hover:text-white transition-colors duration-200">
          <Twitter className="w-6 h-6" />
        </a>
        <a href="https://github.com/friendstechdev" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-400 hover:text-white transition-colors duration-200">
          <Github className="w-6 h-6" />
        </a>
        <a href="mailto:info@friendslab.dev" aria-label="Email" className="text-gray-400 hover:text-white transition-colors duration-200">
          <Mail className="w-6 h-6" />
        </a>
      </div>
      <p className="text-gray-500 text-sm">&copy; 2025 FriendsLab.dev. Todos los derechos reservados.</p>
    </footer>
  )
}
