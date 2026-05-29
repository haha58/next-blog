import { getCloudflareContext } from '@opennextjs/cloudflare'
import { ulid } from 'ulid';
import { articleKey, articleByColumnKey, articleStatsKey, articleByUserKey } from '@/lib/keys';
import { authenticateAction } from '@/lib/authenticate-action';

const getKV = () => getCloudflareContext().env.MY_NEXT_KV;

// 添加一个新专栏
async function fn(user_id: string, meta: ArticleMeta) {
  
  const kv = getKV();
  const { column_id, title, content } = meta;

  if (!title) {
    throw new Error('Title is required');
  }
  if (!content) {
    throw new Error('Content is required');
  }

  if (!column_id) {
    throw new Error('Column ID is required');
  }

  const userinfo: any = await kv.get(`user:${user_id}`, 'json');

  const usermeta = {
    user_id: user_id,
    user_name: userinfo?.name,
    user_avatar: userinfo?.avatar,
  }

  const article_id = ulid();
  // 支持查询所有的专栏
  const key = articleKey.getKey(article_id);
  // 支持查询用户自己的专栏
  const key_user = articleByUserKey.getKey(user_id, article_id);
  // 支持查询文章所属专栏
  const key_column = articleByColumnKey.getKey(column_id, article_id);
  // 支持查询文章统计
  const key_stats = articleStatsKey.getKey(article_id);

  const article: Article = {
    id: article_id,
    isLiked: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    ...meta,
    ...usermeta
  }
  const { content: _, ...article_meta} = article;

  return Promise.all([
    kv.put(key, JSON.stringify(article), {
      metadata: article_meta
    }),
    kv.put(key_user, JSON.stringify(article), {
      metadata: article_meta
    }),
    kv.put(key_column, JSON.stringify(article), {
      metadata: article_meta
    }),
    kv.put(key_stats, JSON.stringify({ views: 0, likes: 0 }))
  ])
}

export const addArticle = await authenticateAction(fn);
