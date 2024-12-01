'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/app/utils/supabase';
import RoastLoading from './roastloading';
import RoastError from './roasterror';
import { Flame } from 'lucide-react';

interface RoastPageProps {
  data: {
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

export default function RoastPage({ data }: RoastPageProps) {
  const [roast, setRoast] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const fetchRoast = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/roast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to generate roast');
      }

      const result = await response.json();
      setRoast(result.roast);
      const { data: roastData, error: roastError } = await supabase
        .from('roast')
        .insert({ username: data.user.login, roast: result.roast });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate roast');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoast();
  }, [data]);

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
              GitHub Roast
            </h2>
          </div>
          
          <div className="bg-[#1A1A1A] rounded-xl p-6 mb-6">
            <p className="text-orange-200 leading-relaxed whitespace-pre-line">
              {roast}
            </p>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className="h-2 w-2 rounded-full bg-orange-500/50 hover:bg-orange-500 transition-colors"
                />
              ))}
            </div>
            <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm transition-colors">
              Share Roast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}