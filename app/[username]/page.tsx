import { fetchGitHubData } from '../utils/user_data';
import RoastPage from '../../components/roastpage';

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const username = (await params).username;
  
  try {
    // Fetch all GitHub data
    const data = await fetchGitHubData(username);
    
    // Note: fetchGitHubData already calls repoIterate and fetchRepoCommitDetails internally
    
    return( 
    <div>
    <RoastPage data={data} />
    </div>
    );
  } catch (error) {
    return <div>Error fetching GitHub data: {(error as Error).message}</div>;
  }
}