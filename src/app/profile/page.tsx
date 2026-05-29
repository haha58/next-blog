import getGithubUser from '@/lib/get-user'; // 复用之前的获取用户逻辑
import { logout } from './_action';
import { MapPinIcon, MailIcon, GlobeIcon, CalendarIcon } from 'lucide-react'

export default async function ProfilePage() {
  const user = await getGithubUser();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* 1. 核心资料卡片 */}
        <div className="bg-white overflow-hidden">
          {/* 顶部背景图 */}
          <div className="h-32 bg-linear-to-br from-gray-300 to-gray-600"></div>
          
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
                <h1 className="text-2xl font-bold text-gray-900">{user.login}</h1>
                <p className="text-sm text-gray-500">@{user.email || 'unknown'}</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <a 
                  href={`https://github.com/${user.login}`} 
                  target="_blank" 
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  在 GitHub 查看
                </a>
              </div>
            </div>

            {/* 简介 */}
            <div className="mt-6">
              <p className="text-gray-600 text-base">{user.bio}</p>
            </div>

            {/* 详细元数据 */}
            <dl className="mt-6 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="flex textc"><MapPinIcon className="size-4" /></dt>
                <dd className="mt-1 text-sm text-gray-900">{user.location}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="flex items-center gap-2"><MailIcon className="size-4" /></dt>
                <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
              </div>
              {user.blog && (
                <div className="sm:col-span-2">
                  <dt className="flex items-center gap-2"><GlobeIcon className="size-4" /></dt>
                  <dd className="mt-1 text-sm text-blue-600">
                    <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank">
                      {user.blog}
                    </a>
                  </dd>
                </div>
              )}
              <div className="sm:col-span-1">
                <dt className="flex items-center gap-2"><CalendarIcon className="size-4" /></dt>
                <dd className="mt-1 text-sm text-gray-900">{user.joinedAt}</dd>
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
        <div className="bg-gray-900 text-gray-100 p-6 shadow overflow-hidden">
          <h3 className="text-lg font-semibold mb-4 text-green-400">Developer Dump (Full JSON)</h3>
          <div className="bg-black bg-opacity-50 p-4 rounded-lg overflow-x-auto">
            <pre className="text-xs font-mono">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        </div>

        <form action={logout}>
          <button type="submit" className="bg-gray-500 text-white px-4 py-2">退出登录</button>
        </form>
      </div>
      
    </div>
  );
}

// 简单的统计卡片组件
function StatCard({ label, value }: { label: string, value: number }) {
  return (
    <div className="bg-white overflow-hidden p-5 text-center">
      <dt className="text-sm font-medium text-gray-500 truncate">{label}</dt>
      <dd className="mt-1 text-3xl font-semibold">{value}</dd>
    </div>
  );
}