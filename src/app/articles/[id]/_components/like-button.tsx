"use client";

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { postLike } from '../_action/like';

export default function LikeButton({ isLiked, articleId }: { isLiked: boolean, articleId: string }) {
  const [liked, setLiked] = useState(isLiked);

  async function handleClick() {
    if (liked) return;
    setLiked(!liked);
    await postLike(articleId);
  }

  return (
    <button 
      onClick={handleClick}
      className={`flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 mx-auto mb-10 text-2xl
        ${liked ? 'text-red-500 scale-110 shadow-red-100' : 'text-gray-300'}
      `}
    >
      <Heart className={`${liked ? 'text-red-500' : 'text-gray-300'}`} />
    </button>
  );
}