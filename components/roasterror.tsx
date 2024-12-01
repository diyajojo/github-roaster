import React from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function RoastError({ 
  error, 
  onRetry 
}: { 
  error: string, 
  onRetry?: () => void 
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] bg-black p-6">
      <div className="bg-red-500/20 p-6 rounded-full mb-4">
        <AlertTriangle 
          className="h-16 w-16 text-red-500" 
          strokeWidth={2}
        />
      </div>
      
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-white mb-2">
          Roast Generation Failed 🔥
        </h2>
        <p className="text-red-300 mb-4">
          {error || 'Oops! Something went wrong during the roasting process.'}
        </p>
        
        {onRetry && (
          <button 
            onClick={onRetry}
            className="flex items-center justify-center mx-auto px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-colors"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}