import { getCloudflareContext } from '@opennextjs/cloudflare'
import { ulid } from 'ulid';
import { columnKey, columnByUserKey, columnStatsKey } from '@/lib/keys';
import { authenticateAction } from '@/lib/authenticate-action';

const getKV = () => getCloudflareContext().env.MY_NEXT_KV;

// 添加一个新专栏
async function fn(user_id: string, newCol: ColumnMeta) {
  
  const kv = getKV();

  if (!newCol.title) {
    throw new Error('Title is required');
  }
  if (!newCol.tag) {
    throw new Error('Tag is required');
  }
  if (!newCol.desc) {
    throw new Error('Description is required');
  }

  const userinfo: any = await kv.get(`user:${user_id}`, 'json');

  const usermeta = {
    user_id: user_id,
    user_name: userinfo?.name,
    user_avatar: userinfo?.avatar,
  }

  const col_id = ulid();
  // 支持查询所有的专栏
  const key = columnKey.getKey(col_id);
  // 支持查询用户自己的专栏
  const key_user = columnByUserKey.getKey(user_id, col_id);
  const key_stats = columnStatsKey.getKey(col_id);

  const column: Column = {
    id: col_id,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    ...newCol,
    ...usermeta
  }

  return Promise.all([
    kv.put(key, JSON.stringify(column), {
      metadata: column
    }),
    kv.put(key_user, JSON.stringify(column), {
      metadata: column
    }),
    kv.put(key_stats, JSON.stringify({ views: 0, likes: 0 }))
  ])
}

export const addColumn = await authenticateAction(fn);
