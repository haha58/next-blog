import { getCurrentUser } from '@/lib/current-user';

export default async function Profile() {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <a href='/login' className='text-[#1677ff] hover:text-[#4096ff] transition'>请登录</a>
    );
  }
  return (
    <a href="/profile" className="flex items-center gap-2 p-2 text-slate-700 hover:text-[#1677ff] transition">
      {/* 头像 */}
      {/* 注意：使用远程图片需要在 next.config.ts 配置 images.remotePatterns */}
      <img 
        src={user.avatar} 
        alt={user.name}
        className="size-6 rounded-full border border-[#91caff] shadow-[0_4px_12px_rgba(22,119,255,0.12)]"
      />
      
      <span className="text-sm hidden sm:block">{user.login}</span>
    </a>
  );
}
