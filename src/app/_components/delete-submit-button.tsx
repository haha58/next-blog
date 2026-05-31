"use client";

import { Trash2Icon } from "lucide-react";

interface DeleteSubmitButtonProps {
  label: string;
  confirmMessage: string;
  compact?: boolean;
}

export default function DeleteSubmitButton({
  label,
  confirmMessage,
  compact = false,
}: DeleteSubmitButtonProps) {
  return (
    <button
      type="submit"
      onClick={(event) => {
        if (!window.confirm(confirmMessage)) {
          event.preventDefault();
        }
      }}
      className={
        compact
          ? "inline-flex items-center gap-1 text-xs font-medium text-slate-400 transition hover:text-red-500"
          : "inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-red-500"
      }
    >
      <Trash2Icon className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
      {label}
    </button>
  );
}
