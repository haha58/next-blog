// app/api/auth/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getGithubUser, createOrUpdateUser, createSession } from '../../../../lib/auth';

// export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) return NextResponse.json({ error: 'No code provided' }, { status: 400 });

  try {
    // Debug 日志
    console.log("正在尝试通过 GitHub Code 获取 Token..."); 
    // 1. 获取 GitHub 用户信息
    const ghUser = await getGithubUser(code);
    // Debug 日志
    console.log("获取到 GitHub 用户:", ghUser);
    
    // 2. 在 KV 中创建或更新用户
    const user = await createOrUpdateUser(ghUser);
    
    // 3. 创建 Session (存入 KV)
    const sessionId = await createSession(user.id);

    // 登录成功跳回首页
    const response = NextResponse.redirect(new URL('/', req.url)); 
    
    // 4. 设置 HttpOnly Cookie
    response.cookies.set('session_id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7天
    });

    return response;

  } catch (error) {
    // 打印详细错误堆栈到终端, 这对调试至关重要
    console.error("Login Error Details:", error);
    // 如果是 GitHub API 返回的错误, 尝试打印出来
    if (error instanceof Error) {
      return NextResponse.json({ 
        error: 'GitHub API Error', 
        details: error.message 
      }, { status: 500 });
  }
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}