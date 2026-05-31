"use client";

import { useState, useTransition } from "react";
import { ThumbsUp } from "lucide-react";
import { likeColumn } from "../_action";

export default function ColumnLikeButton({
  columnId,
  initialLikes,
  initialLiked,
}: {
  columnId: string;
  initialLikes: number;
  initialLiked: boolean;
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(initialLiked);
  const [pending, startTransition] = useTransition();

  function handleClick() {
    if (pending) return;

    startTransition(async () => {
      const previousLiked = liked;
      const previousLikes = likes;
      setLiked((current) => !current);
      setLikes((current) => current + (previousLiked ? -1 : 1));

      const result = await likeColumn(columnId);

      if (!result.success) {
        setLiked(previousLiked);
        setLikes(previousLikes);
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
        disabled={pending}
        onClick={handleClick}
        aria-pressed={liked}
        className={`flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl shadow-md transition-all duration-300 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70
          ${liked ? "scale-110 text-[#1677ff] shadow-[0_8px_24px_rgba(22,119,255,0.18)]" : "text-gray-300"}
        `}
      >
        <ThumbsUp className={`${liked ? "text-[#1677ff]" : "text-gray-300"}`} />
      </button>
      <span className="text-sm text-[#5b8def]">{likes} 点赞</span>
    </div>
  );
}
