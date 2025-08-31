// app/components/layout/sidebar.tsx

'use client';
import { useRouter, usePathname } from 'next/navigation';
import {
  Calendar,
  Clock,
  FileText,
  Home,
  User,
  TestTube,
  Users,
  LogOut, // <-- Impor ikon LogOut
} from 'lucide-react';
import { useSupabaseAuth } from '@/hooks/use-supabase-auth'; // <-- Impor hook otentikasi

const sidebarItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: FileText, label: 'Documents', path: '/documents' },
  { icon: Users, label: 'Employees', path: '/admin/employees' },
  { icon: Clock, label: 'Attendance', path: '/attendance' },
  { icon: Calendar, label: 'Cuti', path: '/cuti' },
  { icon: User, label: 'Profile', path: '/profile' },
  { icon: TestTube, label: 'Employee Simulator', path: '/employee-simulator' },
];

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useSupabaseAuth(); // <-- Ambil fungsi logout dari hook

  const handleLogout = async () => {
    await logout();
    router.push('/'); // Arahkan ke halaman utama setelah logout
  };

  return (
    // Gunakan flex-col dan justify-between untuk mendorong tombol logout ke bawah
    <div className='w-64 bg-slate-800 text-white p-6 min-h-screen flex flex-col justify-between'>
      <div>
        <div className='flex items-center gap-3 mb-8'>
          <div className='w-10 h-10 bg-white rounded-lg flex items-center justify-center'>
            <div className='w-6 h-6 bg-slate-800 rounded'></div>
          </div>
          <div>
            <h1 className='font-bold text-sm'>PT. MERPATI WAHANA RAYA</h1>
          </div>
        </div>

        <nav className='space-y-2'>
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              onClick={() => router.push(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                (pathname.startsWith(item.path) && item.path !== '/') ||
                pathname === item.path
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <item.icon className='w-5 h-5' />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tombol Logout di bagian bawah */}
      <div>
        <button
          onClick={handleLogout}
          className='w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors text-slate-300 hover:bg-slate-700 hover:text-white'
        >
          <LogOut className='w-5 h-5' />
          Logout
        </button>
      </div>
    </div>
  );
}
