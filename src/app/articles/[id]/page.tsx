import { notFound } from 'next/navigation';
import LikeButton from './_components/like-button';
import CommentServer from './_components/comment-server';
import { getArticleDetail } from '@/app/articles/_service/query';
import { incrementStat } from '../_service/increment-stats';
import './_article.css';

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const article = await getArticleDetail(id);
  await incrementStat(id, 'views');
  if (!article) {
    return notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 bg-white mt-8">
      {/* 文章头部 */}
      <div className="text-center mb-12">
        <div className="text-sm text-gray-500 mb-6 font-medium">
          <span className="text-blue-600">{article.title}</span> / {article.createdAt}
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-8">
          {article.title}
        </h1>
      </div>

      {/* 文章正文 (使用 dangerouslySetInnerHTML 模拟渲染 Markdown 或 CMS 内容) */}
      <article 
        className="prose prose-lg prose-slate max-w-none mb-16 text-gray-800 leading-loose"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* 交互区域 */}
      <div className="">
        <LikeButton isLiked={article.isLiked} articleId={id} />
      </div>

      {/* 评论区 */}
      <CommentServer pre_id={id} user={{user_id: article.user_id, user_name: article.user_name, user_avatar: article.user_avatar}} />
    </div>
  );
}