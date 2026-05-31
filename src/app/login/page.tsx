// app/login/page.tsx
import { handleGithubLogin } from "./_action/auth";
import GithubButton from "./_components/github-button";

export default function LoginPage() {
  return (
    <div className="pt-20">

      {/* 卡片容器 */}
      <div className="w-full max-w-md mx-auto space-y-8 bg-white p-10 border border-[#d6e4ff] shadow-[0_18px_45px_rgba(22,119,255,0.12)] ring-1 ring-[#e6f4ff]">
        
        {/* 头部文案 */}
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0958d9]">
            USEHOOK
          </h2>
          <p className="mt-2 text-sm text-[#5b8def]">
            请登录以访问您的专栏
          </p>
        </div>

        {/* 登录区域 */}
        <div className="mt-8 space-y-6">
          
          {/* 策略 3: 使用 Server Action 处理提交 */}
          <form action={handleGithubLogin}>
            <GithubButton />
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#d6e4ff]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-slate-500">
                安全 · 快速 · 便捷
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 底部版权或其他信息 */}
      <p className="mt-8 text-center text-xs text-slate-500">
        登录即代表您同意我们的 <a href="#" className="underline hover:text-[#1677ff]">服务条款</a> 和 <a href="#" className="underline hover:text-[#1677ff]">隐私政策</a>
      </p>
    </div>
  );
}
