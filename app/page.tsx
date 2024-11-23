import React from 'react';
import { Github, Flame, Target, Award, Coffee } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-black min-h-screen flex flex-col">
      {/* Navbar with glass effect */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/30 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Flame className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 text-transparent bg-clip-text">
                GitHub Roaster
              </span>
            </div>
            <div className="flex space-x-4">
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

      {/* Hero Section */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-400 to-red-400 text-transparent bg-clip-text">
                Get Roasted!
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-4">
              Prepare your ego for a hilarious roasting based on your GitHub stats
            </p>
            <p className="text-gray-500 mb-8">
              We'll analyze your repos, commits, and coding habits to serve up the spiciest roasts in tech
            </p>
              
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <input 
                type="text"
                placeholder="Enter your GitHub username (if you dare)"
                className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
              <button className="absolute right-2 top-2 px-6 py-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-xl transition-all duration-300 flex items-center space-x-2">
                <Flame className="h-5 w-5" />
                <span>Roast Me!</span>
              </button>
            </div>
          </div>

          {/* Features Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-6 bg-gray-800/30 rounded-2xl border border-gray-700 backdrop-blur-sm transform hover:scale-105 transition-transform">
              <Target className="h-8 w-8 text-orange-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Precision Roasting</h3>
              <p className="text-gray-400">We analyze your GitHub stats to deliver personalized burns that hit close to home</p>
            </div>
            <div className="p-6 bg-gray-800/30 rounded-2xl border border-gray-700 backdrop-blur-sm transform hover:scale-105 transition-transform">
              <Award className="h-8 w-8 text-red-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Achievement Burns</h3>
              <p className="text-gray-400">Special roasts for your "impressive" contribution streaks and repo stars</p>
            </div>
            <div className="p-6 bg-gray-800/30 rounded-2xl border border-gray-700 backdrop-blur-sm transform hover:scale-105 transition-transform">
              <Coffee className="h-8 w-8 text-orange-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Code Critique</h3>
              <p className="text-gray-400">We'll judge your favorite languages and commit messages, because someone has to</p>
            </div>
          </div>

          {/* Sample Roast Preview */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Sample Roasts:</h2>
            <div className="grid gap-4 max-w-2xl mx-auto">
              <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700">
                <p className="text-gray-300 italic">"Wow, 100 repos and still no stars? Your code is more invisible than your girlfriend."</p>
              </div>
              <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700">
                <p className="text-gray-300 italic">"Your commit messages are shorter than your attention span."</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 backdrop-blur-md bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-400">&copy; 2024 GitHub Roaster | For entertainment purposes only</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}