import getGithubUser from '@/lib/get-user'; // 复用之前的获取用户逻辑
import { logout } from './_action';
import { MapPinIcon, MailIcon, GlobeIcon, CalendarIcon } from 'lucide-react'

export default async function ProfilePage() {
  const user = await getGithubUser();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* 1. 核心资料卡片 */}
        <div className="bg-white overflow-hidden border border-[#d6e4ff] shadow-[0_18px_45px_rgba(22,119,255,0.10)]">
          {/* 顶部背景图 */}
          <div className="h-32 bg-linear-to-br from-[#0958d9] via-[#1677ff] to-[#69b1ff]"></div>
          
          <div className="px-6 relative pb-6">
            {/* 头像 */}
            <div className="absolute -top-16 left-6">
              <img 
                src={user.avatar} 
                alt="Avatar" 
                className="size-32 rounded-full border-4 border-white shadow-lg bg-white"
              />
            </div>

            {/* 基本信息 */}
            <div className="mt-16 sm:mt-4 sm:ml-40 sm:flex sm:justify-between sm:items-end">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{user.login}</h1>
                <p className="text-sm text-[#5b8def]">@{user.email || 'unknown'}</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <a 
                  href={`https://github.com/${user.login}`} 
                  target="_blank" 
                  className="inline-flex items-center px-4 py-2 border border-[#91caff] text-sm font-medium text-[#0958d9] bg-[#e6f4ff] hover:border-[#1677ff] hover:text-[#1677ff] transition"
                >
                  在 GitHub 查看
                </a>
              </div>
            </div>

            {/* 简介 */}
            <div className="mt-6">
              <p className="text-slate-600 text-base">{user.bio}</p>
            </div>

            {/* 详细元数据 */}
            <dl className="mt-6 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="flex textc"><MapPinIcon className="size-4" /></dt>
                <dd className="mt-1 text-sm text-slate-900">{user.location}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="flex items-center gap-2"><MailIcon className="size-4" /></dt>
                <dd className="mt-1 text-sm text-slate-900">{user.email}</dd>
              </div>
              {user.blog && (
                <div className="sm:col-span-2">
                  <dt className="flex items-center gap-2"><GlobeIcon className="size-4" /></dt>
                  <dd className="mt-1 text-sm text-[#1677ff]">
                    <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank">
                      {user.blog}
                    </a>
                  </dd>
                </div>
              )}
              <div className="sm:col-span-1">
                <dt className="flex items-center gap-2"><CalendarIcon className="size-4" /></dt>
                <dd className="mt-1 text-sm text-slate-900">{user.joinedAt}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* 2. 数据统计 Grid */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Followers" value={user.followers} />
          <StatCard label="Following" value={user.following} />
          <StatCard label="Repositories" value={user.repos} />
        </div>

        {/* 3. 调试区域：展示从 API 获取的所有原始 JSON */}
        <div className="bg-[#001529] text-slate-100 p-6 shadow-[0_14px_35px_rgba(0,21,41,0.18)] overflow-hidden">
          <h3 className="text-lg font-semibold mb-4 text-[#69b1ff]">Developer Dump (Full JSON)</h3>
          <div className="bg-white/5 p-4 rounded-lg overflow-x-auto">
            <pre className="text-xs font-mono">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        </div>

        <form action={logout}>
          <button type="submit" className="bg-[#1677ff] text-white px-4 py-2 hover:bg-[#4096ff] transition">退出登录</button>
        </form>
      </div>
      
    </div>
  );
}

// 简单的统计卡片组件
function StatCard({ label, value }: { label: string, value: number }) {
  return (
    <div className="bg-white overflow-hidden p-5 text-center border border-[#d6e4ff] shadow-[0_10px_24px_rgba(22,119,255,0.08)]">
      <dt className="text-sm font-medium text-[#5b8def] truncate">{label}</dt>
      <dd className="mt-1 text-3xl font-semibold text-slate-900">{value}</dd>
    </div>
  );
}
