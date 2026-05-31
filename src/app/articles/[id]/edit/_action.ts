'use server';

import { updateArticle } from "../../_service/update";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function onSubmit(articleId: string, formdata: FormData, html: string) {
  const title = formdata.get("title") as string;

  const result = await updateArticle({
    id: articleId,
    title,
    content: html,
  });

  if (!result.success || !result.data) {
    throw new Error(result.message || 'Update article failed');
  }

  revalidatePath(`/articles/${articleId}`);
  revalidatePath(`/columns/${result.data.column_id}`);
  redirect(`/articles/${articleId}`);
}
