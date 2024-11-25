export interface RepoCommitDetails 
{
  repoName: string;
  commitMessages: string[];
  totalCommits: number;
}

export const fetchRepoCommitDetails = async (username: string) => {
  const res3: RepoCommitDetails[] = [];
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  try {
    // Fetch user's repositories from GitHub API with authentication
    const userRepos = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        'Authorization': `token ${token}`,
      },
    });
    if (!userRepos.ok) {
      throw new Error(`Error fetching repos: ${userRepos.status}`);
    }
    const repos = await userRepos.json();

    // Iterate over the first 5 repositories
      for (const repo of repos.slice(-5)) {
      const repoName = repo.name;

      // Fetch commits with increased per_page parameter
      const commitsResponse = await fetch(
        `https://api.github.com/repos/${username}/${repoName}/commits?per_page=10&author=${username}`, {
        headers: {
          'Authorization': `token ${token}`,
        },
      });
      
      if (!commitsResponse.ok) {
        console.error(`Error fetching commits for repo ${repoName}: ${commitsResponse.status}`);
        continue;
      }
      const commits = await commitsResponse.json();

      // Get the latest 10 commit messages
      const commitMessages = commits
        .slice(0, 10)
        .map((commit: any) => commit.commit.message);

      // Get total commits count using the last page header
      const linkHeader = commitsResponse.headers.get('link');
      let totalCommits = commits.length;
      
      if (linkHeader) {
        const lastPageMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);
        if (lastPageMatch) {
          totalCommits = parseInt(lastPageMatch[1]) * 30; // GitHub's default page size
        }
      }

      res3.push({
        repoName,
        commitMessages,
        totalCommits,
      });

      
    }
  } catch (error) {
    console.error("Error fetching repo commit details:", error);
  }

  return res3;
};
