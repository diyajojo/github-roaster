export interface RepoCommitDetails 
{
  repoName: string;
  commitMessages: string[];
  totalCommits: number;
}

export const fetchRepoCommitDetails = async (username: string) => {
  const res3: RepoCommitDetails[] = [];
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.error('GitHub token not found');
    return res3;
  }

  try {
    // Fetch user's repositories
    const userRepos = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!userRepos.ok) {
      const errorData = await userRepos.json();
      console.error("GitHub API Error:", errorData);
      throw new Error(`Error fetching repos: ${errorData.message || userRepos.status}`);
    }

    const repos = await userRepos.json();

    // Iterate over the first 5 repositories
    for (const repo of repos.slice(-5)) {
      try {
        const repoName = repo.name;

        // Fetch commits
        const commitsResponse = await fetch(
          `https://api.github.com/repos/${username}/${repoName}/commits?per_page=1000&author=${username}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/vnd.github.v3+json',
            },
          }
        );
        
        if (!commitsResponse.ok) {
          console.error(`Skipping repo ${repoName}: ${commitsResponse.status}`);
          continue;
        }

        const commits = await commitsResponse.json();

        // Process commit messages
        const commitMessages = commits
          .slice(0, 10)
          .map((commit: any) => commit.commit.message)
          .filter(Boolean); // Remove any null/undefined messages

        // Calculate total commits
        const linkHeader = commitsResponse.headers.get('link');
        let totalCommits = commits.length;
        
        if (linkHeader) {
          const lastPageMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);
          if (lastPageMatch) {
            totalCommits = parseInt(lastPageMatch[1]) * 30;
          }
        }

        res3.push({
          repoName,
          commitMessages,
          totalCommits,
        });
      } catch (repoError) {
        console.error(`Error processing repo ${repo.name}:`, repoError);
        continue; // Skip this repo and continue with others
      }
    }
  } catch (error) {
    console.error("Error fetching repo commit details:", error);
    throw error; // Re-throw to handle in the calling function
  }

  return res3;
};
