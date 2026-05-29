'use server'

import { incrementStat } from "../_service/increment-stats";
import { revalidatePath } from "next/cache";

export async function likeColumn(id: string) {
  await incrementStat(id, 'likes');
  // 刷新缓存，让页面立即显示最新赞数
  revalidatePath('/columns'); 
  revalidatePath(`/columns/${id}`);
}