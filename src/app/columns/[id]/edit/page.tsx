import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { getColumns as getColumnDetail } from "../../_service/query";
import { getCurrentUser } from "@/lib/current-user";
import EditColumnForm from "./_components/edit";

export default async function EditColumnPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) return notFound();

  const column = await getColumnDetail(id);

  if (!column) return notFound();

  const currentUser = await getCurrentUser();

  if (currentUser?.id !== column.user_id) return notFound();

  return (
    <div className="max-w-3xl w-full mx-auto py-12 px-4">
      <Link
        href={`/columns/${id}`}
        className="mb-8 inline-flex items-center gap-2 text-sm text-[#0958d9] transition hover:text-[#1677ff]"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        返回专栏
      </Link>

      <div className="bg-white p-8 md:p-10 border border-[#d6e4ff] shadow-[0_12px_30px_rgba(22,119,255,0.08)]">
        <EditColumnForm column={column} />
      </div>
    </div>
  );
}
