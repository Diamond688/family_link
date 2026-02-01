'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { MOCK_MEMORIES } from '@/lib/constants';
import { MobileContainer } from '@/components/MobileContainer';

export default function MemoryDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const memory = MOCK_MEMORIES.find(m => m.id === id) || MOCK_MEMORIES[0];

  return (
    <MobileContainer>
      <div className="flex flex-col h-full bg-background-light dark:bg-background-dark min-h-screen">
        <header className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 justify-between border-b border-slate-100 dark:border-white/5">
          <button onClick={() => router.back()} className="text-slate-900 dark:text-white size-10 flex items-center justify-center">
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold">回忆详情</h2>
          <button className="text-slate-900 dark:text-white size-10 flex items-center justify-center">
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </header>

        <main className="flex-1 overflow-y-auto pb-8">
          <div 
            className="relative aspect-video bg-black overflow-hidden shadow-2xl group"
            style={{ backgroundImage: memory.coverImage ? `url("${memory.coverImage}")` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
            <button className="absolute inset-0 m-auto size-20 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-transform active:scale-90 shadow-2xl">
              <span className="material-symbols-outlined !text-5xl material-symbols-fill">play_arrow</span>
            </button>

            <div className="absolute inset-x-0 bottom-0 px-6 py-6 bg-gradient-to-t from-black/90 to-transparent">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-1.5 flex-1 rounded-full bg-primary relative">
                  <div className="absolute -right-1 -top-1.5 size-4 rounded-full bg-white border-2 border-primary shadow-lg"></div>
                </div>
                <div className="h-1.5 w-1/3 rounded-full bg-white/30"></div>
              </div>
              <div className="flex items-center justify-between text-white text-[10px] font-bold tracking-widest opacity-80">
                <span>0:37</span>
                <span>{memory.duration || '2:23'}</span>
              </div>
            </div>
          </div>

          <div className="px-6 py-6">
            <h1 className="text-slate-900 dark:text-white text-[32px] font-black leading-tight">{memory.title}</h1>
            <p className="text-slate-500 dark:text-[#92b2c9] text-sm mt-1">上传于 {memory.uploadDate || '2023年10月12日'}</p>

            <div className="grid grid-cols-3 gap-3 bg-slate-50 dark:bg-accent-dark p-2 rounded-2xl mt-8">
              <div className="flex flex-col items-center gap-2 py-4 rounded-xl hover:bg-white dark:hover:bg-white/5 transition-colors cursor-pointer">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">favorite</span>
                </div>
                <span className="text-slate-900 dark:text-white text-xs font-bold">收藏</span>
              </div>
              <div className="flex flex-col items-center gap-2 py-4 rounded-xl hover:bg-white dark:hover:bg-white/5 transition-colors cursor-pointer">
                <div className="size-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-white">
                  <span className="material-symbols-outlined">sell</span>
                </div>
                <span className="text-slate-900 dark:text-white text-xs font-bold">标记家人</span>
              </div>
              <div className="flex flex-col items-center gap-2 py-4 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer">
                <div className="size-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-red-500">
                  <span className="material-symbols-outlined">delete</span>
                </div>
                <span className="text-red-500 text-xs font-bold">删除</span>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-100 dark:border-white/5">
              <h3 className="text-slate-400 dark:text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">回忆描述</h3>
              <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed text-justify">
                {memory.description || '这是我们家族一段珍贵的回忆，承载着当年的温情与感动。每一张照片和每一段录音都是对过去的致敬。'}
              </p>
              {memory.location && (
                <div className="mt-8 flex items-center gap-2 text-primary">
                  <span className="material-symbols-outlined !text-xl">location_on</span>
                  <span className="text-sm font-bold">{memory.location}</span>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </MobileContainer>
  );
}
