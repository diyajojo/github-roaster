'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/app/utils/supabase';

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

  useEffect(() => {
    const fetchRoast = async () => {
      try {
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

    fetchRoast();
  }, [data]);



  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        <p className="ml-3">Generating your roast...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Your GitHub Roast</h2>
        <p className="text-gray-700 whitespace-pre-line">
          {roast}
        </p>
      </div>
    </div>
  );
}