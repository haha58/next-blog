"use client";
import { useState } from 'react';
import { addComment } from '@/app/articles/_service/create-comment';

interface CommentSectionProps {
  comments: CommentX[];
  pre_id: string;
  user?: Profile | null;
}

export default function CommentSection({ comments = [], pre_id, user }: CommentSectionProps) {
  const [list, setComments] = useState(comments);

  const handleSubmit = (formData: FormData) => {
    if (!user) {
      window.location.href = '/login';
      return;
    }

    const content = formData.get('content') as string;
    if (!content.trim()) return;
    const now = Date.now();
    const newComment: CommentX = {
      // 模拟的假 id，真实的 id 在服务端生成
      id: String(now),
      pre_id,
      content,
      createdAt: now,
      updatedAt: now,
      isLiked: false,
      ...user,
    };
    setComments([...list, newComment]);
    addComment({ pre_id, content });
  };

  return (
    <div className="mt-10 pt-10 border-t border-[#d6e4ff]">
      <h3 className="text-xl font-bold mb-6 text-slate-900">评论 ({list.length})</h3>

      {user ? (
        <form action={handleSubmit} className="flex gap-4 mb-8">
          <input
            type="text"
            name="content"
            placeholder="写下你的看法..."
            className="flex-1! indent-3! border border-[#d6e4ff] bg-white focus:outline-none focus:border-[#1677ff] focus:ring-4 focus:ring-[#1677ff]/10 transition"
            required
          />
          <button
            type="submit"
            className="bg-[#1677ff] text-white px-6 py-2 font-semibold shadow-[0_8px_20px_rgba(22,119,255,0.22)] hover:bg-[#4096ff] transition"
          >
            发送
          </button>
        </form>
      ) : (
        <div className="mb-8 border border-[#d6e4ff] bg-[#f7fbff] px-4 py-3 text-sm text-slate-500">
          <a href="/login" className="font-medium text-[#1677ff] hover:text-[#4096ff]">
            登录后参与评论
          </a>
        </div>
      )}

      <div className="space-y-6">
        {list.map((comment) => (
          <div key={comment.id} className="flex gap-4 animate-in fade-in slide-in-from-bottom-2">
            <img src={comment.user_avatar} alt={comment.user_name} className="w-10 h-10 rounded-full shrink-0" />
            <div>
              <div className="mb-1 flex items-center gap-2">
                <h4 className="text-sm font-bold">{comment.user_name}</h4>
                <time className="text-xs text-[#5b8def]" dateTime={getCommentDateTime(comment.createdAt)}>
                  {formatCommentTime(comment.createdAt)}
                </time>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getCommentDateTime(timestamp?: number) {
  return timestamp ? new Date(timestamp).toISOString() : '';
}

function formatCommentTime(timestamp?: number) {
  if (!timestamp) return '刚刚';

  return new Date(timestamp).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}
