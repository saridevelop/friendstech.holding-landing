'use client'

import Image from 'next/image'

export default function LogoBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-sm border-b border-gray-800/50">
      <div className="container mx-auto px-4 py-3 flex justify-center">
        <Image
          src="/logo.png"
          alt="friendstech.dev Logo"
          width={40}
          height={40}
          className="filter brightness-0 invert opacity-90 hover:opacity-100 transition-all duration-300 hover:brightness-110"
          priority
        />
      </div>
    </div>
  )
}
