'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { MobileContainer } from '@/components/MobileContainer';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signUp } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!email || !password) {
      setError('请填写邮箱和密码');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message || '登录失败，请检查邮箱和密码');
        } else {
          router.push('/');
        }
      } else {
        if (!name) {
          setError('请填写您的姓名');
          setLoading(false);
          return;
        }
        const { error } = await signUp(email, password, name);
        if (error) {
          setError(error.message || '注册失败，请稍后重试');
        } else {
          setError('注册成功！请检查邮箱确认链接后登录。');
          setIsLogin(true);
        }
      }
    } catch (err) {
      setError('发生未知错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileContainer>
      <div className="flex min-h-screen w-full flex-col bg-[#f8f9fa] transition-colors duration-300">
        {/* 顶部标题 */}
        <div className="flex items-center justify-center pt-6 pb-4">
          <h1 className="text-slate-800 text-lg font-medium">万家灯火</h1>
        </div>

        {/* 主英雄卡片 */}
        <div className="px-6 py-2">
          <div 
            className="w-full bg-center bg-no-repeat bg-cover flex flex-col items-center justify-center overflow-hidden rounded-[24px] aspect-[4/3] relative shadow-md border border-slate-100"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070&auto=format&fit=crop")`
            }}
          >
            {/* 背景遮罩和装饰圆圈 */}
            <div className="flex flex-col items-center text-center z-10">
              {/* 截图中的白色发光圆心 */}
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(255,255,255,0.6)]">
                <div className="w-12 h-12 bg-white/10 rounded-full border border-white/20"></div>
              </div>
              
              <h2 className="text-white text-[32px] font-bold tracking-tight drop-shadow-md">万家灯火</h2>
              <p className="text-white/90 text-sm mt-2 tracking-wide font-medium drop-shadow-sm">传承家族记忆，守护爱的脉搏</p>
            </div>
          </div>
        </div>

        {/* 登录/注册表单 */}
        <div className="flex flex-col px-8 pt-8 flex-1">
          <div className="space-y-5">
            {/* 姓名输入框（仅注册时显示） */}
            {!isLogin && (
              <div className="flex flex-col">
                <label className="text-slate-800 text-sm font-medium mb-2">姓名</label>
                <div className="relative">
                  <input 
                    className="flex w-full rounded-xl border border-slate-200 bg-white h-[56px] pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-primary text-slate-900 placeholder:text-slate-400"
                    placeholder="请输入您的姓名"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">person</span>
                </div>
              </div>
            )}

            {/* 邮箱输入框 */}
            <div className="flex flex-col">
              <label className="text-slate-800 text-sm font-medium mb-2">邮箱</label>
              <div className="relative">
                <input 
                  type="email"
                  className="flex w-full rounded-xl border border-slate-200 bg-white h-[56px] pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-primary text-slate-900 placeholder:text-slate-400"
                  placeholder="请输入邮箱地址"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
              </div>
            </div>

            {/* 密码输入框 */}
            <div className="flex flex-col">
              <label className="text-slate-800 text-sm font-medium mb-2">密码</label>
              <div className="relative">
                <input 
                  type="password"
                  className="flex w-full rounded-xl border border-slate-200 bg-white h-[56px] pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-primary text-slate-900 placeholder:text-slate-400"
                  placeholder="请输入密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
              </div>
            </div>
          </div>

          {/* 错误提示 */}
          {error && (
            <div className={`mt-4 p-3 rounded-xl text-sm ${error.includes('成功') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
              {error}
            </div>
          )}

          {/* 操作按钮 */}
          <div className="flex flex-col gap-4 mt-10">
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="w-full h-[56px] bg-[#FAC638] text-white rounded-xl font-bold text-lg shadow-sm active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? '处理中...' : (isLogin ? '登录' : '注册')}
            </button>
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }}
              className="w-full h-[56px] bg-[#fdf6e6] text-[#FAC638] border border-[#FAC638]/20 rounded-xl font-bold text-lg active:scale-[0.98] transition-all"
            >
              {isLogin ? '注册新账号' : '返回登录'}
            </button>
          </div>

          {/* 底部链接和社交登录 */}
          <div className="flex flex-col items-center gap-8 py-8">
            <a className="text-[#FAC638] text-sm font-bold hover:underline" href="#">忘记密码？</a>
            
            <div className="flex items-center gap-3 w-full">
              <div className="h-[1px] bg-slate-200 flex-1"></div>
              <span className="text-slate-400 text-[10px] font-bold">第三方登录</span>
              <div className="h-[1px] bg-slate-200 flex-1"></div>
            </div>

            <div className="flex gap-6">
              <button className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100/50 border border-slate-200 shadow-sm active:bg-slate-200 transition-colors">
                <span className="material-symbols-outlined text-slate-800 font-bold text-sm">ios</span>
              </button>
              <button className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100/50 border border-slate-200 shadow-sm active:bg-slate-200 transition-colors">
                <span className="material-symbols-outlined text-slate-800">cloud</span>
              </button>
            </div>
          </div>
        </div>

        {/* 底部服务条款 */}
        <div className="pb-8 text-center px-6 mt-auto">
          <p className="text-slate-400 text-[10px] leading-relaxed">
            登录即代表您同意我们的<br/>
            <a className="underline hover:text-primary transition-colors" href="#">服务条款</a> 和 <a className="underline hover:text-primary transition-colors" href="#">隐私政策</a>
          </p>
        </div>
      </div>
    </MobileContainer>
  );
}
