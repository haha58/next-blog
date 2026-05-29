import { getCloudflareContext } from '@opennextjs/cloudflare'
import { columnStatsKey } from '@/lib/keys';

const getKV = () => getCloudflareContext().env.MY_NEXT_KV;

// 3. 写入/增加数据 (Server Action 用)
export async function incrementStat(id: string, type: 'views' | 'likes') {
  const kv = getKV();
  const key = columnStatsKey.getKey(id);

  // A. 读取当前值
  const currentRaw = await kv.get(key);
  const stats: ColumnStats = currentRaw 
    ? JSON.parse(currentRaw) 
    : { views: 0, likes: 0 };

  // B. 修改内存中的值
  if (type === 'views') stats.views++;
  if (type === 'likes') stats.likes++;

  // C. 写回 KV
  // 注意：KV 是最终一致性，高并发下可能会覆盖，但做博客统计够用了
  await kv.put(key, JSON.stringify(stats));
  
  return stats;
}
