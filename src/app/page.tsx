import ColumnList from "@/app/_components/column-list";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

// 4. 页面主体
export default async function Home() {
  const columnList = await ColumnList();

  return (
    <main className="min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <section className="text-center mb-20 fade-in-up pt-8 md:pt-20">
        <h1 className="text-3xl md:text-5xl font-bold mb-10 bg-clip-text text-transparent bg-linear-to-br from-[#0958d9] via-[#1677ff] to-[#69b1ff]">
          探索思维的边界<br />构建认知的深度
        </h1>
        <p className="text-sm md:text-lg text-slate-500 max-w-2xl mx-auto mb-10">
          汇聚科技、设计与人文的高质量深度专栏。在这里，每一次阅读都是一次认知的升级。深入浅出，探索无限可能
        </p>
      </section>

      {/* Header */}
      <div className="max-w-6xl w-full mb-10 flex items-center justify-between border-b border-[#d6e4ff] pb-6 transition-colors duration-300">
        <div>
          <h1 className="text-xl md:text-3xl font-bold tracking-tight text-slate-900">热门专栏</h1>
          <p className="mt-2 text-xs md:text-sm text-[#5b8def]">深入浅出，探索技术的无限可能</p>
        </div>
        <Link href="/columns" className='inline-flex items-center gap-2 rounded border border-[#91caff] bg-[#e6f4ff] px-3 py-2 text-[#0958d9] hover:border-[#1677ff] hover:text-[#1677ff] transition text-xs md:text-sm'>
          查看所有专栏
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>

      {columnList}
    </main>
  );
}
