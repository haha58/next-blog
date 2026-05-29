import { getCloudflareContext } from '@opennextjs/cloudflare'
import { articleKey, articleLikeKey, articleStatsKey } from '@/lib/keys';
import { cookies } from 'next/headers';

const getKV = () => getCloudflareContext().env.MY_NEXT_KV;

// 获取专栏详情
export async function getArticleDetail(id: string) {
  const kv = getKV();

  const key = articleKey.getKey(id);
  let result = await kv.get<Article>(key, 'json');

  if (!result) {
    throw new Error('文章不存在');
  }

  const statsKey = articleStatsKey.getKey(id);
  const stats = await kv.get<ArticleStats>(statsKey, 'json');

  let isLiked = false;

  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session_id')?.value;
    
  if (sessionId) {
    const sessionData = await kv.get<{userId: string}>(`session:${sessionId}`, 'json');

    if (sessionData && sessionData.userId) {
      let user_id = sessionData.userId;
      const likeKey = articleLikeKey.getKey(user_id, id);
      const like = await kv.get(likeKey);
      console.log('hello like', like)
      if (like) {
        isLiked = true;
      }
    }    
  }

  return { ...result, ...stats, isLiked };
}