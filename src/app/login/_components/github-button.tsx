// components/auth/github-button.tsx
'use client'

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react"; 
import { GithubIcon } from "@/app/login/_components/github-icon";

export default function GithubButton() {
  // useFormStatus 必须在 <form> 内部的组件中使用
  const { pending } = useFormStatus();

  return (
    <a href="/api/auth/login" aria-disabled={pending} className='w-full'>
      <span
        className={`
          flex w-full items-center justify-center gap-3 px-4 py-3 text-sm font-medium transition-all cursor-pointer
          ${pending ? "cursor-not-allowed opacity-70 bg-[#e6f4ff] text-[#5b8def]" : "bg-[#1677ff] text-white shadow-[0_8px_20px_rgba(22,119,255,0.24)] hover:bg-[#4096ff]"}
        `}
      >
        {pending ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <GithubIcon className="h-5 w-5" />
        )}
        {pending ? "正在连接 GitHub..." : "使用 GitHub 登录"}
      </span>
    </a>
  );
}
