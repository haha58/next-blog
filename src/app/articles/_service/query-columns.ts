import { getCloudflareContext } from '@opennextjs/cloudflare'
import { articleByColumnKey, articleStatsKey } from '@/lib/keys';

const getKV = () => getCloudflareContext().env.MY_NEXT_KV;

// 获取某个专栏下的文章列表
export async function getArticlesListByColumn(column_id: string, limit?: number) {
  const kv = getKV();
  const prefix = articleByColumnKey.getPrefix(column_id);
  const articles = await kv.list({ prefix, limit: limit || undefined });
  
  const statePromises = articles.keys.map(async (key) => {
    let article_id = key.name.split(':')[2];
    const statsKey = articleStatsKey.getKey(article_id);
    const stats = await kv.get<ArticleStats>(statsKey, 'json');
    return { ...(key.metadata as Article), ...stats } as ArticleFull;
  });

  return Promise.all(statePromises);
}