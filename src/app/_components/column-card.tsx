import React from "react";
import Link from "next/link";

// 3. 单个卡片组件
function ColumnCard({ item }: { item: ColumnFull }) {
  return (
    <Link href={`/columns/${item.id}`} className="block h-full">
      <div className="bg-white p-8 border border-gray-100 h-full flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl cursor-pointer">
        <div>
          <div className="text-xs font-bold text-blue-600 uppercase mb-4 tracking-wide">{item.tag}</div>
          <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
            {item.title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
            {item.desc}
          </p>
        </div>
        <div className="text-xs text-gray-400 flex gap-2 font-medium">
          <img src={item.user_avatar} alt={item.user_name} className="w-4 h-4 rounded-full" />
          <span>{item.user_name} 发布</span>
          <span>{item.views} 阅读</span>
          <span>{item.likes} 点赞</span>
        </div>
      </div>
    </Link>
  );
}

export default ColumnCard;