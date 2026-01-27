import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// 格式化日期标签
function formatDateLabel(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return '今天';
  if (diffDays === 1) return '昨天';
  if (diffDays < 7) return `${diffDays}天前`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}周前`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}个月前`;
  return `${Math.floor(diffDays / 365)}年前`;
}

// GET /api/memories - 获取记忆列表
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const familyId = searchParams.get('familyId');

  let query = supabase
    .from('memories')
    .select('*')
    .order('created_at', { ascending: false });

  if (familyId) {
    query = query.eq('family_id', familyId);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: '获取记忆失败' }, { status: 500 });
  }

  // 转换字段名称以匹配前端类型
  const memories = (data || []).map((item) => ({
    id: item.id,
    title: item.title,
    type: item.type,
    dateLabel: item.date_label || formatDateLabel(item.created_at),
    description: item.description,
    location: item.location,
    coverImage: item.cover_image,
    mediaUrl: item.media_url,
    duration: item.duration,
    extraCount: item.extra_count,
    tags: item.tags,
    uploadDate: item.upload_date,
  }));

  return NextResponse.json(memories);
}

// POST /api/memories - 创建新记忆
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const body = await request.json();

  const { data: userData } = await supabase.auth.getUser();
  
  const { data, error } = await supabase
    .from('memories')
    .insert({
      ...body,
      created_by: userData?.user?.id,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: '创建记忆失败' }, { status: 500 });
  }

  const memory = {
    id: data.id,
    title: data.title,
    type: data.type,
    dateLabel: formatDateLabel(data.created_at),
    description: data.description,
    location: data.location,
    coverImage: data.cover_image,
    mediaUrl: data.media_url,
    duration: data.duration,
    extraCount: data.extra_count,
    tags: data.tags,
    uploadDate: data.upload_date,
  };

  return NextResponse.json(memory, { status: 201 });
}
