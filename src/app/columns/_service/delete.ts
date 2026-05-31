import { getCloudflareContext } from '@opennextjs/cloudflare';
import { authenticateAction } from '@/lib/authenticate-action';
import {
  articleByColumnKey,
  articleByUserKey,
  articleKey,
  articleStatsKey,
  columnByUserKey,
  columnKey,
  columnStatsKey,
  commentCountKey,
  commentKey,
} from '@/lib/keys';

const getKV = () => getCloudflareContext().env.MY_NEXT_KV;

async function deleteArticleRecord(article: Article) {
  const kv = getKV();
  const comments = await kv.list({ prefix: commentKey.getPrefix(article.id) });

  await Promise.all([
    kv.delete(articleKey.getKey(article.id)),
    kv.delete(articleByColumnKey.getKey(article.column_id, article.id)),
    kv.delete(articleByUserKey.getKey(article.user_id, article.id)),
    kv.delete(articleStatsKey.getKey(article.id)),
    kv.delete(commentCountKey.getKey(article.id)),
    ...comments.keys.map((key) => kv.delete(key.name)),
  ]);
}

async function fn(userId: string, columnId: string) {
  const kv = getKV();
  const key = columnKey.getKey(columnId);
  const column = await kv.get<Column>(key, 'json');

  if (!column) {
    throw new Error('Column not found');
  }

  if (column.user_id !== userId) {
    throw new Error('Forbidden');
  }

  const articles = await kv.list({ prefix: articleByColumnKey.getPrefix(columnId) });
  const articleRecords = await Promise.all(
    articles.keys.map((articleKeyItem) => kv.get<Article>(articleKeyItem.name, 'json'))
  );

  await Promise.all([
    ...articleRecords.filter((article): article is Article => Boolean(article)).map(deleteArticleRecord),
    kv.delete(key),
    kv.delete(columnByUserKey.getKey(column.user_id, columnId)),
    kv.delete(columnStatsKey.getKey(columnId)),
  ]);

  return column;
}

export const removeColumn = await authenticateAction(fn);
