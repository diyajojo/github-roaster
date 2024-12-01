import { Metadata } from 'next';
import RoastPage from '@/components/roastpage';
import { fetchGitHubData } from '../utils/user_data';

// Define the params interface
interface PageParams {
  username: Promise<string>;
}

// Define the search params interface
interface PageSearchParams {
  personality?: string;
}

// Define the props interface
interface Props {
  params: PageParams;
  searchParams: PageSearchParams;
}

// Generate metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = await params.username;
  return {
    title: `Roasting ${username} | GitHub Roaster`,
  };
}

// Page component
export default async function Page({ params, searchParams }: Props) {
  try {
    // Await the username from params
    const username = await params.username;
    const personality = searchParams.personality || 'savage';

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
          <p>{error instanceof Error ? error.message : 'An error occurred'}</p>
        </div>
      </div>
    );
  }
}

// Configuration options
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;