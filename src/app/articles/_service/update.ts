import { getCloudflareContext } from '@opennextjs/cloudflare'
import { articleByColumnKey, articleByUserKey, articleKey } from '@/lib/keys';
import { authenticateAction } from '@/lib/authenticate-action';

const getKV = () => getCloudflareContext().env.MY_NEXT_KV;

interface UpdateArticleInput {
  id: string;
  title: string;
  content: string;
}

async function fn(user_id: string, input: UpdateArticleInput) {
  const kv = getKV();
  const { id, title, content } = input;

  if (!id) {
    throw new Error('Article ID is required');
  }
  if (!title) {
    throw new Error('Title is required');
  }
  if (!content) {
    throw new Error('Content is required');
  }

  const key = articleKey.getKey(id);
  const current = await kv.get<Article>(key, 'json');

  if (!current) {
    throw new Error('Article not found');
  }
  if (current.user_id !== user_id) {
    throw new Error('Forbidden');
  }

  const article: Article = {
    ...current,
    title,
    content,
    updatedAt: Date.now(),
  };
  const metadata = {
    id: article.id,
    column_id: article.column_id,
    title: article.title,
    user_id: article.user_id,
    user_name: article.user_name,
    user_avatar: article.user_avatar,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
    isLiked: article.isLiked,
  };

  await Promise.all([
    kv.put(key, JSON.stringify(article), { metadata }),
    kv.put(articleByColumnKey.getKey(article.column_id, id), JSON.stringify(article), { metadata }),
    kv.put(articleByUserKey.getKey(user_id, id), JSON.stringify(article), { metadata }),
  ]);

  return article;
}

export const updateArticle = await authenticateAction(fn);
