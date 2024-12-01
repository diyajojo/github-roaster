'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/app/utils/supabase';
import RoastLoading from './roastloading';
import RoastError from './roasterror';
import { Flame, Heart  } from 'lucide-react';
import { toast } from 'sonner';

//supabase table structure
interface Roast {
  id: string;
  created_at: string;
  username: string;
  roast: string;
  likes: number;
}

interface RoastPageProps {
  profiledata: {
    user: {
      login: string;
      bio: string;
      followers: number;
      following: number;
      public_repos: number;
    };
    repos: {
      name: string;
      forks: number;
      stargazed_count: number;
      watchers_count: number;
    }[];
    commits: {
      repoName: string;
      commitMessages: string[];
      totalCommits: number;
    }[];
  };
}

export default function RoastPage({ profiledata }: RoastPageProps) {
  const [roast, setRoast] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [likes,setLikes]=useState<number>(0);
  const [isLiked,setIsLiked]=useState<boolean>(false);

  const handleLike = async () => {
    try {
      if (isLiked) {
        // Unlike
        const { error } = await supabase
          .from('roast')
          .update({ likes: likes - 1 })
          .eq('username', profiledata.user.login)
          .eq('roast', roast);
        
        if (!error) {
          setLikes(prev => prev - 1);
          setIsLiked(false);
        }
      } else {
        // Like
        const { error } = await supabase
          .from('roast')
          .update({ likes: likes + 1 })
          .eq('username', profiledata.user.login)
          .eq('roast', roast);
        
        if (!error) {
          setLikes(prev => prev + 1);
          setIsLiked(true);
        }
      }
    } catch (error) {
      console.error('Error updating likes:', error);
      toast.error('Failed to update like');
    }
  };


  const fetchRoast = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/roast', {
        method: 'POST', //POST means we are sending data to the server
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profiledata),
      });

      if (!response.ok) {
        throw new Error('Failed to generate roast');
      }

      const result = await response.json();
      setRoast(result.roast);
      const { data, error } = await supabase
      .from('roast')
      .insert({ 
        username: profiledata.user.login, 
        roast: result.roast,
        likes: 0 
      })
      //to access the single row from the table 
      .select()  
      .single(); 
        setLikes(data?.likes || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate roast');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'GitHub Roast',
          text: roast,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(roast);
        toast.success('Roast copied to clipboard!');
      }
    } catch (err) {
      toast.error('Failed to share roast');
    }
  };

  useEffect(() => {
    fetchRoast();
  }, [profiledata]);

  if (loading) {
    return (
      <RoastLoading />
    );
  }

  if (error) {
    return (
      <RoastError 
        error={error} 
        onRetry={() => {
          setError('');
          fetchRoast();
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#0F0F0F] rounded-2xl border border-orange-600/20 shadow-xl">
        <div className="p-8">
          <div className="flex items-center mb-6">
            <Flame className="h-8 w-8 text-orange-500 mr-3" />
            <h2 className="text-2xl font-bold text-white">
              🔥 GitHub Roast Master 3000 🎭
            </h2>
          </div>
          
          <div className="bg-[#1A1A1A] rounded-xl p-6 mb-6">
            <p className="text-orange-200 leading-relaxed whitespace-pre-line">
              {roast}
            </p>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button 
                onClick={handleLike}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <Heart 
                  className={`h-5 w-5 transition-colors ${
                    isLiked 
                      ? 'text-red-500 fill-red-500' 
                      : 'text-gray-400'
                  }`} 
                />
                <span className="text-white">{likes}</span>
              </button>
              </div>
            <button 
              onClick={handleShare}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm transition-colors"
            >
              Share Roast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}