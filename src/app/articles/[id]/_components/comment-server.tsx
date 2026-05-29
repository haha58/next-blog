import { getCommentsListByArticle } from '@/app/articles/_service/query-comment';
import CommentSection from './comment-section';
import { Suspense } from 'react';

// 在服务端初始化
export default async function CommentServer({ pre_id, user }: { pre_id: string, user: Profile }) {
  const comments = await getCommentsListByArticle(pre_id, 10);
  console.log('comments server', comments);
  return (
    <Suspense fallback={<div className='text-center text-gray-500 my-4'>Loading...</div>}>
      <CommentSection comments={comments} pre_id={pre_id} user={user} />
    </Suspense>
  );
}