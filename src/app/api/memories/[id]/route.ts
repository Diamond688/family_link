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

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/memories/[id] - 获取单个记忆详情
export async function GET(request: NextRequest, { params }: RouteParams) {
  const supabase = await createClient();
  const { id } = await params;

  const { data, error } = await supabase
    .from('memories')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return NextResponse.json({ error: '获取记忆详情失败' }, { status: 404 });
  }

  const memory = {
    id: data.id,
    title: data.title,
    type: data.type,
    dateLabel: data.date_label || formatDateLabel(data.created_at),
    description: data.description,
    location: data.location,
    coverImage: data.cover_image,
    mediaUrl: data.media_url,
    duration: data.duration,
    extraCount: data.extra_count,
    tags: data.tags,
    uploadDate: data.upload_date,
  };

  return NextResponse.json(memory);
}

// PUT /api/memories/[id] - 更新记忆
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const supabase = await createClient();
  const { id } = await params;
  const body = await request.json();

  const { error } = await supabase
    .from('memories')
    .update(body)
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: '更新记忆失败' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

// DELETE /api/memories/[id] - 删除记忆
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const supabase = await createClient();
  const { id } = await params;

  const { error } = await supabase
    .from('memories')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: '删除记忆失败' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
