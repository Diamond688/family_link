import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/profiles/[id] - 获取单个人物档案
export async function GET(request: NextRequest, { params }: RouteParams) {
  const supabase = await createClient();
  const { id } = await params;

  const { data, error } = await supabase
    .from('person_profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return NextResponse.json({ error: '获取人物档案失败' }, { status: 404 });
  }

  return NextResponse.json(data);
}
