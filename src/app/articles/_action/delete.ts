'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { removeArticle } from '../_service/delete';

export async function deleteArticleAction(articleId: string) {
  const result = await removeArticle(articleId);

  if (!result.success || !result.data) {
    throw new Error(result.message || 'Delete article failed');
  }

  revalidatePath('/');
  revalidatePath('/columns');
  revalidatePath(`/columns/${result.data.column_id}`);
  revalidatePath(`/articles/${articleId}`);

  redirect(`/columns/${result.data.column_id}`);
}
