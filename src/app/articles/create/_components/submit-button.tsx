'use client';

import { useFormStatus } from 'react-dom'

export default function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className={`text-sm relative py-2 px-4 font-semibold transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 overflow-hidden
        ${pending ? 'cursor-not-allowed opacity-80' : 'bg-[#1677ff] text-white shadow-[0_8px_20px_rgba(22,119,255,0.25)] hover:-translate-y-0.5 hover:bg-[#4096ff] hover:shadow-[0_10px_24px_rgba(22,119,255,0.30)] focus:ring-[#1677ff]'}
      `}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {pending && (
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {pending ? '正在新增...' : '确认新增'}
      </span>
    </button>
  );
}
