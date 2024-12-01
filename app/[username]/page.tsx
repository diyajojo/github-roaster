import { Metadata } from 'next';
import RoastPage from '@/components/roastpage';
import { fetchGitHubData } from '../utils/user_data';

// Define the params type
type PageParams = {
  username: string;
};

// Define the search params type
type PageSearchParams = {
  personality?: string;
};

// Define the props type
type Props = {
  params: PageParams;
  searchParams: PageSearchParams;
};

// Generate metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Roasting ${params.username} | GitHub Roaster`,
  };
}

// Page component
export default async function Page(props: Props) {
  const username = props.params.username;
  const personality = props.searchParams.personality || 'savage';

  try {
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

// Add these exports for Next.js
export const dynamic = 'force-dynamic';
export const dynamicParams = true;