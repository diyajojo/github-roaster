export interface GitHubUserRepo {
  name: string;
  forks: number;
  stargazed_count: number;
  watchers_count: number;
}

export const repoIterate = async (username: string): Promise<GitHubUserRepo[]> => {
  let res2: GitHubUserRepo[] = [];
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  try {
    const userrepo = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers: {
        'Authorization': `token ${token}`,
      },
    });
    
    if (!userrepo.ok) {
      throw new Error("error");
    }

    const repos = await userrepo.json();

    // Process the first 5 repositories
    
    for (const repo of repos) {
      // Create a repository data object without README
      const repoData: GitHubUserRepo = {
        name: repo.name,
        forks: repo.forks_count,
        stargazed_count: repo.stargazers_count,
        watchers_count: repo.watchers_count,
      };

      res2.push(repoData);
    }
  } catch (error) {
    console.log(error);
  }

  return res2;
};