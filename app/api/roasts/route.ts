
import { NextResponse } from 'next/server';
import { supabase } from '@/app/utils/supabase/server';


export async function GET(request: Request) {
  try {

    const { data, error } = await supabase
      .from('roast')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const uniqueRoasts = data.reduce((acc: any[], current) => {
      const exists = acc.some(item => item.username === current.username);
      if (!exists) {
        acc.push(current);
      }
      return acc;
    }, []);

    return NextResponse.json(uniqueRoasts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}