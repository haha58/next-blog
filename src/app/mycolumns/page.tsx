import ColumnList from "./_components/column-list";
import Link from "next/link";
import { Suspense } from "react";

async function ColumnsPage() {
  return (
    <div className="max-w-6xl w-full mx-auto py-12">
      <div className="mb-10 flex items-center justify-between border-b border-gray-200 pb-6 transition-colors duration-300">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">我的专栏</h1>
          <p className="mt-2 text-sm text-slate-500">深入浅出，探索技术的无限可能</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 hover:bg-blue-700 transition">
          <Link href="/columns/create">创建专栏</Link>
        </button>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <ColumnList />
      </Suspense>
    </div>
  )
}

export default ColumnsPage;