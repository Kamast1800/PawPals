'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageSquare, Heart, User, Calendar } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Match', path: '/matching', icon: <Heart size={20} /> },
    { name: 'Playdates', path: '/playdates', icon: <Calendar size={20} /> },
    { name: 'Messages', path: '/messages', icon: <MessageSquare size={20} /> },
    { name: 'Profile', path: '/profile', icon: <User size={20} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-md mx-auto px-2">
        <div className="flex justify-between items-center h-16">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center w-full h-full py-2 transition-colors ${
                pathname === item.path ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'
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
