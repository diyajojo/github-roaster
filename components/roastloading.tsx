import React from 'react';
import { Flame } from 'lucide-react';

export default function RoastLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-6 -mt-16">
      <div className="relative mb-7">
        <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-75"></div>
        <div className="relative z-10 bg-black p-4 rounded-full border-4 border-orange-500">
          <Flame 
            className="h-16 w-16 text-orange-500 animate-pulse" 
            strokeWidth={2}
          />
        </div>
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Roasting in Progress 🔥
        </h2>
        <p className="text-orange-300">
          Generating your epic GitHub roast...
        </p>
      </div>
    </div>
  );
}