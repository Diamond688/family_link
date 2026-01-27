'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MOCK_FAMILY } from '@/lib/constants';
import { MobileContainer } from '@/components/MobileContainer';
import { BottomNav } from '@/components/BottomNav';

export default function FamilyPage() {
  const router = useRouter();

  return (
    <MobileContainer>
      <div className="flex flex-col h-full bg-background-light dark:bg-background-dark min-h-screen">
        <header className="sticky top-0 z-10 flex items-center bg-background-light dark:bg-background-dark p-4 justify-between border-b border-slate-100 dark:border-white/5">
          <button onClick={() => router.back()} className="text-slate-900 dark:text-white flex size-10 items-center justify-center">
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold">家族共享</h2>
          <button className="size-10 flex items-center justify-center text-slate-900 dark:text-white">
            <span className="material-symbols-outlined">help</span>
          </button>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-6 pb-28">
          <div>
            <h2 className="text-slate-900 dark:text-white text-[28px] font-bold leading-tight">史密斯家族档案</h2>
            <p className="text-slate-500 dark:text-[#92b2c9] text-sm mt-1">管理者：莎拉·史密斯 (所有者)</p>
            <p className="text-slate-700 dark:text-white/80 text-base mt-4 leading-relaxed">
              邀请亲友共同丰富家族传承与故事。所有受邀者均可查看共享的珍贵回忆。
            </p>
          </div>

          <button className="w-full h-14 bg-primary text-white rounded-2xl font-bold mt-6 shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">person_add</span>
            <span>邀请家人</span>
          </button>

          <h3 className="text-slate-900 dark:text-white text-lg font-bold mt-10 mb-4">家庭成员</h3>
          <div className="space-y-3">
            {MOCK_FAMILY.map((member) => (
              <div 
                key={member.id} 
                className="flex items-center justify-between p-4 bg-white dark:bg-accent-dark rounded-2xl border border-slate-100 dark:border-border-dark shadow-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-accent-dark/80 transition-colors"
                onClick={() => router.push(`/profile/${member.id}`)}
              >
                <div className="flex items-center gap-4">
                  <div className={`size-12 rounded-full overflow-hidden border-2 ${member.isMe ? 'border-primary' : 'border-slate-100 dark:border-border-dark'}`}>
                    <img src={member.avatar} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-white font-bold">{member.name}</p>
                    <p className="text-slate-500 dark:text-[#92b2c9] text-xs">{member.isMe ? '你 • ' : ''}{member.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider ${
                    member.permission === '编辑' 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-white/70'
                  }`}>
                    {member.permission}
                  </span>
                  <span className="material-symbols-outlined text-slate-300">chevron_right</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-slate-400 dark:text-white/40 text-xs font-bold uppercase tracking-widest px-1 mb-3">待处理邀请</h3>
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-dashed border-slate-300 dark:border-border-dark opacity-70">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                  <span className="material-symbols-outlined">person</span>
                </div>
                <div>
                  <p className="text-slate-900 dark:text-white font-bold">乔治爷爷</p>
                  <p className="text-slate-500 dark:text-[#92b2c9] text-xs">george.s@email.com</p>
                </div>
              </div>
              <button className="text-primary text-sm font-bold">重新发送</button>
            </div>
          </div>
        </main>

        <footer className="mt-auto py-6 text-center border-t border-slate-100 dark:border-white/5">
          <div className="flex items-center justify-center gap-2 text-slate-400 dark:text-white/40 text-xs">
            <span className="material-symbols-outlined text-sm">lock</span>
            <span>端到端加密的家族档案</span>
          </div>
        </footer>

        <BottomNav />
      </div>
    </MobileContainer>
  );
}
