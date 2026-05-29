import { getCloudflareContext } from '@opennextjs/cloudflare'
import { commentKey } from '@/lib/keys';

const getKV = () => getCloudflareContext().env.MY_NEXT_KV;

// 获取某个文章下的评论列表
export async function getCommentsListByArticle(pre_id: string, limit: number = 10, cursor?: string) {
  const kv = getKV();
  const prefix = commentKey.getPrefix(pre_id);
  const comments = await kv.list({ 
    prefix, 
    limit: limit || undefined,
    cursor: cursor || undefined
  });
  
  return comments.keys.map((key) => {
    // let pre_id = key.name.split(':')[2];
    // const countKey = commentCountKey.getKey(pre_id);
    // const count = await kv.get<{ count: number, likes: number }>(countKey, 'json');
    return key.metadata as CommentX;
  });
}