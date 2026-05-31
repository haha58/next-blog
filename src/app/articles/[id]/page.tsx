import { notFound } from 'next/navigation';
import Link from 'next/link';
import { headers } from 'next/headers';
import { ArrowLeftIcon, PencilIcon } from 'lucide-react';
import LikeButton from './_components/like-button';
import CommentServer from './_components/comment-server';
import DeleteSubmitButton from '@/app/_components/delete-submit-button';
import { getArticleDetail } from '@/app/articles/_service/query';
import { deleteArticleAction } from '@/app/articles/_action/delete';
import { incrementStat } from '../_service/increment-stats';
import { getCurrentUser } from '@/lib/current-user';
import './_article.css';

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const article = await getArticleDetail(id);
  if (!article) {
    return notFound();
  }

  const currentUser = await getCurrentUser();
  const shouldTrackView = await shouldTrackArticleView(article, currentUser?.id);
  const viewStats = shouldTrackView ? await incrementStat(id, 'views') : article;
  const displayArticle = { ...article, views: viewStats.views, likes: viewStats.likes };
  const canEdit = currentUser?.id === displayArticle.user_id;
  const deleteAction = deleteArticleAction.bind(null, id);
  const commentSection = await CommentServer({
    pre_id: id,
    user: {
      user_id: displayArticle.user_id,
      user_name: displayArticle.user_name,
      user_avatar: displayArticle.user_avatar,
    },
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 bg-white mt-8">
      <div className="mb-10 flex items-center justify-between gap-4">
        <Link
          href={`/columns/${displayArticle.column_id}`}
          className="inline-flex items-center gap-2 text-sm text-[#0958d9] transition hover:text-[#1677ff]"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          返回专栏
        </Link>
        {canEdit && (
          <div className="flex items-center gap-4">
            <Link
              href={`/articles/${id}/edit`}
              className="inline-flex items-center gap-2 text-sm text-[#0958d9] transition hover:text-[#1677ff]"
            >
              <PencilIcon className="w-4 h-4" />
              编辑文章
            </Link>
            <form action={deleteAction}>
              <DeleteSubmitButton label="删除文章" confirmMessage="确定要删除这篇文章吗？" />
            </form>
          </div>
        )}
      </div>
      {/* 文章头部 */}
      <div className="text-center mb-12">
        <div className="text-sm text-[#5b8def] mb-6 font-medium">
          <span className="text-[#1677ff]">{displayArticle.title}</span> / {displayArticle.createdAt}
          <span className="mx-2">/</span>
          <span>{displayArticle.views} 阅读</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-8">
          {displayArticle.title}
        </h1>
      </div>

      {/* 文章正文 (使用 dangerouslySetInnerHTML 模拟渲染 Markdown 或 CMS 内容) */}
      <article 
        className="prose prose-lg prose-slate max-w-none mb-16 text-slate-800 leading-loose"
        dangerouslySetInnerHTML={{ __html: displayArticle.content }}
      />

      {/* 交互区域 */}
      <div className="">
        <LikeButton isLiked={displayArticle.isLiked} articleId={id} initialLikes={displayArticle.likes} />
      </div>

      {/* 评论区 */}
      {commentSection}
    </div>
  );
}

async function shouldTrackArticleView(article: ArticleFull, currentUserId?: string) {
  const isAuthor = currentUserId === article.user_id;

  if (!isAuthor) return true;

  const referer = (await headers()).get('referer');
  if (!referer) return false;

  try {
    const refererUrl = new URL(referer);
    return refererUrl.pathname === `/columns/${article.column_id}`;
  } catch {
    return false;
  }
}
