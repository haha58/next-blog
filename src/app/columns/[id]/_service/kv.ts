import { getCloudflareContext } from '@opennextjs/cloudflare'
import { nanoid } from 'nanoid';

export interface ColumnMeta {
  id: string;
  title: string;
  desc: string;
}

export interface ColumnStats {
  views: number;
  likes: number;
}

export interface CommentMeta {
  id: string;
  content: string;
  createdAt: number;
}

/**
 * 
 * @param articleId 
 * @param comment 
 * @returns {Promise<{success: boolean, data: CommentMeta, key: string}>}
 */

// export async function addComment(articleId: string, comment: CommentMeta) {
//   // 1. 获取环境变量
//   const { env } = await getCloudflareContext({async: true});
//   const kv = env.MY_NEXT_KV;

//   // 2. 基础校验
//   if (!articleId) {
//     throw new Error('Column ID is required');
//   }
//   if (!article.title) {
//     throw new Error('Article title is required');
//   }
//   if (!article.content) {
//     throw new Error('Article content is required');
//   }

//   // 3. 生成唯一ID 和 key
//   const uid = nanoid();
//   const now = Date.now();

//   // 4. 定义 2 个 key，一个用于存储文章详情，一个用于存储与专栏的关联
//   const articleKey = `article:${uid}`;

//     // Key B: 索引数据 (依赖 columnId，用于 List)
//   // 格式推荐: idx:col:{columnId}:{倒序时间戳}:{uid}
//   // 使用 "9999999999999 - now" 可以实现 list 时按最新发布排序
//   const timestampSort = 9999999999999 - now; 
//   const key = `col:article:${columnId}:${timestampSort}:${uid}`;

//   // 4. 构建完整文章对象
//   const fullArticle: ArticleFull = {
//     ...article,
//     id: uid,
//     columnId,
//     createdAt: now,
//     updatedAt: now
//   }

//   const listMetadata = {
//     id: uid,
//     columnId,
//     createdAt: now,
//     updatedAt: now,
//     title: article.title,
//   }

//   try {
//     await Promise.all([
//       kv.put(key, JSON.stringify(listMetadata), {
//         metadata: listMetadata
//       }),
//       kv.put(articleKey, JSON.stringify(fullArticle))
//     ])

//     return {
//       success: true,
//       data: fullArticle,
//       key: key
//     }
//   } catch (error) {
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : 'Unknown error',
//       key: key
//     }
//   }
// }

// // 获取指定专栏下的所有文章
// export async function getArticlesByColumnId(columnId: string) {
//   const { env } = await getCloudflareContext({async: true});
//   const kv = env.MY_NEXT_KV;
  
//   // 构建前缀 key
//   const key = `col:article:${columnId}`;
//   const articles = await kv.list({ prefix: key });
//   return articles.keys.map(key => key.metadata as ArticleFull);
// }

// // 获取指定文章的详细信息
// export async function getArticleById(id: string) {
//   const { env } = await getCloudflareContext({async: true});
//   const kv = env.MY_NEXT_KV;
  
//   const articleKey = `article:${id}`;
//   const article = await kv.get(articleKey);
//   return article ? JSON.parse(article) as ArticleFull : null;
// }