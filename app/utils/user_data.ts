import { repoIterate, GitHubUserRepo } from './user_repo'; 
import { fetchRepoCommitDetails, RepoCommitDetails } from './repo_det';

export interface GitHubUser  {
  login: string; // username
  followers: number;
  following: number;
  public_repos: number;
  bio: string;
  readme?: string;
}

export const fetchGitHubData = async (username: string) => {
  let res1: GitHubUser  | null = null;
  let res2: GitHubUserRepo[] = [];
  let res3: RepoCommitDetails[] = [];
  let readme: string = '';

  if (!username) {
    console.log("Enter a username");
    throw new Error('Please enter a username');
  }

  try {
    const token = process.env.GITHUB_TOKEN;
    
    if (!token) {
      console.error('GitHub token not found in environment variables');
      throw new Error('GitHub authentication not configured');
    }

    const userData = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!userData.ok) {
      const errorData = await userData.json();
      console.error("GitHub API Error:", errorData);
      throw new Error(`User not found: ${errorData.message || 'Unknown error'}`);
    }

    const info = await userData.json();
    console.log("Username found");

    // Fetch README from the special username/username repository
    const readmeResponse = await fetch(
      `https://api.github.com/repos/${username}/${username}/readme`,
      {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.raw',
        },
      }
    );

    if (readmeResponse.ok) {
      readme = await readmeResponse.text();
    }

    // Assign the user data to res1
    res1 = {
      login: info.login,
      followers: info.followers,
      following: info.following,
      public_repos: info.public_repos,
      bio: info.bio || ' ',
      readme: readme || '',
    };

    // Fetch repositories and commits
    res2 = await repoIterate(username);
    res3 = await fetchRepoCommitDetails(username);
  } catch (error) {
    console.error("Error:", error);
    throw new Error('Failed to fetch user data or repositories');
  }

  const response = {
    user: res1,
    repos: res2,
    commits: res3,
  };



  return response;
  
};