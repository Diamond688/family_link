'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MOCK_GRANDPA_PROFILE, MOCK_MEMORIES } from '@/lib/constants';
import { MobileContainer } from '@/components/MobileContainer';
import { BottomNav } from '@/components/BottomNav';

export default function ArchivePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('全部');

  const tabs = ['全部', '照片', '视频', '故事'];

  return (
    <MobileContainer>
      <div className="flex flex-col h-full bg-background-light dark:bg-background-dark min-h-screen">
        <header className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 justify-between border-b border-slate-100 dark:border-white/5">
          <button onClick={() => router.back()} className="text-slate-900 dark:text-white size-10 flex items-center justify-center">
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold">人物档案</h2>
          <button className="text-slate-900 dark:text-white size-10 flex items-center justify-center">
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </header>

        <main className="flex-1 overflow-y-auto pb-28">
          <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: `url("${MOCK_GRANDPA_PROFILE.cover}")` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/40 to-transparent"></div>
          </div>

          <div className="relative -mt-16 flex flex-col items-center px-4">
            <div 
              className="size-32 rounded-full border-4 border-background-light dark:border-background-dark bg-center bg-no-repeat bg-cover shadow-xl"
              style={{ backgroundImage: `url("${MOCK_GRANDPA_PROFILE.avatar}")` }}
            />
            <div className="text-center mt-4">
              <h1 className="text-slate-900 dark:text-white text-2xl font-black">{MOCK_GRANDPA_PROFILE.name}</h1>
              <p className="text-slate-500 dark:text-[#92b2c9] text-base font-medium">{MOCK_GRANDPA_PROFILE.lifespan} • {MOCK_GRANDPA_PROFILE.role}</p>
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

          <div className="sticky top-16 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-slate-100 dark:border-border-dark overflow-x-auto no-scrollbar">
            <div className="flex px-4 gap-8">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex flex-col items-center justify-center pt-4 pb-3 min-w-[60px] relative transition-all ${
                    activeTab === tab ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-[#92b2c9]'
                  }`}
                >
                  <span className="text-sm font-bold">{tab}</span>
                  {activeTab === tab && (
                    <div className="absolute bottom-0 h-1 w-full bg-primary rounded-t-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-900 dark:text-white text-lg font-bold">回忆精选</h3>
              <button className="text-primary text-sm font-bold">查看全部</button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {MOCK_MEMORIES.map(memory => (
                <div 
                  key={memory.id} 
                  className="flex flex-col gap-2 cursor-pointer group"
                  onClick={() => router.push(`/memory/${memory.id}`)}
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-sm">
                    {memory.coverImage ? (
                      <img src={memory.coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-accent-dark to-slate-900 text-center">
                        <span className="material-symbols-outlined text-primary mb-2">auto_stories</span>
                        <p className="text-white text-[10px] italic line-clamp-4 leading-relaxed opacity-80">
                          {memory.description || "点击查看这段珍贵故事..."}
                        </p>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md rounded-full p-1.5 text-white">
                      <span className="material-symbols-outlined !text-[16px]">
                        {memory.type === 'video' ? 'videocam' : memory.type === 'audio' ? 'mic' : 'photo_camera'}
                      </span>
                    </div>
                    {memory.duration && (
                      <div className="absolute bottom-2 right-2 bg-black/60 px-1.5 py-0.5 rounded text-[10px] text-white font-bold">
                        {memory.duration}
                      </div>
                    )}
                  </div>
                  <div className="px-1">
                    <p className="text-slate-900 dark:text-white text-sm font-bold truncate">{memory.title}</p>
                    <p className="text-slate-500 dark:text-[#92b2c9] text-[10px]">1994年 • 伊利诺伊</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        <div className="fixed bottom-24 right-6 z-50">
          <button className="size-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform">
            <span className="material-symbols-outlined !text-3xl">add</span>
          </button>
        </div>

        <BottomNav />
      </div>
    </MobileContainer>
  );
}
