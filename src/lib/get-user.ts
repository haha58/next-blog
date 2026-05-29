/**
 * 获取 github 中的全量用户信息
 */
import { redirect } from 'next/navigation';
import { getCurrentUser } from './current-user';

export default async function getGithubUser() {
  // 1. 从 KV 获取当前登录用户
  const kvUser = await getCurrentUser();
  console.log("kvUser", kvUser);

  if (!kvUser) {
    redirect('/api/auth/login');
  }

  // 2. 使用 KV 中的用户名 (login) 去 GitHub 获取最新全量数据
  // 如果 KV 里没存 login，降级使用 kvUser 中的数据
  const githubData = await fetchGithubProfile(kvUser.login) 
  console.log("githubData", githubData);

  // 合并数据：优先显示 GitHub 实时数据，没有则显示 KV 数据
  const display = {
    name: githubData?.name || kvUser?.name,
    login: githubData?.login || kvUser?.login,
    avatar: githubData?.avatar_url || kvUser?.avatar,
    bio: githubData?.bio || "这个人很懒，什么都没写。",
    location: githubData?.location || "未知",
    blog: githubData?.blog,
    followers: githubData?.followers || 0,
    following: githubData?.following || 0,
    repos: githubData?.public_repos || 0,
    email: githubData?.email || kvUser?.email || "未公开",
    joinedAt: githubData?.created_at ? new Date(githubData.created_at).toLocaleDateString() : "N/A"
  };

  return display;
}

// 辅助函数：获取 GitHub 公开详细信息
async function fetchGithubProfile(username: string): Promise<GitHubUser | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'User-Agent': 'Nextjs-CF-Profile-App', // GitHub 必须要求 User-Agent
        // 'Authorization': `Bearer ${token}` // 如果你想获取私有仓库，需要在这里带上 Access Token
      },
      next: { revalidate: 3600 } // 缓存 1 小时，避免频繁撞墙
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.error("Fetch GitHub Profile Error:", e);
    return null;
  }
}

