export interface RepoCommitDetails 
{
  repoName: string;
  latestCommitMessage: string;
  totalCommits: number;
}

export const fetchRepoCommitDetails = async (username: string) => {
  const res3: RepoCommitDetails[] = [];

  try {
    // Fetch user's repositories from GitHub API
    const userRepos = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!userRepos.ok) {
      throw new Error(`Error fetching repos: ${userRepos.status}`);
    }
    const repos = await userRepos.json();

    // Iterate over the first 5 repositories
      for (const repo of repos.slice(0, 5)) {
      const repoName = repo.name;

      // Fetch commits for each repository
      const commitsResponse = await fetch(`https://api.github.com/repos/${username}/${repoName}/commits`);
      if (!commitsResponse.ok) {
        console.error(`Error fetching commits for repo ${repoName}: ${commitsResponse.status}`);
        continue;
      }
      const commits = await commitsResponse.json();

      // Get the latest commit message and total number of commits
      const latestCommitMessage = commits[0]?.commit?.message || "No commits found";
      const totalCommits = commits.length;

      // Construct the repository commit details object
      res3.push({
        repoName,
        latestCommitMessage,
        totalCommits,
      });

      console.log(res3);
    }
  } catch (error) {
    console.error("Error fetching repo commit details:", error);
  }

  return res3;
};
