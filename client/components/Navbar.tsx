'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, CalendarDays, Dog, User } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Discover', path: '/', icon: <Dog size={18} /> },
    { name: 'Messages', path: '/messages', icon: <MessageSquare size={18} /> },
    { name: 'Schedule', path: '/playdates', icon: <CalendarDays size={18} /> },
  ];

  return (
    <nav className="w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-indigo-600 font-extrabold text-xl">PawPals</span>
        </div>

        <div className="flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => {
            const active = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-2 pb-1 border-b-2 transition-colors ${
                  active
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
        >
          <User size={18} />
        </button>
      </div>
    </nav>
  );
}
