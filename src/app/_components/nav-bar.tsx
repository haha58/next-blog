import Link from 'next/link';
import { ThemeToggle } from '@/app/_components/theme-toggle';
import Profile from '@/app/_components/profile';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 px-2 md:px-6">
      <div className="max-w-6xl mx-auto h-[70px] flex justify-between items-center">
        <Link href="/" className="text-sm md:text-lg font-extrabold tracking-tighter hover:opacity-80 transition">
          USEHOOK.
        </Link>
        <nav className="flex gap-4 items-center text-sm font-medium text-gray-500">
          <ThemeToggle />
          <Link href="/mycolumns" className="hover:text-black transition text-sm sm:text-base">我的专栏</Link>
          <Profile />
        </nav>
      </div>
    </header>
  );
}