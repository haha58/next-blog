'use server';

import { addArticle } from "../_service/create";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function onSubmit(column_id: string, formdata: FormData, html: string) {
  const title = formdata.get("title") as string;
  const meta = {
    column_id,
    title,
    content: html,
  }
  await addArticle(meta);
  redirect(`/columns/${column_id}`);
  revalidatePath(`/columns/${column_id}`);
}