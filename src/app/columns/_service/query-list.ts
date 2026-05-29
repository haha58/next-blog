import { getCloudflareContext } from '@opennextjs/cloudflare'
import { columnKey, columnStatsKey, columnByUserKey } from '@/lib/keys';

const getKV = () => getCloudflareContext().env.MY_NEXT_KV;

// 获取专栏列表
export async function getColumnsList(limit?: number) {
  const kv = getKV();
  const prefix = columnKey.getPrefix();
  const columns = await kv.list({ prefix, limit: limit || undefined });

  const statePromises = columns.keys.map(async (key) => {
    const col_id = key.name.split(':')[1];
    const statsKey = columnStatsKey.getKey(col_id);
    const stats = await kv.get<ColumnStats>(statsKey, 'json');
    return { ...(key.metadata as Column), ...stats } as ColumnFull;
  });

  return Promise.all(statePromises);
}

export async function getColumnsListByUser(user_id: string, limit?: number) {
  const kv = getKV();
  const prefix = columnByUserKey.getPrefix(user_id);
  const columns = await kv.list({ prefix, limit: limit || undefined });

  const statePromises = columns.keys.map(async (key) => {
    let col_id = key.name.split(':')[1];
    const statsKey = columnStatsKey.getKey(col_id);
    const stats = await kv.get<ColumnStats>(statsKey, 'json');
    return { ...(key.metadata as Column), ...stats } as ColumnFull;
  });

  return Promise.all(statePromises);
}