'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { createMemory, getFamilies, createFamily } from '@/lib/api';
import { MobileContainer } from '@/components/MobileContainer';

export default function AddMemoryPage() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [selectedType, setSelectedType] = useState<'album' | 'video' | 'audio' | 'story' | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [familyId, setFamilyId] = useState<string | null>(null);

  const mediaTypes = [
    { id: 'album', label: '照片相册', icon: 'photo_library', color: 'bg-blue-500' },
    { id: 'video', label: '珍贵视频', icon: 'videocam', color: 'bg-purple-500' },
    { id: 'audio', label: '语音故事', icon: 'mic', color: 'bg-emerald-500' },
    { id: 'story', label: '文字记录', icon: 'edit_note', color: 'bg-orange-500' },
  ];

  // 获取或创建家族
  useEffect(() => {
    const initFamily = async () => {
      if (!user) return;
      
      const families = await getFamilies();
      if (families.length > 0) {
        setFamilyId(families[0].id);
      } else {
        // 如果用户没有家族，自动创建一个
        const { data } = await createFamily('我的家族');
        if (data) {
          setFamilyId(data.id);
        }
      }
    };
    
    initFamily();
  }, [user]);

  const handleSave = async () => {
    if (!selectedType || !title.trim()) {
      setError('请选择类型并填写标题');
      return;
    }

    if (!user) {
      setError('请先登录');
      router.push('/login');
      return;
    }

    if (!familyId) {
      setError('正在初始化家族信息，请稍后再试');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await createMemory({
        title: title.trim(),
        type: selectedType,
        description: description.trim() || undefined,
        location: location.trim() || undefined,
        family_id: familyId,
      });

      if (error) {
        setError(error.message || '保存失败，请稍后重试');
      } else {
        router.push('/');
      }
    } catch (err) {
      setError('发生未知错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileContainer>
      <div className="flex flex-col h-full bg-background-light dark:bg-background-dark min-h-screen">
        <header className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 justify-between border-b border-slate-100 dark:border-white/5">
          <button onClick={() => router.back()} className="text-slate-900 dark:text-white size-10 flex items-center justify-center">
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold">添加新回忆</h2>
          <div className="size-10"></div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 pb-24">
          <div className="space-y-6">
            <section>
              <h3 className="text-slate-400 dark:text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">第一步：选择类型</h3>
              <div className="grid grid-cols-2 gap-4">
                {mediaTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id as any)}
                    className={`flex flex-col items-center gap-3 p-6 rounded-3xl border-2 transition-all ${
                      selectedType === type.id
                        ? 'border-primary bg-primary/5 shadow-inner'
                        : 'border-slate-100 dark:border-border-dark bg-white dark:bg-accent-dark'
                    }`}
                  >
                    <div className={`size-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${type.color}`}>
                      <span className="material-symbols-outlined !text-2xl">{type.icon}</span>
                    </div>
                    <span className="text-slate-900 dark:text-white text-sm font-bold">{type.label}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-slate-400 dark:text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">第二步：填写详情</h3>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <label className="text-slate-800 dark:text-white text-sm font-medium mb-2 px-1">回忆标题</label>
                  <input
                    className="flex w-full rounded-2xl border border-slate-200 dark:border-border-dark bg-white dark:bg-accent-dark h-14 px-4 focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white placeholder:text-slate-400"
                    placeholder="例如：爷爷的旧木箱"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-slate-800 dark:text-white text-sm font-medium mb-2 px-1">描述（可选）</label>
                  <textarea
                    className="flex w-full rounded-2xl border border-slate-200 dark:border-border-dark bg-white dark:bg-accent-dark min-h-[120px] p-4 focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white placeholder:text-slate-400 resize-none"
                    placeholder="记录下这一刻的感动..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-slate-800 dark:text-white text-sm font-medium mb-2 px-1">地点</label>
                  <div className="relative">
                    <input
                      className="flex w-full rounded-2xl border border-slate-200 dark:border-border-dark bg-white dark:bg-accent-dark h-14 pl-12 pr-4 focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white placeholder:text-slate-400"
                      placeholder="标记发生地"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">location_on</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 错误提示 */}
            {error && (
              <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleSave}
              disabled={!selectedType || loading}
              className={`w-full h-16 rounded-2xl font-bold text-lg shadow-lg transition-all ${
                selectedType && !loading
                  ? 'bg-primary text-white shadow-primary/30 active:scale-[0.98]'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {loading ? '保存中...' : '保存并上传'}
            </button>
          </div>
        </main>
      </div>
    </MobileContainer>
  );
}
