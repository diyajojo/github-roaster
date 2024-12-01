'use client';
import React, { useState } from 'react';
import { Flame } from 'lucide-react';
import {  useRouter } from 'next/navigation';

export default function HeroSection() {  

  const [username, setUsername] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleFetchData = async () => {
    try {
      router.push(`/${username}`);
      setError(null);
    } 
    catch (err) {
      setError((err as Error).message);
    }
  };

  return (
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
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="enter your username"
            className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-800/50 border border-gray-700 rounded-xl sm:rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base"
          />
          <button
            onClick={handleFetchData}
            className="absolute right-6 sm:right-2 top-1/2 transform -translate-y-1/2 px-4 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-lg sm:rounded-xl transition-all duration-300 flex items-center space-x-2 text-sm sm:text-base"
          >
            <Flame className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Roast Me!</span>
          </button>
        </div>

        
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};