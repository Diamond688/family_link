/** @type {import('next').NextConfig} */
const nextConfig = {
  // 实验性功能
  experimental: {
    // 启用 React 编译器优化（可选）
  },
  
  // 图片域名配置
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jbwsonsklywmfqsjrpsm.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
