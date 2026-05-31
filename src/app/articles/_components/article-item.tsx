import Link from 'next/link';

export default function ArticleItem({ article }: { article: ArticleFull }) {
  return (
    <Link href={`/articles/${article.id}`}>
      <div className="bg-white p-6 flex justify-between items-center border border-[#d6e4ff] hover:border-[#91caff] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(22,119,255,0.10)] transition-all duration-200 group cursor-pointer">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-slate-900 group-hover:text-[#1677ff] transition-colors">
            {article.title}
          </h3>
          <p className="text-sm text-slate-500">
            发布于 {article.createdAt} · {article.views || 20} 阅读
          </p>
        </div>
        <div className="text-[#1677ff] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          →
        </div>
      </div>
    </Link>
  );
}
