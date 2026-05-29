// import { incrementStat } from "@/app/_service/kv";
import { getColumnDetail } from "../_service/query";
import { incrementStat } from "../_service/increment-stats";
import { notFound } from 'next/navigation';
import { likeColumn } from "./_action";
import { ThumbsUp, PlusIcon } from 'lucide-react'
import Link from "next/link";
import { Suspense } from "react";
import ArticleList from "./_components/article-list";

// 这是一个简单的 Server Component
export default async function ColumnDetail({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  if (!id) return notFound();
  
  // 1. 每次进入详情页，自动增加阅读量
  // 注意：为了不阻塞页面渲染，可以不 await 这个操作，或者把它放在 useEffect (客户端) 触发的 API 中
  // 这里演示服务端直接加 (会轻微增加 TTFB)
  await incrementStat(id, 'views');
  
  // 2. 获取最新数据
  const stats = await getColumnDetail(id);

  return (
    <div className="max-w-6xl w-full mx-auto py-12">
      <div className="bg-white px-4 py-20 text-center mb-10">
        <span className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-4 block">
          技术趋势
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold mb-6 text-gray-900">{stats.title}</h1>
        <p className="text-gray-500 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {stats.desc}
        </p>
        <div className='flex gap-5 mt-4 justify-center'>
          <span className="text-xs hidden sm:block text-gray-500">专栏 ID: {id}</span>
          <span className='text-xs text-gray-500'>阅读量: {stats.views}</span>
          <span className='text-xs text-gray-500'>点赞量: {stats.likes}</span>
        </div>
      </div>

      {/* 点赞表单 */}
      <form className='text-center' action={likeColumn.bind(null, id)}>
        <button 
          type="submit"
          className="bg-gray-800 text-white px-6 py-2 hover:bg-gray-900 transition cursor-pointer inline-flex items-center gap-2"
        >
          <ThumbsUp className="w-4 h-4" /> 点赞
        </button>
      </form>

      <div className='my-6 flex items-center justify-between px-2'>
        <h3 className="text-base sm:text-lg font-bold text-gray-900">文章列表</h3>
        <Link 
          href={`/articles/create?columnId=${id}`} 
          className='inline-flex transition cursor-pointer items-center gap-2 text-ms sm:text-base'
        >
          <PlusIcon className="w-4 h-4" /> 新增文章
        </Link>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <ArticleList columnId={id} />
      </Suspense>     
    </div>
  );
}
