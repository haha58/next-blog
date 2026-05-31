import ColumnList from "../_components/column-list";
import Link from "next/link";

async function ColumnsPage() {
  const columnList = await ColumnList();

  return (
    <div className="max-w-6xl w-full mx-auto py-12">
      <div className="mb-10 flex items-center justify-between border-b border-[#d6e4ff] pb-6 transition-colors duration-300">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">所有专栏</h1>
          <p className="mt-2 text-sm text-[#5b8def]">深入浅出，探索技术的无限可能</p>
        </div>
        <button className="bg-[#1677ff] text-white px-6 py-2 shadow-[0_8px_20px_rgba(22,119,255,0.22)] hover:bg-[#4096ff] hover:-translate-y-0.5 transition">
          <Link href="/columns/create">创建专栏</Link>
        </button>
      </div>

      {columnList}
    </div>
  )
}

export default ColumnsPage;
