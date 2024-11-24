import { repoIterate, GitHubUserRepo } from './user_repo'; 
import {fetchRepoCommitDetails,RepoCommitDetails} from 
'./repo_det';

export interface GitHubUser  {
  login: string; // username
  followers: number;
  following: number;
  public_repos: number;
  bio: string;
}



export const fetchGitHubData = async (username: string) => {
  let res1: GitHubUser  | null = null;
  let res2: GitHubUserRepo[] = [];
  let res3: RepoCommitDetails[]=[];
  
  
  if (!username) {
    console.log("Enter a username");
    throw new Error('Please enter a username');
  }

  try {
    const userData = await fetch(`https://api.github.com/users/${username}`);
    if (!userData.ok) {
      console.log("Username not found");
      throw new Error('User  not found');
    }

    const info = await userData.json();
    console.log("Username found");
    
    // Assign the user data to response1
    res1 = {
      login: info.login,
      followers: info.followers,
      following: info.following,
      public_repos: info.public_repos,
      bio: info.bio || ' ', 
    };

    console.log(res1); // Log the user data

    // Fetch repositories
    res2 = await repoIterate(username);
    res3= await fetchRepoCommitDetails(username);
    console.log(res2); // Log the repositories data
    console.log(res3);

  } catch (error) {
    console.error("Error:", error);
    throw new Error('Failed to fetch user data or repositories');
  }

  const response={
    user:res1,
    repos:res2,
    commits: res3,
  }
  console.log(response);
  return response;
};