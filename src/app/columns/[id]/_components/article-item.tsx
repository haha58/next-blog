import Link from 'next/link';
import DeleteSubmitButton from '@/app/_components/delete-submit-button';
import { deleteArticleAction } from '@/app/articles/_action/delete';

export default function ArticleItem({
  article,
  canDelete = false,
}: {
  article: ArticleFull;
  canDelete?: boolean;
}) {
  const deleteAction = deleteArticleAction.bind(null, article.id);

  return (
    <div className="bg-white p-6 flex justify-between items-center gap-4 border border-[#d6e4ff] hover:border-[#91caff] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(22,119,255,0.10)] transition-all duration-200 group">
      <Link href={`/articles/${article.id}`} className="min-w-0 flex-1">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-slate-900 group-hover:text-[#1677ff] transition-colors">
            {article.title}
          </h3>
          <p className="text-sm text-slate-500">
            发布于 {article.createdAt} · {article.views || 0} 阅读
          </p>
        </div>
      </Link>
      <div className="flex items-center gap-4">
        {canDelete && (
          <form action={deleteAction}>
            <DeleteSubmitButton label="删除" confirmMessage="确定要删除这篇文章吗？" compact />
          </form>
        )}
        <div className="text-[#1677ff] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          →
        </div>
      </div>
    </div>
  );
}
