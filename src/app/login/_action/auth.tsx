// app/actions/auth.ts
'use server'

// import { signIn } from "@/app/_service/auth" // 假设你的 auth 配置在这里
// 或者 import { createClient } from "@/utils/supabase/server"

export async function handleGithubLogin() {
  // 核心就是在服务端执行重定向到 Github
  // await signIn("github", { redirectTo: "/dashboard" });
}