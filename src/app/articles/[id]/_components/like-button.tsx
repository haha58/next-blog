"use client";

import { useState, useTransition } from 'react';
import { Heart } from 'lucide-react';
import { postLike } from '../_action/like';

export default function LikeButton({
  isLiked,
  articleId,
  initialLikes,
}: {
  isLiked: boolean;
  articleId: string;
  initialLikes: number;
}) {
  const [liked, setLiked] = useState(isLiked);
  const [likes, setLikes] = useState(initialLikes);
  const [pending, startTransition] = useTransition();

  function handleClick() {
    if (pending) return;

    startTransition(async () => {
      const previousLiked = liked;
      const previousLikes = likes;
      setLiked((current) => !current);
      setLikes((current) => current + (previousLiked ? -1 : 1));

      const result = await postLike(articleId);

      if (!result.success) {
        setLiked(previousLiked);
        setLikes(previousLikes);
        if (result.message === 'Unauthorized') {
          window.location.href = '/login';
        }
        return;
      }

      setLiked(result.data?.liked ?? !previousLiked);
      setLikes(result.data?.likes ?? previousLikes);
    });
  }

  return (
    <div className="mb-10 flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        aria-pressed={liked}
        className={`flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl shadow-md transition-all duration-300 hover:shadow-lg
          ${liked ? 'scale-110 text-red-500 shadow-red-100' : 'text-gray-300'}
          ${pending ? 'cursor-not-allowed opacity-70' : ''}
        `}
      >
        <Heart className={`${liked ? 'text-red-500' : 'text-gray-300'}`} />
      </button>
      <span className="text-sm text-gray-500">{likes} 点赞</span>
    </div>
  );
}
