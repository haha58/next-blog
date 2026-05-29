import { NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

// 本地调试用：在 KV 中创建一个测试用户与会话，并设置 session_id cookie
export async function GET() {
  const { env } = getCloudflareContext();
  const kv = env.MY_NEXT_KV;

  const userId = crypto.randomUUID();
  const userData = {
    id: userId,
    github_id: 'dev-github',
    login: 'dev',
    name: 'Dev User',
    avatar: '',
    email: ''
  };

  await kv.put(`user:${userId}`, JSON.stringify(userData));

  const sessionId = crypto.randomUUID();
  await kv.put(`session:${sessionId}`, JSON.stringify({ userId }), {
    expirationTtl: 60 * 60 * 24 * 7
  });

  const res = NextResponse.redirect(new URL('/', env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));
  res.cookies.set('session_id', sessionId, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });

  return res;
}
