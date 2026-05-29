'use server';

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { articleLikeKey, articleStatsKey } from '@/lib/keys';
import { authenticateAction } from '@/lib/authenticate-action';

const getKV = () => getCloudflareContext().env.MY_NEXT_KV;

async function fn(user_id: string, article_id: string) {
  const kv = getKV();
  const key = articleLikeKey.getKey(user_id, article_id);
  const statsKey = articleStatsKey.getKey(article_id);

  const _stats = await kv.get<ArticleStats>(statsKey,'json');
  let stats = _stats || { views: 0, likes: 0 };

  stats.likes++;

  console.log('post like', stats);

  return Promise.all([
    kv.put(key, '1'),
    kv.put(statsKey, JSON.stringify(stats))
  ]);
}

export const postLike = await authenticateAction(fn);