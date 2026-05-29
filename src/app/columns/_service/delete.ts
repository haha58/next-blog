import { getCloudflareContext } from '@opennextjs/cloudflare'
import { authenticateAction } from '@/lib/authenticate-action';

const getKV = () => getCloudflareContext().env.MY_NEXT_KV;

// 删除专栏（由 authenticateAction 包装）
async function fn(user_id: string, id: string) {
  const kv = getKV();

  // 我们之前设计的 key 格式是： `column:${col_id}:${timestampSort}`;
  const prefix = `column:${id}:`;

  const result = await kv.list({ prefix, limit: 1 });

  if (result.keys.length === 0) {
    throw new Error('专栏不存在');
  }

  const key = result.keys[0].name;

  await kv.delete(key);

  return { message: '专栏删除成功' };
}

export const deleteColumn = await authenticateAction(fn);