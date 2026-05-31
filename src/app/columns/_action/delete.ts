'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { removeColumn } from '../_service/delete';

export async function deleteColumnAction(columnId: string, redirectTo = '/') {
  const result = await removeColumn(columnId);

  if (!result.success || !result.data) {
    throw new Error(result.message || 'Delete column failed');
  }

  revalidatePath('/');
  revalidatePath('/columns');
  revalidatePath('/mycolumns');
  revalidatePath(`/columns/${columnId}`);

  redirect(redirectTo);
}
