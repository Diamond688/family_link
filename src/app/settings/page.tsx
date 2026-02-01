'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_ME } from '@/lib/constants';
import { MobileContainer } from '@/components/MobileContainer';
import { BottomNav } from '@/components/BottomNav';

export default function SettingsPage() {
  const router = useRouter();
  const { profile, signOut, user } = useAuth();

  const currentUser = profile || MOCK_ME;

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  interface SettingItem {
    label: string;
    icon: string;
    color: string;
    badge?: string;
    value?: string;
    valueColor?: string;
    toggle?: boolean;
    checked?: boolean;
  }

  interface SettingSection {
    title: string;
    items: SettingItem[];
  }

  const sections: SettingSection[] = [
    {
      title: '账户详情',
      items: [
        { label: '修改密码', icon: 'lock_reset', color: 'text-primary' },
        { label: '高级会员', icon: 'card_membership', color: 'text-primary', badge: '已激活' },
      ]
    },
    {
      title: '隐私与安全',
      items: [
        { label: '端到端加密', icon: 'enhanced_encryption', color: 'text-primary', value: '已启用', valueColor: 'text-emerald-500' },
        { label: '面容 / 指纹识别', icon: 'fingerprint', color: 'text-primary', toggle: true, checked: true },
      ]
    },
    {
      title: '推送通知',
      items: [
        { label: '纪念日提醒', icon: 'celebration', color: 'text-primary', toggle: true, checked: true },
        { label: '每周传承简报', icon: 'auto_stories', color: 'text-primary', toggle: true, checked: false },
      ]
    }
  ];

  return (
    <MobileContainer>
      <div className="flex flex-col h-full bg-background-light dark:bg-background-dark min-h-screen">
        <header className="sticky top-0 z-50 bg-background-light dark:bg-background-dark p-4 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
          <button onClick={() => router.back()} className="text-primary size-10 flex items-center justify-center">
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold pr-10 flex-1 text-center">设置</h2>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-6 pb-28">
          <div className="flex p-5 bg-white dark:bg-accent-dark rounded-3xl shadow-sm mb-8">
            <div className="flex items-center gap-5">
              <div 
                className="size-20 rounded-full border-2 border-primary bg-center bg-cover shadow-inner"
                style={{ backgroundImage: `url("${currentUser.avatar || MOCK_ME.avatar}")` }}
              />
              <div>
                <p className="text-slate-900 dark:text-white text-xl font-black">{currentUser.name || MOCK_ME.name}</p>
                <p className="text-slate-400 dark:text-[#92b2c9] text-sm">{currentUser.email || 'sarah.s@familyarch.com'}</p>
                {!user && (
                  <button 
                    onClick={() => router.push('/login')}
                    className="mt-2 text-primary text-sm font-bold"
                  >
                    点击登录
                  </button>
                )}
              </div>
            </div>
          </div>

          {sections.map((section, sIndex) => (
            <div key={sIndex} className="mb-8">
              <h3 className="text-slate-400 dark:text-white/40 text-[10px] font-bold uppercase tracking-widest px-2 mb-3">{section.title}</h3>
              <div className="bg-white dark:bg-accent-dark rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-border-dark">
                {section.items.map((item, iIndex) => (
                  <div 
                    key={iIndex}
                    className={`flex items-center justify-between px-5 min-h-[64px] ${iIndex !== section.items.length - 1 ? 'border-b border-slate-50 dark:border-white/5' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`size-10 rounded-2xl bg-primary/10 flex items-center justify-center ${item.color}`}>
                        <span className="material-symbols-outlined">{item.icon}</span>
                      </div>
                      <span className="text-slate-900 dark:text-white font-bold">{item.label}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {item.badge && (
                        <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-black rounded-lg">{item.badge}</span>
                      )}
                      {item.value && (
                        <span className={`text-xs font-black ${item.valueColor}`}>{item.value}</span>
                      )}
                      {item.toggle ? (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={item.checked} className="sr-only peer" readOnly />
                          <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      ) : (
                        <span className="material-symbols-outlined text-slate-300">chevron_right</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {user ? (
            <button 
              onClick={handleLogout}
              className="w-full h-14 bg-white dark:bg-accent-dark text-red-500 rounded-3xl font-black shadow-sm border border-slate-100 dark:border-border-dark active:bg-red-50 dark:active:bg-red-500/10 transition-colors"
            >
              退出登录
            </button>
          ) : (
            <button 
              onClick={() => router.push('/login')}
              className="w-full h-14 bg-primary text-white rounded-3xl font-black shadow-sm active:scale-[0.98] transition-transform"
            >
              登录账号
            </button>
          )}

          <div className="text-center py-10 opacity-40">
            <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest">Version 3.2.0 (Build 890)</p>
            <p className="text-slate-400 dark:text-slate-500 text-[9px] mt-1 font-medium">代代相传的温情记忆</p>
          </div>
        </main>

        <BottomNav />
      </div>
    </MobileContainer>
  );
}
