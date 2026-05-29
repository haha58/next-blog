import { getCloudflareContext } from '@opennextjs/cloudflare';

// 生成 UUID
export const generateUUID = () => crypto.randomUUID();

// 获取 KV 实例
const getKV = () => getCloudflareContext().env.MY_NEXT_KV;

export async function getGithubUser(code: string) {
  const { env } = getCloudflareContext();
  
  // 1. 用 code 换 access_token
  const tokenParams = new URLSearchParams({
    client_id: env.GITHUB_CLIENT_ID,
    client_secret: env.GITHUB_CLIENT_SECRET,
    code,
  });
  
  const tokenRes = await fetch(`https://github.com/login/oauth/access_token?${tokenParams}`, {
    method: 'POST',
    headers: { Accept: 'application/json' },
  });
  const tokenData = (await tokenRes.json()) as {
    access_token?: string;
    error?: string;
    error_description?: string;
  };
  
  if (tokenData.error) throw new Error(tokenData.error_description);

  // 2. 用 access_token 换用户信息
  const userRes = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      'User-Agent': 'Nextjs-CF-App',
    },
  });
  return await userRes.json() as GitHubUser;
}

export async function createOrUpdateUser(ghUser: GitHubUser) {
  const kv = getKV();
  const ghIndexKey = `auth:github:${ghUser.id}`;
  
  // 1. 查索引：看这个 Github ID 是否已经注册过
  const existingMap = (await kv.get(ghIndexKey, 'json')) as {
    userId: string;
  } | null;
  
  let userId;
  
  if (existingMap && existingMap.userId) {
    // 老用户登录
    userId = existingMap.userId;
  } else {
    // 新用户注册
    userId = generateUUID();
    // 写入索引
    await kv.put(ghIndexKey, JSON.stringify({ userId }));
  }

  // 2. 更新/写入用户详细数据
  const userData = {
    id: userId,
    github_id: ghUser.id,
    login: ghUser.login,
    name: ghUser.name,
    avatar: ghUser.avatar_url,
    email: ghUser.email,
    updated_at: Date.now()
  };
  
  await kv.put(`user:${userId}`, JSON.stringify(userData));
  
  return userData;
}

export async function createSession(userId: string) {
  const kv = getKV();
  const sessionId = generateUUID();
  const sessionKey = `session:${sessionId}`;
  
  // 写入 Session，设置 7 天过期
  // KV 的 expirationTtl 单位是秒
  await kv.put(sessionKey, JSON.stringify({ userId }), {
    expirationTtl: 60 * 60 * 24 * 7, 
  });
  
  return sessionId;
}