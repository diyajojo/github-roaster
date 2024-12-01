'use client';
import React, { useState } from 'react';
import { Flame, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';  
import { motion, AnimatePresence } from 'framer-motion';

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false); // Close menu after navigation
  };

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
            <button 
              onClick={() => handleNavigation('/')}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-400 to-red-400 text-transparent bg-clip-text font-semibold hover:from-orange-300 hover:to-red-300 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('/top-roasts')}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-400 to-red-400 text-transparent bg-clip-text font-semibold hover:from-orange-300 hover:to-red-300 transition-colors"
            >
              Top Roasts
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-black/80 backdrop-blur-md rounded-b-xl border-t border-gray-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavigation('/')}
                  className="w-full text-left px-4 py-3 text-white hover:bg-gray-800 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Flame className="h-5 w-5 text-orange-500" />
                  <span>Home</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavigation('/top-roasts')}
                  className="w-full text-left px-4 py-3 text-white hover:bg-gray-800 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <svg 
                    className="h-5 w-5 text-orange-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                  <span>Top Roasts</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}