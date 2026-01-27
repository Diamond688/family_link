import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/families/[id]/members - 获取家族成员列表
export async function GET(request: NextRequest, { params }: RouteParams) {
  const supabase = await createClient();
  const { id: familyId } = await params;

  const { data, error } = await supabase
    .from('family_members')
    .select(`
      *,
      profile:profiles(*)
    `)
    .eq('family_id', familyId);

  if (error) {
    return NextResponse.json({ error: '获取家族成员失败' }, { status: 500 });
  }

  const members = (data || []).map((item) => ({
    id: item.id,
    family_id: item.family_id,
    user_id: item.user_id,
    role: item.role,
    permission: item.permission,
    profile: item.profile,
  }));

  return NextResponse.json(members);
}
