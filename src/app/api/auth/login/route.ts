import { getCloudflareContext } from '@opennextjs/cloudflare';
import { NextResponse } from 'next/server';

// export const runtime = 'edge';

export async function GET() {
  const { env } = getCloudflareContext();
  const clientId = env.GITHUB_CLIENT_ID;
  const redirectUri = `${env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`; // 建议在环境变量配置 BASE_URL
  
  // 3. 构建 GitHub OAuth 链接
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri, // 这里传过去的值必须和 GitHub 后台填的完全一致
    scope: 'read:user user:email',
    allow_signup: 'true',
  });

  const url = `https://github.com/login/oauth/authorize?${params.toString()}`;

  console.log("正在跳转到 GitHub, redirect_uri 为:", url); // 调试用，可以在终端看到打印
  
  return NextResponse.redirect(url);
}