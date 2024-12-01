import { fetchGitHubData } from '../utils/user_data';
import RoastPage from '../../components/roastpage';

interface PageProps {
  params: {
    username: string
  };
  searchParams: {
    personality?: string
  };
}

export default async function Page({
  params,
  searchParams,
}: PageProps) {
  const username = await params.username;
  const personality = await searchParams.personality || 'savage';
  
  try {
    // Fetch all GitHub data
    const profiledata = await fetchGitHubData(username);
    
    if (!profiledata) {
      throw new Error('Failed to fetch GitHub data');
    }
    
    return (
      <div className="min-h-screen bg-black">
        <RoastPage 
          profiledata={profiledata} 
          personality={personality}
        />
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{(error as Error).message}</p>
        </div>
      </div>
    );
  }
}

export const dynamic = 'force-dynamic';