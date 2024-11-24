
export interface GitHubUser
 {
  login: string;
  name: string;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
  bio:string,
  repos_url:string,
}

export const fetchGitHubData = async (username: string): Promise<GitHubUser> => {
  if (!username) {
    console.log("enter a username");
    throw new Error('Please enter a username');
  }

  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) {
    console.log("username not found");
    throw new Error('User not found');
  }
  else
  {
    console.log("username found");
    const repodetails=await fetch('https://api.github.com/repos/{username}/{repo}')
  }
  return response.json() as Promise<GitHubUser>;
};

