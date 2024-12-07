import { supabase } from '@/app/utils/supabase';
import { NextResponse } from 'next/server';


export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // First get the current likes count
    const { data: roast, error: fetchError } = await supabase
      .from('roast')
      .select('likes')
      .eq('id', id)
      .single();

    if (fetchError) {
      return NextResponse.json(
        { error: 'Failed to fetch roast' },
        { status: 500 }
      );
    }

    const newLikes = (roast?.likes || 0) + 1;

    // Increment the likes count
    const { error: updateError } = await supabase
      .from('roast')
      .update({ likes: newLikes })
      .eq('id', id);

    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to update likes' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Successfully updated likes', likes: newLikes },
      { status: 200 }
    );
  } catch (error) {
    console.log('Server error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
