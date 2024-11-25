// pages/api/generate_roast.ts
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

// Interface for Repository Data
interface Repo {
  name: string;
  forks: number;
  stargazed_count: number;
  watchers_count: number;
}

// Interface for Commit Data
interface RepoCommitDetails {
  repoName: string;
  commitMessages: string[];
  totalCommits: number;
}

// Initialize OpenAI Client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user, repos, commits } = body;

    // Validate incoming data
    if (!user || !repos || !commits) {
      return NextResponse.json(
        { error: 'Invalid request body. Missing user, repos, or commits.' },
        { status: 400 }
      );
    }

    // Generate a more entertaining prompt for roasting
    const prompt = `
      You're a savage comedy roast master at a GitHub developer roast. Your target is this poor soul:

      🎯 Target Acquired: ${user.login}
      📝 Their "Professional" Bio: ${user.bio || "Too cool for a bio, apparently 🙄"}
      
      💔 The Painful Stats:
      - ${user.followers} followers (their mom and ${user.followers - 1} bots)
      - Following ${user.following} people (desperately seeking friends)
      - ${user.public_repos} public repos (quantity over quality, clearly)
      
      🗑️ Their "Amazing" Repositories:
      ${repos.map((repo: Repo) => 
        `- "${repo.name}" (${repo.forks} forks, ${repo.stargazed_count} pity stars)`
      ).join('\n')}
      
      💻 Recent Commit History (Prepare to Cringe):
      ${commits.map((commit: RepoCommitDetails) => 
        `- ${commit.repoName}: ${commit.totalCommits} commits of pure "genius"
         Latest masterpieces:
         ${commit.commitMessages.slice(0, 3).map(msg => `   🤦‍♂️ ${msg}`).join('\n')}`
      ).join('\n')}

      Now, absolutely destroy their coding career with a hilarious roast! Be creative, savage, and reference:
      - Their commit message patterns
      - The quality (or lack thereof) of their repository stats
      - Their follower to following ratio
      - Any patterns you notice in their work
      
      Make it brutally funny but keep it coding-related. Think "Comedy Central Roast" meets "Stack Overflow comments." 
      End with a small glimmer of hope or backhanded compliment to keep it light-hearted.
    `;

    // Call OpenAI API for chat completion
    const aiResponse = await openai.chat.completions.create({
      model: 'gpt-4-1106-preview',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 400, // Increased for more detailed roast
      temperature: 0.9, // Increased for more creative responses
    });

    const roast = aiResponse.choices[0]?.message?.content?.trim() || 'No roast could be generated.';

    return NextResponse.json({ roast });
  } catch (error: any) {
    console.error('Error generating roast:', error);
    return NextResponse.json(
      { error: 'Failed to generate roast' },
      { status: 500 }
    );
  }
}
