'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { MOCK_GRANDPA_PROFILE } from '@/lib/constants';
import { MobileContainer } from '@/components/MobileContainer';

export default function ProfilePage() {
  const { id } = useParams();
  const router = useRouter();

  // 这里可以根据 id 获取实际的用户数据
  const profile = MOCK_GRANDPA_PROFILE;

  return (
    <MobileContainer>
      <div className="flex flex-col h-full bg-background-light dark:bg-background-dark min-h-screen">
        <header className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 justify-between border-b border-slate-100 dark:border-white/5">
          <button onClick={() => router.back()} className="text-slate-900 dark:text-white size-10 flex items-center justify-center">
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold">个人档案</h2>
          <button className="text-slate-900 dark:text-white size-10 flex items-center justify-center">
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </header>

        <main className="flex-1 overflow-y-auto pb-28">
          <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: `url("${profile.cover}")` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/40 to-transparent"></div>
          </div>

          <div className="relative -mt-16 flex flex-col items-center px-4">
            <div 
              className="size-32 rounded-full border-4 border-background-light dark:border-background-dark bg-center bg-no-repeat bg-cover shadow-xl"
              style={{ backgroundImage: `url("${profile.avatar}")` }}
            />
            <div className="text-center mt-4">
              <h1 className="text-slate-900 dark:text-white text-2xl font-black">{profile.name}</h1>
              <p className="text-slate-500 dark:text-[#92b2c9] text-base font-medium">{profile.lifespan} • {profile.role}</p>
            </div>
            
            <button className="mt-4 px-6 h-10 bg-slate-100 dark:bg-accent-dark text-slate-900 dark:text-white rounded-xl text-sm font-bold w-full max-w-[180px] shadow-sm">
              编辑资料
            </button>
          </div>

          <div className="flex justify-center gap-3 px-4 py-6">
            <button className="flex-1 h-12 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined">cloud_upload</span>
              <span>上传媒体</span>
            </button>
            <button className="flex-1 h-12 bg-slate-100 dark:bg-accent-dark text-slate-900 dark:text-white rounded-2xl font-bold flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">play_circle</span>
              <span>回忆播放</span>
            </button>
          </div>

          <div className="px-4 py-6">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-4">个人简介</h3>
            <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
              {profile.bio || '这是一位对家族有着深远影响的长辈，他的故事和智慧将永远传承下去。'}
            </p>
          </div>
        </main>
      </div>
    </MobileContainer>
  );
}
