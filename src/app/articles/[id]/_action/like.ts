'use server';

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { articleLikeKey, articleStatsKey } from '@/lib/keys';
import { authenticateAction } from '@/lib/authenticate-action';

const getKV = () => getCloudflareContext().env.MY_NEXT_KV;

async function fn(user_id: string, article_id: string) {
  const kv = getKV();
  const key = articleLikeKey.getKey(user_id, article_id);
  const statsKey = articleStatsKey.getKey(article_id);

  const existingLike = await kv.get(key);
  const _stats = await kv.get<ArticleStats>(statsKey,'json');
  const stats = _stats || { views: 0, likes: 0 };

  if (existingLike) {
    stats.likes = Math.max(0, stats.likes - 1);

    await Promise.all([
      kv.delete(key),
      kv.put(statsKey, JSON.stringify(stats))
    ]);

    return { liked: false, likes: stats.likes };
  }

  stats.likes++;

  await Promise.all([
    kv.put(key, '1'),
    kv.put(statsKey, JSON.stringify(stats))
  ]);

  return { liked: true, likes: stats.likes };
}

export const postLike = await authenticateAction(fn);
