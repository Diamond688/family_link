import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET /api/families - 获取家族列表
export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('families')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: '获取家族列表失败' }, { status: 500 });
  }

  return NextResponse.json(data || []);
}

// POST /api/families - 创建家族
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { name, description } = await request.json();

  const { data: userData } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('families')
    .insert({
      name,
      description,
      owner_id: userData?.user?.id,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: '创建家族失败' }, { status: 500 });
  }

  // 自动添加创建者为家族成员（管理员权限）
  await supabase.from('family_members').insert({
    family_id: data.id,
    user_id: userData?.user?.id,
    role: '管理员',
    permission: '编辑',
  });

  return NextResponse.json(data, { status: 201 });
}
