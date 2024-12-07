'use client';
import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import RoastLoading from './roastloading';
import RoastError from './roasterror';
import { Flame, Heart, Repeat } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);



interface RoastPageProps {
  profiledata: {
    user: {
      login: string;
      avatar_url?: string;
      bio: string;
    };
  };
  personality: string;
}

export default function RoastPage({ profiledata, personality }: RoastPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [roast, setRoast] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLike = async () => {
    try {
      const newLikedState = !isLiked;
      const newLikesCount = newLikedState ? likes + 1 : likes - 1;

      const { error } = await supabase
        .from('roast')
        .update({ likes: newLikesCount })
        .eq('username', profiledata.user.login)
        .eq('roast', roast);
      
      if (!error) {
        setLikes(newLikesCount);
        setIsLiked(newLikedState);
      }
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const fetchRoast = async () => {
    try {
      setLoading(true);
      const existingId = searchParams.get('r');
      
      if (existingId) {
        const { data } = await supabase
          .from('roast')
          .select('roast, likes')
          .eq('short_id', existingId)
          .single();
        
        if (data) {
          setRoast(data.roast);
          setLikes(data.likes);
        }
        setLoading(false);
        return;
      }

      const response = await fetch('/api/roast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          profiledata,
          personality
        }),
      });

      const responseText = await response.text();
      console.log('API Response:', responseText);

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse response:', responseText);
        throw new Error('Invalid response from server');
      }

      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate roast');
      }

      setRoast(result.roast);
      
     
      

      // Supabase insert with short_id
      const { data, error: supabaseError } = await supabase
        .from('roast')
        .insert({ 
          username: profiledata.user.login, 
          roast: result.roast,
          likes: 0,
        })
        .select()
        .single();
      
      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
      } else {
        setLikes(data?.likes || 0);
  
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate roast');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoast();
  }, []);

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
  <div className="w-full max-w-2xl bg-[#0F0F0F] rounded-2xl border border-orange-600/20 shadow-xl relative">
    <div className="absolute top-4 right-4 flex space-x-2">
      <button
        onClick={fetchRoast}
        className="p-3 bg-neutral-900 hover:bg-neutral-800 rounded-full transition-all group"
        title="Generate New Roast"
      >
        <Repeat className="h-5 w-5 text-neutral-500 group-hover:text-amber-500 group-hover:rotate-180 transition-transform" />
      </button>
    </div>
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
                isLiked ? 'text-red-500 fill-red-500' : 'text-gray-400'
              }`}
            />
            <span className="text-white">{likes}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

  
  );
}