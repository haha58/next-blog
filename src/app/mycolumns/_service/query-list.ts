import { getCloudflareContext } from '@opennextjs/cloudflare'
import { columnStatsKey, columnByUserKey } from '@/lib/keys';
import { cookies } from 'next/headers';

const getKV = () => getCloudflareContext().env.MY_NEXT_KV;

export async function getColumnsListByUser(limit?: number) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session_id')?.value;

  if (!sessionId) {
    throw new Error('Unauthorized');
  }

  const kv = getKV();

  const sessionData = await kv.get<{userId: string}>(`session:${sessionId}`, 'json');

  if (!sessionData || !sessionData.userId) {
    throw new Error('Unauthorized');
  }

  const user_id = sessionData.userId;
  const prefix = columnByUserKey.getPrefix(user_id);
  const columns = await kv.list({ prefix, limit: limit || undefined });

  const statePromises = columns.keys.map(async (key) => {
    let col_id = key.name.split(':')[2];
    const statsKey = columnStatsKey.getKey(col_id);
    const stats = await kv.get<ColumnStats>(statsKey, 'json');
    return { ...(key.metadata as Column), ...stats } as ColumnFull;
  });

  return Promise.all(statePromises);
}