import React from "react";
import Link from "next/link";
import DeleteSubmitButton from "@/app/_components/delete-submit-button";
import { deleteColumnAction } from "@/app/columns/_action/delete";

// 3. 单个卡片组件
function ColumnCard({
  item,
  canDelete = false,
  deleteRedirectPath = '/',
}: {
  item: ColumnFull;
  canDelete?: boolean;
  deleteRedirectPath?: string;
}) {
  const deleteAction = deleteColumnAction.bind(null, item.id, deleteRedirectPath);

  return (
    <div className="bg-white p-8 border border-[#d6e4ff] h-full flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 hover:border-[#91caff] hover:shadow-[0_12px_30px_rgba(22,119,255,0.12)]">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="inline-flex rounded bg-[#e6f4ff] px-2 py-1 text-xs font-bold text-[#0958d9] uppercase mb-4 tracking-wide">
            {item.tag}
          </div>
          {canDelete && (
            <form action={deleteAction}>
              <DeleteSubmitButton label="删除" confirmMessage="确定要删除这个专栏吗？专栏下的文章也会一起删除。" compact />
            </form>
          )}
        </div>
        <Link href={`/columns/${item.id}`} className="group block">
          <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-[#1677ff] transition-colors">
            {item.title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
            {item.desc}
          </p>
        </Link>
      </div>
      <div className="text-xs text-slate-400 flex gap-2 font-medium">
        <img src={item.user_avatar} alt={item.user_name} className="w-4 h-4 rounded-full" />
        <span>{item.user_name} 发布</span>
        <span>{item.views} 阅读</span>
        <span>{item.likes} 点赞</span>
      </div>
    </div>
  );
}

export default ColumnCard;
