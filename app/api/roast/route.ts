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
      You're a savage comedy roast master. Based on this GitHub user's activity (but without mentioning specific numbers):
      - Username: ${user.login}
      - Activity level: ${user.followers} followers, ${user.following} following
      - Projects: ${repos.slice(0, 3).map((r: Repo) => r.name)}
      - Recent commit messages: ${commits[0]?.commitMessages.slice(0, 2)}

      Generate a funny 6-7 sentence coding-related roast. End with a tiny compliment. Don't mention any specific numbers or repository names.
    `;

    // Call OpenAI API for chat completion
    const aiResponse = await openai.chat.completions.create({
      model: 'gpt-4-1106-preview',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150, // Reduced from 400
      temperature: 0.9,
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
