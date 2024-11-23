'use client';
import React, { useState } from 'react';
import {  Flame, Target, Award, Coffee, Menu, X } from 'lucide-react';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-black min-h-screen flex flex-col">
      {/* Navbar with glass effect */}
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

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-700">
                <button className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors text-left">
                  Home
                </button>
                <button className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors text-left">
                  Top Roasts
                </button>
                <button className="block w-full px-3 py-2 rounded-md text-base font-medium text-white bg-orange-600 hover:bg-orange-500 transition-colors text-left">
                  Get Roasted
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-20">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-orange-400 to-red-400 text-transparent bg-clip-text">
                Get Roasted!
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 mb-3 px-4">
              Prepare your ego for a hilarious roasting based on your GitHub stats
            </p>
            <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8 px-4">
              We'll analyze your repos, commits, and coding habits to serve up the spiciest roasts in tech
            </p>
              
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto px-4 sm:px-0">
              <input 
                type="text"
                placeholder="dare you to enter your username"
                className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-800/50 border border-gray-700 rounded-xl sm:rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base"
              />
              <button className="absolute right-6 sm:right-2 top-1/2 transform -translate-y-1/2 px-4 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-lg sm:rounded-xl transition-all duration-300 flex items-center space-x-2 text-sm sm:text-base">
                <Flame className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Roast Me!</span>
              </button>
            </div>
          </div>

          {/* Features Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto px-4 sm:px-6">
            <div className="p-4 sm:p-6 bg-gray-800/30 rounded-xl sm:rounded-2xl border border-gray-700 backdrop-blur-sm transform hover:scale-105 transition-transform">
              <Target className="h-6 w-6 sm:h-8 sm:w-8 text-orange-400 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Precision Roasting</h3>
              <p className="text-sm sm:text-base text-gray-400">We analyze your GitHub stats to deliver personalized burns that hit close to home</p>
            </div>
            <div className="p-4 sm:p-6 bg-gray-800/30 rounded-xl sm:rounded-2xl border border-gray-700 backdrop-blur-sm transform hover:scale-105 transition-transform">
              <Award className="h-6 w-6 sm:h-8 sm:w-8 text-red-400 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Achievement Burns</h3>
              <p className="text-sm sm:text-base text-gray-400">Special roasts for your "impressive" contribution streaks and repo stars</p>
            </div>
            <div className="p-4 sm:p-6 bg-gray-800/30 rounded-xl sm:rounded-2xl border border-gray-700 backdrop-blur-sm transform hover:scale-105 transition-transform sm:col-span-2 md:col-span-1">
              <Coffee className="h-6 w-6 sm:h-8 sm:w-8 text-orange-400 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Code Critique</h3>
              <p className="text-sm sm:text-base text-gray-400">We'll judge your favorite languages and commit messages, because someone has to</p>
            </div>
          </div>

          {/* Sample Roast Preview */}
          <div className="mt-8 sm:mt-12 md:mt-16 text-center px-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Sample Roasts:</h2>
            <div className="grid gap-3 sm:gap-4 max-w-2xl mx-auto">
              <div className="bg-gray-800/30 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-700">
                <p className="text-sm sm:text-base text-gray-300 italic">"Wow, 100 repos and still no stars? Your code is more invisible than your girlfriend."</p>
              </div>
              <div className="bg-gray-800/30 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-700">
                <p className="text-sm sm:text-base text-gray-300 italic">"Your commit messages are shorter than your attention span."</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 backdrop-blur-md bg-black/30 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">&copy; 2024 GitHub Roaster | For entertainment purposes only</p>
            <div className="flex space-x-4 sm:space-x-6">
              <a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-orange-400 transition-colors">Terms</a>
              <a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-orange-400 transition-colors">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}