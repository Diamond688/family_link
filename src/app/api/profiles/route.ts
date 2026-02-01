import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET /api/profiles - 获取人物档案列表
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const familyId = searchParams.get('familyId');

  if (!familyId) {
    return NextResponse.json({ error: '缺少 familyId 参数' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('person_profiles')
    .select('*')
    .eq('family_id', familyId)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: '获取人物档案失败' }, { status: 500 });
  }

  return NextResponse.json(data || []);
}
