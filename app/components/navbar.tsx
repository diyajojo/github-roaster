'use client';
import React, { useState } from 'react';
import { Flame, Menu, X } from 'lucide-react';

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/30 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Flame className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 text-transparent bg-clip-text">
              GitHub Roaster
            </span>
          </div>
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            <button className="px-4 py-2 rounded-full text-gray-300 hover:text-white transition-colors">
              Home
            </button>
            <button className="px-4 py-2 rounded-full text-gray-300 hover:text-white transition-colors">
              Top Roasts
            </button>
            <button className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-full transition-colors">
              Get Roasted
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}