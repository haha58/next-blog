'use client';

import { onSubmit } from "../_action";

export default function EditColumnForm({ column }: { column: ColumnFull }) {
  function formAction(formData: FormData) {
    return onSubmit(column.id, formData);
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">编辑专栏</h1>
        <button
          type="submit"
          className="bg-[#1677ff] px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(22,119,255,0.22)] transition hover:-translate-y-0.5 hover:bg-[#4096ff]"
        >
          保存修改
        </button>
      </div>

      <div className="space-y-2 group">
        <label htmlFor="title" className="block text-sm font-semibold text-slate-700 ml-1 transition-colors group-focus-within:text-[#1677ff]">专栏名称</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          defaultValue={column.title}
          className="block w-full px-4 py-3.5 text-slate-700 bg-white/70 border border-[#d6e4ff] focus:ring-4 focus:ring-[#1677ff]/10 focus:border-[#1677ff] outline-none transition-all duration-300 placeholder-slate-400 disabled:opacity-50"
        />
      </div>

      <div className="space-y-2 group">
        <label htmlFor="tag" className="block text-sm font-semibold text-slate-700 ml-1 transition-colors group-focus-within:text-[#1677ff]">标签</label>
        <input
          type="text"
          id="tag"
          name="tag"
          required
          defaultValue={column.tag}
          className="block w-full px-4 py-3.5 text-slate-700 bg-white/70 border border-[#d6e4ff] focus:ring-4 focus:ring-[#1677ff]/10 focus:border-[#1677ff] outline-none transition-all duration-300 placeholder-slate-400 disabled:opacity-50"
        />
      </div>

      <div className="space-y-2 group">
        <label htmlFor="desc" className="block text-sm font-semibold text-slate-700 ml-1 transition-colors group-focus-within:text-[#1677ff]">专栏描述</label>
        <textarea
          id="desc"
          name="desc"
          rows={4}
          required
          defaultValue={column.desc}
          className="block w-full px-4 py-3.5 text-slate-700 bg-white/70 border border-[#d6e4ff] focus:ring-4 focus:ring-[#1677ff]/10 focus:border-[#1677ff] outline-none transition-all duration-300 resize-none placeholder-slate-400 disabled:opacity-50"
        />
      </div>
    </form>
  );
}
