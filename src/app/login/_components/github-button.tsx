// components/auth/github-button.tsx
'use client'

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react"; 
import Link from "next/link";
import { GithubIcon } from "@/app/login/_components/github-icon";

export default function GithubButton() {
  // useFormStatus 必须在 <form> 内部的组件中使用
  const { pending } = useFormStatus();

  return (
    <Link href='/api/auth/login' className='w-full'>
      <button
        disabled={pending}
        className={`
          flex w-full items-center justify-center gap-3 px-4 py-3 text-sm font-medium transition-all cursor-pointer
          ${pending ? "cursor-not-allowed opacity-70 bg-gray-100 text-gray-400" : "bg-gray-800 text-white hover:bg-gray-800/90"}
        `}
      >
        {pending ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <GithubIcon className="h-5 w-5" />
        )}
        {pending ? "正在连接 GitHub..." : "使用 GitHub 登录"}
      </button>
    </Link>
  );
}