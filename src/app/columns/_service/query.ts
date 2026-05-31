import { columnKey, columnLikeKey, columnStatsKey } from '@/lib/keys';
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { cookies } from 'next/headers';

const getKV = () => getCloudflareContext().env.MY_NEXT_KV;

// 获取专栏详情
export async function getColumns(id: string) {
  const kv = getKV();

  const key = columnKey.getKey(id);
  const result = await kv.get<Column>(key, 'json');

  if (!result) {
    throw new Error('专栏不存在');
  }

  const statsKey = columnStatsKey.getKey(id);
  const stats = await kv.get<ColumnStats>(statsKey, 'json');
  
  if (!stats) {
    throw new Error('专栏不存在');
  }

  let isLiked = false;

  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session_id')?.value;

  if (sessionId) {
    const sessionData = await kv.get<{userId: string}>(`session:${sessionId}`, 'json');

    if (sessionData?.userId) {
      const likeKey = columnLikeKey.getKey(sessionData.userId, id);
      const like = await kv.get(likeKey);
      isLiked = Boolean(like);
    }
  }

  return {...result,...stats, isLiked};
}
