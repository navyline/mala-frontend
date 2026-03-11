"use client";

import { Flame, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from "next/link";


export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('access_token'); 
    router.push('/login'); 
    router.refresh();
  };

  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center border-b border-gray-100">
        {/* Logo */}
      <div className="flex items-center gap-2">
            <Link href="/" className="text-xl font-bold text-orange-600 tracking-tight">
                  หมาล่าเชิงดอย
            </Link>
            <Flame size={20} fill='Red ' />
      </div>

        {/* logout button */}
      <button 
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium group"
      >
        <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span>ออกจากระบบ</span>
      </button>
    </nav>
  );
}