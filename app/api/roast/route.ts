// pages/api/generate_roast.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { supabase } from '@/app/utils/supabase/server';  // Use server-side client

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(request: Request) {
  try {
    // Validate API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    // Parse request body
    const { profiledata, personality } = await request.json();

    // Validate request data
    if (!profiledata?.user?.login) {
      return NextResponse.json(
        { error: 'Invalid profile data' },
        { status: 400 }
      );
    }

    // Create OpenAI prompt
    const prompt = `
      You're roasting this GitHub profile in ${personality || 'savage'} style.
      
      Profile Analysis:
      - Username: ${profiledata.user.login}
      - Repositories: ${profiledata.user.public_repos}
      - Followers: ${profiledata.user.followers}
      - Following: ${profiledata.user.following}
      - Bio: ${profiledata.user.bio || 'No bio provided'}
      
      Create a ${personality}-style roast.
      Take a look at this GitHub profile and craft a short, playful roast. Highlight any amusing patterns like an obsession with 'Hello World' projects, abandoned repos, or chaotic commit messages. Keep it snappy, humorous, and balanced with clever comebacks to make sure the roast feels light-hearted yet engaging
    `;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      messages: [{ 
        role: "user", 
        content: prompt 
      }],
      model: "gpt-3.5-turbo",
      temperature: 0.8,
      max_tokens: 200,
    });

    const roastContent = completion.choices[0]?.message?.content;
    
    if (!roastContent) {
      return NextResponse.json(
        { error: 'Failed to generate roast content' },
        { status: 500 }
      );
    }

    // Insert roast using server-side Supabase client
    const { data: roastData, error: insertError } = await supabase
      .from('roast')
      .insert({ 
        username: profiledata.user.login, 
        roast: roastContent,
        likes: 0
      })
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      return NextResponse.json(
        { error: 'Failed to save roast' },
        { status: 500 }
      );
    }

    // Return successful response with the roast data
    return NextResponse.json({ roast: roastContent, data: roastData });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Internal server error' 
    }, { 
      status: 500 
    });
  }
}

