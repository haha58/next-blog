import CreateArticleForm from "./_components/create";

export default async function CreateColumnForm({ searchParams }: { searchParams: Promise<{ columnId: string }> }) {
  const params = await searchParams;
  const columnId = params.columnId;

  return (
    // 外层容器：负责背景和居中
    <div className="max-w-6xl w-full mx-auto py-4">
      {/* 卡片容器 */}
      <div className="p-4 bg-white">
        <div className="relative bg-white/70 backdrop-blur-lg border border-white/50 p-8 md:p-10">
          {/* Form */}
          <CreateArticleForm column_id={columnId} />
        </div>

        <p className="text-center text-slate-400 text-xs mt-8 font-medium opacity-60">
          &copy; {new Date().getFullYear()} Design System. All rights reserved.
        </p>
      </div>
    </div>
  );
}