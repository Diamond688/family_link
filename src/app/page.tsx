'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getMemories, getFamilies } from '@/lib/api';
import { Memory } from '@/types';
import { MOCK_MEMORIES, MOCK_ME } from '@/lib/constants';
import { MobileContainer } from '@/components/MobileContainer';
import { BottomNav } from '@/components/BottomNav';

export default function HomePage() {
  const router = useRouter();
  const { user, profile, loading: authLoading } = useAuth();
  
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);

  // 加载数据
  useEffect(() => {
    const loadData = async () => {
      // 如果用户已登录，尝试获取真实数据
      if (user) {
        try {
          // 获取用户的家族
          const families = await getFamilies();
          if (families.length > 0) {
            const memoriesData = await getMemories(families[0].id);
            // 如果有真实数据则使用，否则使用 mock 数据
            setMemories(memoriesData.length > 0 ? memoriesData : MOCK_MEMORIES);
          } else {
            setMemories(MOCK_MEMORIES);
          }
        } catch (error) {
          console.error('加载数据失败:', error);
          setMemories(MOCK_MEMORIES);
        }
      } else {
        // 未登录时使用 mock 数据进行预览
        setMemories(MOCK_MEMORIES);
      }
      setLoading(false);
    };

    if (!authLoading) {
      loadData();
    }
  }, [user, authLoading]);

  // 获取当前用户显示信息
  const currentUser = profile || MOCK_ME;
  const greeting = getGreeting();

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return '早上好';
    if (hour < 18) return '下午好';
    return '晚上好';
  }

  if (authLoading || loading) {
    return (
      <MobileContainer>
        <div className="flex flex-col h-full bg-background-light dark:bg-background-dark items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-slate-500">加载中...</p>
        </div>
      </MobileContainer>
    );
  }

  return (
    <MobileContainer>
      <div className="flex flex-col h-full bg-background-light dark:bg-background-dark min-h-screen">
        <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 ios-blur">
          <div className="flex items-center p-4 justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary"
                style={{ backgroundImage: `url("${currentUser.avatar || MOCK_ME.avatar}")` }}
              />
              <div>
                <p className="text-[10px] text-slate-500 dark:text-[#92b2c9] font-medium">{greeting}</p>
                <h2 className="text-slate-900 dark:text-white text-base font-bold">{currentUser.name || 'Sarah'}</h2>
              </div>
            </div>
            <div className="relative">
              <button className="flex items-center justify-center rounded-full size-10 bg-slate-100 dark:bg-accent-dark text-slate-700 dark:text-white">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <div className="absolute top-1 right-1 size-2.5 bg-red-500 rounded-full border-2 border-background-light dark:border-background-dark animate-pulse"></div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-28">
          <div className="px-4 py-3">
            <button className="flex w-full items-center justify-center rounded-2xl h-14 bg-primary text-white gap-2 font-bold shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform">
              <span className="material-symbols-outlined">person_add</span>
              <span>添加家人</span>
            </button>
          </div>

          <div className="flex items-center justify-between px-4 mt-4">
            <h3 className="text-slate-900 dark:text-white text-xl font-extrabold">最近回忆</h3>
            <button className="text-primary text-sm font-bold">查看全部</button>
          </div>

          <div className="mt-4 px-4 space-y-2">
            {memories.map((memory, index) => (
              <div key={memory.id} className="grid grid-cols-[48px_1fr] gap-x-0 cursor-pointer" onClick={() => router.push(`/memory/${memory.id}`)}>
                <div className="flex flex-col items-center">
                  {index === 0 ? (
                    <div className="bg-primary size-3 rounded-full mt-4 ring-4 ring-primary/20"></div>
                  ) : (
                    <div className="flex items-center justify-center size-8 rounded-full bg-slate-100 dark:bg-accent-dark text-slate-500 dark:text-[#92b2c9] mt-2">
                      <span className="material-symbols-outlined !text-[18px]">
                        {memory.type === 'audio' ? 'mic' : memory.type === 'video' ? 'movie' : 'photo_library'}
                      </span>
                    </div>
                  )}
                  <div className="w-[2px] bg-slate-200 dark:bg-border-dark grow mt-2"></div>
                </div>

                <div className="flex flex-col pb-6 pl-2">
                  <div className="mb-2">
                    <p className="text-slate-900 dark:text-white text-base font-bold">{memory.title}</p>
                    <p className="text-slate-500 dark:text-[#92b2c9] text-xs font-medium">{memory.dateLabel}</p>
                  </div>

                  {memory.type === 'album' && memory.coverImage && (
                    <div className="rounded-2xl overflow-hidden aspect-video bg-slate-200 dark:bg-slate-800 relative group shadow-sm">
                      <img src={memory.coverImage} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="" />
                      <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] text-white font-bold">
                        +{memory.extraCount} 张
                      </div>
                    </div>
                  )}

                  {memory.type === 'audio' && (
                    <div className="bg-slate-50 dark:bg-accent-dark rounded-2xl p-4 border border-slate-100 dark:border-border-dark">
                      <div className="flex items-center gap-3 bg-white dark:bg-white/5 p-3 rounded-xl">
                        <span className="material-symbols-outlined text-primary !text-3xl">play_circle</span>
                        <div className="flex-1 h-1.5 bg-primary/20 rounded-full relative overflow-hidden">
                          <div className="absolute inset-y-0 left-0 w-1/3 bg-primary"></div>
                        </div>
                        <span className="text-[10px] font-mono dark:text-white">{memory.duration}</span>
                      </div>
                    </div>
                  )}

                  {memory.type === 'video' && memory.coverImage && (
                    <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-slate-200 dark:bg-slate-800 relative shadow-sm">
                      <img src={memory.coverImage} className="w-full h-full object-cover" alt="" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="size-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white">
                          <span className="material-symbols-outlined scale-150">play_arrow</span>
                        </div>
                      </div>
                      <div className="absolute top-3 right-3 bg-black/50 px-2 py-1 rounded-lg text-[10px] text-white font-bold">{memory.duration}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="flex flex-col items-center pb-12">
              <div className="size-2 bg-slate-300 dark:bg-border-dark rounded-full"></div>
              <div className="text-slate-400 dark:text-slate-500 text-sm font-medium mt-4">您已到达回忆的起点</div>
            </div>
          </div>
        </main>

        <div className="fixed bottom-24 right-6 z-50">
          <button 
            onClick={() => router.push('/add-memory')}
            className="flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-2xl shadow-primary/40 hover:scale-110 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined !text-3xl">add</span>
          </button>
        </div>

        <BottomNav />
      </div>
    </MobileContainer>
  );
}
