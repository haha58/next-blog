import Link from 'next/link';

export default function ArticleItem({ article }: { article: ArticleFull }) {
  console.log(article)
  return (
    <Link href={`/articles/${article.id}`}>
      <div className="bg-white p-6 flex justify-between items-center hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer">
        <div>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
            {article.title}
          </h3>
          <p className="text-sm text-gray-500">
            发布于 {article.createdAt} · {article.views || 0} 阅读
          </p>
        </div>
        <div className="text-blue-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          →
        </div>
      </div>
    </Link>
  );
}