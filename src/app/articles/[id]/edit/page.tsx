import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { getArticleDetail } from "@/app/articles/_service/query";
import { getCurrentUser } from "@/lib/current-user";
import EditArticleForm from "./_components/edit";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) return notFound();

  const article = await getArticleDetail(id);

  if (!article) return notFound();

  const currentUser = await getCurrentUser();

  if (currentUser?.id !== article.user_id) return notFound();

  return (
    <div className="max-w-6xl w-full mx-auto py-4">
      <div className="p-4 bg-white border border-[#d6e4ff] shadow-[0_12px_30px_rgba(22,119,255,0.08)]">
        <Link
          href={`/articles/${id}`}
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#0958d9] transition hover:text-[#1677ff]"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          返回文章
        </Link>

        <div className="relative bg-white/80 backdrop-blur-lg border border-[#d6e4ff] p-8 md:p-10">
          <EditArticleForm article={article} />
        </div>
      </div>
    </div>
  );
}
