import ColumnCard from "@/app/_components/column-card";
import { getColumnsList } from "@/app/columns/_service/query-list";
import { getCurrentUser } from "@/lib/current-user";

export default async function ColumnList() {
  const columns = await getColumnsList(3);
  const currentUser = await getCurrentUser();

  if (columns.length === 0) {
    return <div className="text-[#5b8def] text-center py-10">暂无专栏</div>;
  }

  return (
    <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
      {columns.map((item) => (
        <ColumnCard key={item.id} item={item} canDelete={currentUser?.id === item.user_id} />
      ))}
    </div>
  );
}
