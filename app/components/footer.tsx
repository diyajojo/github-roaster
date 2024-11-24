import React from "react";

export default function FooterSection()
{
  return(
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
  )
}