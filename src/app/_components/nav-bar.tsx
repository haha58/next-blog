import Link from 'next/link';
import { ThemeToggle } from '@/app/_components/theme-toggle';
import Profile from '@/app/_components/profile';

export default async function Navbar() {
  const profile = await Profile();

  return (
    <header className="sticky top-0 z-50 bg-white/92 backdrop-blur-md border-b border-[#d6e4ff] px-2 md:px-6 shadow-[0_1px_0_rgba(22,119,255,0.04)]">
      <div className="max-w-6xl mx-auto h-[70px] flex justify-between items-center">
        <Link href="/" className="text-sm md:text-lg font-extrabold tracking-tighter text-[#0958d9] hover:text-[#1677ff] transition">
          USEMO
        </Link>
        <nav className="flex gap-4 items-center text-sm font-medium text-slate-600">
          <ThemeToggle />
          <Link href="/mycolumns" className="hover:text-[#1677ff] transition text-sm sm:text-base">我的专栏</Link>
          {profile}
        </nav>
      </div>
    </header>
  );
}
