'use client';

import SubmitButton from "./submit-button";
import { onSubmit } from "../_action";
import { useRef } from "react";
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor' 

export default function CreateArticleForm({ column_id }: { column_id: string }) {
  const editor = useRef<any>(null);

  function formAction(formData: FormData) {
    return onSubmit(column_id, formData, editor.current.getEditorHTML());
  }

  return (
    // 外层容器：负责背景和居中
    <form action={formAction} className="space-y-6">
      {/* Header */}
      <div className="mb-10 text-center flex items-center justify-between sticky top-20 bg-white z-20">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">新增文章</h1>
        {/* 按钮区域 */}
        <SubmitButton />
      </div>
      
      {/* 专栏名称 */}
      <div className="space-y-2 group">
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 ml-1 transition-colors group-focus-within:text-gray-600">文章标题</label>
        <div className="relative">
          <input type="text" id="title" name="title" required className="block w-full px-4 py-3.5 text-slate-700 bg-white/50 border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-gray-500 outline-none transition-all duration-300 placeholder-slate-400 disabled:opacity-50" placeholder="例如：如何提高工作效率" />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
          </div>
        </div>
      </div>

      {/* 文章内容 */}
      <div className="space-y-2 group">
        <SimpleEditor ref={editor} value="" onChange={() => {}} />
      </div>
    </form>
  );
}