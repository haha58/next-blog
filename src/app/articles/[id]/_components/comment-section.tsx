"use client";
import { useState } from 'react';
import { addComment } from '@/app/articles/_service/create-comment';

interface CommentSectionProps {
  comments: CommentX[];
  pre_id: string;
  user: Profile;
}

export default function CommentSection({ comments = [], pre_id, user }: CommentSectionProps) {
  const [list, setComments] = useState(comments);

  const handleSubmit = (formData: FormData) => {
    const content = formData.get('content') as string;
    if (!content.trim()) return;
    const newComment: any = { 
      // 模拟的假 id，真实的 id 在服务端生成
      id: Date.now(), 
      content,
      ...user
    };
    setComments([...list, newComment]);
    addComment({ pre_id, content });
  };

  return (
    <div className="mt-10 pt-10">
      <h3 className="text-xl font-bold mb-6">评论 ({comments.length})</h3>
      
      <form action={handleSubmit} className="flex gap-4 mb-8">
        <input type="text" name='content' placeholder="写下你的看法..." className="flex-1! indent-3! border border-gray-200 focus:outline-none focus:border-gray-500 transition" required/>
        <button type="submit" className="bg-gray-600 text-white px-6 py-2 font-semibold hover:bg-gray-700 transition">发送</button>
      </form>

      <div className="space-y-6">
        {list.map((comment) => (
          <div key={comment.id} className="flex gap-4 animate-in fade-in slide-in-from-bottom-2">
            <img src={comment.user_avatar} alt={comment.user_name} className="w-10 h-10 rounded-full shrink-0" />
            <div>
              <h4 className="text-sm font-bold mb-1">{comment.user_name}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}