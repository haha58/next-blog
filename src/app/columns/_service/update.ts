import { getCloudflareContext } from '@opennextjs/cloudflare'
import { columnByUserKey, columnKey } from '@/lib/keys';
import { authenticateAction } from '@/lib/authenticate-action';

const getKV = () => getCloudflareContext().env.MY_NEXT_KV;

interface UpdateColumnInput extends ColumnMeta {
  id: string;
}

async function fn(user_id: string, input: UpdateColumnInput) {
  const kv = getKV();
  const { id, title, tag, desc } = input;

  if (!id) {
    throw new Error('Column ID is required');
  }
  if (!title) {
    throw new Error('Title is required');
  }
  if (!tag) {
    throw new Error('Tag is required');
  }
  if (!desc) {
    throw new Error('Description is required');
  }

  const key = columnKey.getKey(id);
  const current = await kv.get<Column>(key, 'json');

  if (!current) {
    throw new Error('Column not found');
  }
  if (current.user_id !== user_id) {
    throw new Error('Forbidden');
  }

  const column: Column = {
    ...current,
    title,
    tag,
    desc,
    updatedAt: Date.now(),
  };

  await Promise.all([
    kv.put(key, JSON.stringify(column), { metadata: column }),
    kv.put(columnByUserKey.getKey(user_id, id), JSON.stringify(column), { metadata: column }),
  ]);

  return column;
}

export const updateColumn = await authenticateAction(fn);
