import { getCloudflareContext } from '@opennextjs/cloudflare'
import { cookies } from 'next/headers';

const getKV = () => getCloudflareContext().env.MY_NEXT_KV;

interface ActionState<T> {
  data?: T;
  success: boolean;
  message?: string;
}

// 高阶函数：接收一个业务函数，返回一个函数，该函数会自动验证用户是否登录，并调用业务函数
export async function authenticateAction<T, R>(
  fn: (user_id: string, data: T) => Promise<R>
) {
  return async (data: T): Promise<ActionState<R>> => {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('session_id')?.value;
      console.log('[authenticateAction] session_id cookie:', sessionId);

      if (!sessionId) {
      return {
        success: false,
        message: 'Unauthorized',
      }
    }
  
    const kv = getKV();
  
    const sessionData = await kv.get<{userId: string}>(`session:${sessionId}`, 'json');
    console.log('[authenticateAction] sessionData from KV for', sessionId, ':', sessionData);
  
    if (!sessionData || !sessionData.userId) {
      return {
        success: false,
        message: 'Unauthorized',
      }
    }
  
    const user_id = sessionData.userId;
  
    try {
      const result = await fn(user_id, data)
      return {
        success: true,
        data: result,
      }
    } catch (error) {
      console.error('err', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }
}