'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageSquare, Heart, User } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={24} /> },
    { name: 'Match', path: '/matching', icon: <Heart size={24} /> },
    { name: 'Messages', path: '/messages', icon: <MessageSquare size={24} /> },
    { name: 'Profile', path: '/profile', icon: <User size={24} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm border-b border-gray-100 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center w-full h-full py-2 transition-colors ${
                pathname === item.path ? 'text-indigo-600 font-medium' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <span className="mb-1">
                {React.cloneElement(item.icon, {
                  className: `w-6 h-6 ${pathname === item.path ? 'fill-current' : ''}`,
                })}
              </span>
              <span className="text-xs">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
