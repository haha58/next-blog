import { getArticlesListByColumn } from "@/app/articles/_service/query-columns";
import ArticleItem from "./article-item";

// 这是一个简单的 Server Component
export default async function ColumnDetail({ columnId }: { columnId: string }) {
  const articles = await getArticlesListByColumn(columnId);

  if (articles.length === 0) {
    return <div className="text-gray-400 text-center py-10">暂无文章发布</div>;
  }

  return (  
    <div className="flex flex-col gap-4">
      {articles.map(article => (
        <ArticleItem key={article.id} article={article} />
      ))}
    </div>
  );
}
