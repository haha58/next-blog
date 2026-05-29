'use server'

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// 获取 KV 实例
const getKV = () => getCloudflareContext().env.MY_NEXT_KV;

export async function logout() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session_id')?.value;
  const kv = getKV();

  if (sessionId) {
    // 1. 清除 KV 中的 session (防止重放攻击)
    await kv.delete(`session:${sessionId}`);
    
    // 2. 清除 Cookie
    cookieStore.delete('session_id');
  }

  // 3. 刷新页面或重定向
  redirect('/'); 
}