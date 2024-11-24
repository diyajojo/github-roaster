export interface GitHubUserRepo
{
  name:string, //repo name
  forks:number,
  stargazed_count:number,
  watchers_count:number,
}




export const repoIterate = async (username :string) => {
  let res2: GitHubUserRepo [] = [];

  try {
    // Fetch user's repositories from GitHub API
    const userrepo = await fetch(`https://api.github.com/users/${username}/repos`);
    
   
    // Check if the response is successful
    if (!userrepo.ok) {
      throw new Error(`Error fetching repos: ${userrepo.status}`);
    }

    
    const repos = await userrepo.json();

    // Process the first 5 repositories
    repos.forEach((repo:any) => {
      const repoData: GitHubUserRepo = {
        name: repo.name,
        forks: repo.forks_count,
        stargazed_count: repo.stargazers_count,
        watchers_count: repo.watchers_count,
      };
      res2.push(repoData);
    });
  } catch (error) {
    console.error("Error:");
  }

 

  
  return res2;
};