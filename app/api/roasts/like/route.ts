import { NextResponse } from 'next/server';
import { supabase } from '@/app/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const { username, roast, likes } = await request.json();

    const { error } = await supabase
      .from('roast')
      .update({ likes })
      .eq('username', username)
      .eq('roast', roast);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update likes' },
      { status: 500 }
    );
  }
} 