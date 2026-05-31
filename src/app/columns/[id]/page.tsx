// import { incrementStat } from "@/app/_service/kv";
import { getColumns as getColumnDetail } from "../_service/query";
import { incrementStat } from "../_service/increment-stats";
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { ArrowLeftIcon, PencilIcon, PlusIcon } from 'lucide-react'
import Link from "next/link";
import ArticleList from "./_components/article-list";
import ColumnLikeButton from "./_components/column-like-button";
import { getCurrentUser } from "@/lib/current-user";
import DeleteSubmitButton from "@/app/_components/delete-submit-button";
import { deleteColumnAction } from "@/app/columns/_action/delete";

// 这是一个简单的 Server Component
export default async function ColumnDetail({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  if (!id) return notFound();
  
  const column = await getColumnDetail(id);
  const currentUser = await getCurrentUser();
  const shouldTrackView = await shouldTrackColumnView(column, currentUser?.id);
  const viewStats = shouldTrackView ? await incrementStat(id, 'views') : column;
  const stats = { ...column, views: viewStats.views, likes: viewStats.likes };
  const canEdit = currentUser?.id === stats.user_id;
  const articleList = await ArticleList({ columnId: id, currentUserId: currentUser?.id });
  const deleteAction = deleteColumnAction.bind(null, id, '/');

  return (
    <div className="max-w-6xl w-full mx-auto py-12">
      <div className="mb-8 flex items-center justify-between gap-4 px-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#0958d9] transition hover:text-[#1677ff]"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          返回首页
        </Link>
        {canEdit && (
          <div className="flex items-center gap-4">
            <Link
              href={`/columns/${id}/edit`}
              className="inline-flex items-center gap-2 text-sm text-[#0958d9] transition hover:text-[#1677ff]"
            >
              <PencilIcon className="w-4 h-4" />
              编辑专栏
            </Link>
            <form action={deleteAction}>
              <DeleteSubmitButton label="删除专栏" confirmMessage="确定要删除这个专栏吗？专栏下的文章也会一起删除。" />
            </form>
          </div>
        )}
      </div>

      <div className="bg-white px-4 py-20 text-center mb-10 border border-[#d6e4ff] shadow-[0_12px_30px_rgba(22,119,255,0.08)]">
        <span className="text-[#1677ff] font-bold tracking-wide uppercase text-sm mb-4 block">
          技术趋势
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold mb-6 text-slate-900">{stats.title}</h1>
        <p className="text-slate-500 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {stats.desc}
        </p>
        <div className='flex gap-5 mt-4 justify-center'>
          <span className="text-xs hidden sm:block text-slate-500">专栏 ID: {id}</span>
          <span className='text-xs text-[#5b8def]'>阅读量: {stats.views}</span>
          <span className='text-xs text-[#5b8def]'>点赞量: {stats.likes}</span>
        </div>
      </div>

      {/* 点赞表单 */}
      <div className='text-center'>
        <ColumnLikeButton columnId={id} initialLikes={stats.likes} initialLiked={Boolean(stats.isLiked)} />
      </div>

      <div className='my-6 flex items-center justify-between px-2'>
        <h3 className="text-base sm:text-lg font-bold text-slate-900">文章列表</h3>
        <Link 
          href={`/articles/create?columnId=${id}`} 
          className='inline-flex transition cursor-pointer items-center gap-2 text-ms sm:text-base text-[#0958d9] hover:text-[#1677ff]'
        >
          <PlusIcon className="w-4 h-4" /> 新增文章
        </Link>
      </div>

      {articleList}
    </div>
  );
}

async function shouldTrackColumnView(column: ColumnFull, currentUserId?: string) {
  const referer = (await headers()).get('referer');
  const isOwner = currentUserId === column.user_id;

  if (!referer) return !isOwner;

  try {
    const refererUrl = new URL(referer);

    if (refererUrl.pathname.startsWith('/articles/')) {
      return false;
    }

    if (isOwner) {
      return refererUrl.pathname === '/' || refererUrl.pathname === '/columns';
    }

    return true;
  } catch {
    return !isOwner;
  }
}
