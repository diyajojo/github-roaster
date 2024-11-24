export interface GitHubUserRepo {
  name: string; // Repo name
  forks: number;
  stargazed_count: number;
  watchers_count: number;
  readme: string|null;
}

export const repoIterate = async (username: string): Promise<GitHubUserRepo[]> => {
  let res2: GitHubUserRepo[] = [];

  try {
    // Fetch user's repositories from GitHub API
    const userrepo = await fetch(`https://api.github.com/users/${username}/repos`);
    
    // Check if the response is successful
    if (!userrepo.ok) {
      throw new Error("error");
    }

    const repos = await userrepo.json();

    // Process the first 5 repositories
    const limitedRepos = repos.slice(0, 5); // Limit to first 5 repositories
    for (const repo of limitedRepos) {
      try {
        // Fetch the README file for each repository
        const readmeResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/readme`);
        if (!readmeResponse.ok) {
          throw new Error("error");
        }

        // Parse the README response
        const readmeData = await readmeResponse.json();
        let decodedContent = "";
        if (readmeData.encoding === "base64") {
          // Decode the base64 content
          decodedContent = atob(readmeData.content);
        }

        // Create a repository data object
        const repoData: GitHubUserRepo = {
          name: repo.name,
          forks: repo.forks_count,
          stargazed_count: repo.stargazers_count,
          watchers_count: repo.watchers_count,
          readme: decodedContent,
        };

        // Add the repository data to the result array
        res2.push(repoData);
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }

  return res2; // Return the result array
};