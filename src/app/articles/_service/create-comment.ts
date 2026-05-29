'use server';

import { getCloudflareContext } from '@opennextjs/cloudflare'
import { ulid } from 'ulid';
import { commentKey, commentCountKey } from '@/lib/keys';
import { authenticateAction } from '@/lib/authenticate-action';

const getKV = () => getCloudflareContext().env.MY_NEXT_KV;

// 添加一个新专栏
async function fn(user_id: string, meta: CommentMeta) {
  
  const kv = getKV();
  const { pre_id, content } = meta;

  if (!pre_id) {
    throw new Error('Pre ID is required');
  }
  if (!content) {
    throw new Error('Content is required');
  }

  const userinfo: any = await kv.get(`user:${user_id}`, 'json');

  const usermeta = {
    user_id: user_id,
    user_name: userinfo?.name,
    user_avatar: userinfo?.avatar,
  }

  const comment_id = ulid();
  // 支持查询当前评论
  const key = commentKey.getKey(pre_id, comment_id);
  // 支持查询当前评论的回复数量
  const key_count = commentCountKey.getKey(pre_id);
  
  const comment: CommentX = {
    id: comment_id,
    isLiked: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    ...meta,
    ...usermeta
  }

  return Promise.all([
    kv.put(key, JSON.stringify(comment), {
      metadata: comment
    }),
    kv.put(key_count, JSON.stringify({ count: 0, likes: 0 }))
  ])
}

export const addComment = await authenticateAction(fn);
