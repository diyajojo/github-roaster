import React from "react";

export default function SampleRoast()
{
  return(
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
  );
}