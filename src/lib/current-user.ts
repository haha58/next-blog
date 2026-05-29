import { cookies } from 'next/headers';
import { getCloudflareContext } from '@opennextjs/cloudflare';

interface SessionData {
  userId: string;
}

interface UserData {
  id: string;
  github_id: string;
  name: string;
  login: string;
  avatar: string;
  email: string | null;
  updated_at: number;
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session_id')?.value;
  
  if (!sessionId) return null;

  const { env } = getCloudflareContext();
  
  // 1. 查 Session
  const sessionData = await env.MY_NEXT_KV.get<SessionData>(`session:${sessionId}`, 'json');
  
  if (!sessionData || !sessionData.userId) return null;
  
  // 2. 查 User (利用 KV 的极快读取能力)
  const user = await env.MY_NEXT_KV.get<UserData>(`user:${sessionData.userId}`, 'json');
  
  return user;
}