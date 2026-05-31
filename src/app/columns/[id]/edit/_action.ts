'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateColumn } from "../../_service/update";

export async function onSubmit(columnId: string, formData: FormData) {
  const title = formData.get("title") as string;
  const tag = formData.get("tag") as string;
  const desc = formData.get("desc") as string;

  const result = await updateColumn({
    id: columnId,
    title,
    tag,
    desc,
  });

  if (!result.success || !result.data) {
    throw new Error(result.message || 'Update column failed');
  }

  revalidatePath('/');
  revalidatePath('/columns');
  revalidatePath('/mycolumns');
  revalidatePath(`/columns/${columnId}`);
  redirect(`/columns/${columnId}`);
}
