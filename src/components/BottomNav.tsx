'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: '时间轴', icon: 'home', path: '/' },
    { label: '家谱', icon: 'account_tree', path: '/family' },
    { label: '档案', icon: 'auto_stories', path: '/archive' },
    { label: '设置', icon: 'settings', path: '/settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] h-20 bg-background-light/80 dark:bg-background-dark/80 ios-blur border-t border-slate-200 dark:border-slate-800 flex items-center justify-around px-4 pb-4 z-50">
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-primary' : 'text-slate-400 dark:text-[#92b2c9]'
            }`}
          >
            <span className={`material-symbols-outlined ${isActive ? 'material-symbols-fill' : ''}`}>
              {item.icon}
            </span>
            <span className="text-[10px] font-bold">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
