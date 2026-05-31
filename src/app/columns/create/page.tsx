import { Inter } from "next/font/google";
import { addColumn } from "../_service/create";
import SubmitButton from "./_components/submit-button";
import { redirect } from "next/navigation";

// 加载字体
const inter = Inter({ subsets: ["latin"] });

export default function CreateColumnForm() {

  async function __formAction(formData: FormData) {
    'use server';
    const title = formData.get("title") as string;
    const desc = formData.get("desc") as string;
    const tag = formData.get("tag") as string;
    const res = await addColumn({ title, desc, tag });
    if (!res || !res.success) {
      throw new Error(res?.message || '创建专栏失败');
    }
    redirect("/");
  }

  return (
    // 外层容器：负责背景和居中
    <div className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden ${inter.className}`}>

      {/* 卡片容器 */}
      <div className="relative w-full max-w-lg p-4">
        <div className="relative bg-white/85 backdrop-blur-lg border border-[#d6e4ff] p-8 md:p-10 shadow-[0_18px_45px_rgba(22,119,255,0.12)]">
          
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">新建专栏</h1>
          </div>

          {/* Form */}
          <form action={__formAction} className="space-y-6">
            
            {/* 专栏名称 */}
            <div className="space-y-2 group">
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700 ml-1 transition-colors group-focus-within:text-[#1677ff]">
                专栏名称
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  className="block w-full px-4 py-3.5 text-slate-700 bg-white/70 border border-[#d6e4ff] focus:ring-4 focus:ring-[#1677ff]/10 focus:border-[#1677ff] outline-none transition-all duration-300 placeholder-slate-400 disabled:opacity-50"
                  placeholder="例如：产品设计思维"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </div>
              </div>
            </div>

            {/* 专栏名称 */}
            <div className="space-y-2 group">
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700 ml-1 transition-colors group-focus-within:text-[#1677ff]">
                标签
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="tag"
                  name="tag"
                  required
                  className="block w-full px-4 py-3.5 text-slate-700 bg-white/70 border border-[#d6e4ff] focus:ring-4 focus:ring-[#1677ff]/10 focus:border-[#1677ff] outline-none transition-all duration-300 placeholder-slate-400 disabled:opacity-50"
                  placeholder="例如：技术趋势"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </div>
              </div>
            </div>

            {/* 专栏描述 */}
            <div className="space-y-2 group">
              <label htmlFor="description" className="block text-sm font-semibold text-slate-700 ml-1 transition-colors group-focus-within:text-[#1677ff]">
                专栏描述
              </label>
              <textarea
                id="desc"
                name="desc"
                rows={4}
                required
                className="block w-full px-4 py-3.5 text-slate-700 bg-white/70 border border-[#d6e4ff] focus:ring-4 focus:ring-[#1677ff]/10 focus:border-[#1677ff] outline-none transition-all duration-300 resize-none placeholder-slate-400 disabled:opacity-50"
                placeholder="请简要介绍该专栏的主题内容..."
              ></textarea>
            </div>

            {/* 按钮区域 */}
            <div className="pt-4">
              <SubmitButton />
            </div>
          </form>
        </div>

        <p className="text-center text-slate-400 text-xs mt-8 font-medium opacity-60">
          &copy; {new Date().getFullYear()} Design System. All rights reserved.
        </p>
      </div>
    </div>
  );
}
