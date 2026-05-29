import ColumnCard from "@/app/_components/column-card";
import { getColumnsListByUser } from "@/app/mycolumns/_service/query-list";

export default async function ColumnList() {
  const columns = await getColumnsListByUser();

  if (columns.length === 0) {
    return <div className="text-gray-400 text-center py-10">暂无专栏</div>;
  }

  return (
    <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
      {columns.map((item) => (
        <ColumnCard key={item.id} item={item} />
      ))}
    </div>
  );
}