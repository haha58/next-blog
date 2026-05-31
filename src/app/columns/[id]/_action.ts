'use server'

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { revalidatePath } from "next/cache";
import { authenticateAction } from "@/lib/authenticate-action";
import { columnLikeKey, columnStatsKey } from "@/lib/keys";

const getKV = () => getCloudflareContext().env.MY_NEXT_KV;

async function fn(user_id: string, column_id: string) {
  const kv = getKV();
  const likeKey = columnLikeKey.getKey(user_id, column_id);
  const statsKey = columnStatsKey.getKey(column_id);

  const existingLike = await kv.get(likeKey);
  const stats = await kv.get<ColumnStats>(statsKey, 'json') || { views: 0, likes: 0 };

  if (existingLike) {
    stats.likes = Math.max(0, stats.likes - 1);

    await Promise.all([
      kv.delete(likeKey),
      kv.put(statsKey, JSON.stringify(stats)),
    ]);

    return { liked: false, likes: stats.likes };
  }

  stats.likes++;

  await Promise.all([
    kv.put(likeKey, '1'),
    kv.put(statsKey, JSON.stringify(stats)),
  ]);

  return { liked: true, likes: stats.likes };
}

const toggleColumnLike = await authenticateAction(fn);

export async function likeColumn(id: string) {
  const result = await toggleColumnLike(id);

  revalidatePath('/');
  revalidatePath('/columns');

  return result;
}
