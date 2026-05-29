import Link from 'next/link';
import { getCurrentUser } from '@/lib/current-user';

export default async function Profile() {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <div>
        <Link href='/login' className='text-blue-500'>请登录</Link>
      </div>
    );
  }
  return (
    <Link href="/profile" className="flex items-center gap-2 p-2">
      {/* 头像 */}
      {/* 注意：使用远程图片需要在 next.config.ts 配置 images.remotePatterns */}
      <img 
        src={user.avatar} 
        alt={user.name}
        className="size-6 rounded-full border border-gray-200"
      />
      
      <span className="text-sm hidden sm:block">{user.login}</span>
    </Link>
  );
}