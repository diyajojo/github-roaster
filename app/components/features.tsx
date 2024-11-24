import React from "react";
import { Target, Award, Coffee } from 'lucide-react';

export default function Features()
{
  return(
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
  );
}