import { getCloudflareContext } from '@opennextjs/cloudflare';
import { authenticateAction } from '@/lib/authenticate-action';
import {
  articleByColumnKey,
  articleByUserKey,
  articleKey,
  articleStatsKey,
  commentCountKey,
  commentKey,
} from '@/lib/keys';

const getKV = () => getCloudflareContext().env.MY_NEXT_KV;

async function deleteComments(preId: string) {
  const kv = getKV();
  const comments = await kv.list({ prefix: commentKey.getPrefix(preId) });

  await Promise.all([
    ...comments.keys.map((key) => kv.delete(key.name)),
    kv.delete(commentCountKey.getKey(preId)),
  ]);
}

async function fn(userId: string, articleId: string) {
  const kv = getKV();
  const key = articleKey.getKey(articleId);
  const article = await kv.get<Article>(key, 'json');

  if (!article) {
    throw new Error('Article not found');
  }

  if (article.user_id !== userId) {
    throw new Error('Forbidden');
  }

  await Promise.all([
    kv.delete(key),
    kv.delete(articleByColumnKey.getKey(article.column_id, articleId)),
    kv.delete(articleByUserKey.getKey(article.user_id, articleId)),
    kv.delete(articleStatsKey.getKey(articleId)),
    deleteComments(articleId),
  ]);

  return article;
}

export const removeArticle = await authenticateAction(fn);
