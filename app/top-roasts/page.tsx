'use client';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Sparkles, Heart, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Roast {
  id: string;
  created_at: string;
  username: string;
  roast: string;
  likes: number;
}

export default function TopRoasts() {
  const [roasts, setRoasts] = useState<Roast[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortMethod, setSortMethod] = useState<'recent' | 'popular'>('recent');
  const [selectedRoast, setSelectedRoast] = useState<Roast | null>(null);


  useEffect(() => {
    async function fetchTopRoasts() {
      try {
        setLoading(true);
        const response = await fetch('/api/roasts', { method: 'GET' });
        if (!response.ok) {
          throw new Error('Failed to fetch top roasts');
        }
        const data = await response.json();
        setRoasts(data);
      } catch (error) {
        console.error('Error fetching roasts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTopRoasts();
  }, []);

  const handleLike = async (roastId: string, likes: number) => {
    try {
      const response = await fetch(`/api/roasts/${roastId}`, { method: 'POST' });
      if (!response.ok) {
        throw new Error('Failed to like roast');
      }
      
      // Update both the roasts list and the selected roast if open
      setRoasts(prevRoasts => 
        prevRoasts.map(roast => 
          roast.id === roastId 
            ? { ...roast, likes: roast.likes + 1 }
            : roast
        )
      );
      
      // Update the selected roast if it's the one being liked
      if (selectedRoast && selectedRoast.id === roastId) {
        setSelectedRoast(prev => prev ? { ...prev, likes: prev.likes + 1 } : null);
      }
    } catch (error) {
      console.error('Error liking roast:', error);
    }
  };

  const sortRoasts = (method: 'recent' | 'popular') => {
    setSortMethod(method);
    const sortedRoasts = [...roasts].sort((a, b) => {
      if (method === 'popular') {
        return b.likes - a.likes;
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
    setRoasts(sortedRoasts);
  };

  const openGitHubProfile = (username: string) => {
    window.open(`https://github.com/${username}`, '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Sparkles className="h-8 w-8 text-orange-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-12 px-4">
      <motion.h1 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="text-4xl font-extrabold text-white mb-8 text-center flex items-center justify-center gap-4"
      >
        <Sparkles className="text-orange-500 w-12 h-12" />
        Top Roasts
        <Sparkles className="text-orange-500 w-12 h-12" />
      </motion.h1>

      <div className="max-w-4xl mx-auto mb-6 flex justify-center gap-4">
        {['recent', 'popular'].map((method) => (
          <motion.button
            key={method}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => sortRoasts(method as 'recent' | 'popular')}
            className={`px-6 py-2 rounded-full text-white transition-all 
              ${sortMethod === method 
                ? 'bg-orange-600 shadow-md' 
                : 'bg-zinc-800 hover:bg-zinc-700'
              }`}
          >
            {method === 'recent' ? 'Most Recent' : 'Most Popular'}
          </motion.button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {roasts.map((roast, index) => (
            <motion.div 
              key={roast.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              onClick={() => setSelectedRoast(roast)}
              className="bg-gradient-to-br from-zinc-900 to-zinc-800 
                         rounded-2xl p-6 border border-zinc-700 
                         transition-all duration-300 
                         hover:scale-[1.03] hover:rotate-1
                         cursor-pointer
                         shadow-lg hover:shadow-xl 
                         hover:border-orange-600 
                         relative overflow-hidden group"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-orange-900/10 
                              opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"></div>
              
              <div className="flex items-center mb-4 relative z-10">
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  src={`https://github.com/${roast.username}.png`}
                  alt={roast.username}
                  className="w-12 h-12 rounded-full mr-4 border-2 border-orange-500 
                             cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    openGitHubProfile(roast.username);
                  }}
                />
                <div>
                  <span 
                    className="text-orange-400 hover:text-orange-300 
                               cursor-pointer transition-colors text-lg font-semibold"
                    onClick={(e) => {
                      e.stopPropagation();
                      openGitHubProfile(roast.username);
                    }}
                  >
                    @{roast.username}
                  </span>
                  <div className="text-zinc-400 text-sm">
                    {new Date(roast.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <p className="text-white text-md mb-4 line-clamp-3 relative z-10">{roast.roast}</p>
              
              <div className="flex justify-end items-center relative z-10">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(roast.id, roast.likes);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg 
                             bg-zinc-800 hover:bg-orange-600
                             transition-all duration-300 group"
                >
                  <Heart 
                    className="h-5 w-5 text-zinc-400 
                               group-hover:text-white 
                               transition-colors"
                  />
                  <span className="text-white">{roast.likes || 0}</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Full Roast Modal */}
      <AnimatePresence>
        {selectedRoast && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedRoast(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-zinc-900 to-zinc-800 
                         rounded-2xl p-8 max-w-2xl w-full 
                         border border-zinc-700 
                         shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedRoast(null)}
                className="absolute top-4 right-4 text-white 
                           hover:text-orange-500 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="flex items-center mb-6">
                <img 
                  src={`https://github.com/${selectedRoast.username}.png`}
                  alt={selectedRoast.username}
                  className="w-16 h-16 rounded-full mr-6 border-4 border-orange-500"
                />
                <div>
                  <h2 
                    className="text-2xl font-bold text-orange-400 
                               cursor-pointer hover:text-orange-300"
                    onClick={() => openGitHubProfile(selectedRoast.username)}
                  >
                    @{selectedRoast.username}
                  </h2>
                  <p className="text-zinc-400">
                    {new Date(selectedRoast.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <p className="text-white text-lg leading-relaxed mb-6">
                {selectedRoast.roast}
              </p>

              <div className="flex justify-between items-center">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    handleLike(selectedRoast.id, selectedRoast.likes);
                  }}
                  className="flex items-center gap-3 px-6 py-3 rounded-lg 
                             bg-zinc-800 hover:bg-orange-600
                             transition-all duration-300 group"
                >
                  <Heart 
                    className="h-6 w-6 text-zinc-400 
                               group-hover:text-white 
                               transition-colors"
                  />
                  <span className="text-white text-lg">{selectedRoast.likes || 0} Likes</span>
                </motion.button>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}