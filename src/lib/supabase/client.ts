'use client';

import { createBrowserClient } from '@supabase/ssr';

// Supabase 客户端配置（浏览器端）
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// 单例客户端，用于组件中直接使用
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jbwsonsklywmfqsjrpsm.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_e094mNLmVqKOZ0BIJvJlDg_xdBTmwNp'
);
