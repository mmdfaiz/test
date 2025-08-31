// file: app/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseAuth } from '@/hooks/use-supabase-auth';
import { LandingPage } from '@/app/components/landing-page';

export default function HomePage() {
  const { user, loading } = useSupabaseAuth();
  const router = useRouter();

  useEffect(() => {
    // Jangan lakukan apa-apa jika sesi masih loading
    if (loading) {
      return;
    }

    // Jika ada user yang login, cek rolenya
    if (user) {
      const role = user.user_metadata?.user_role;

      if (role === 'admin') {
        router.push('/admin');
      } else if (role === 'employee') {
        router.push('/employee');
      }
      // Jika tidak ada role, user akan tetap di halaman ini (menampilkan "Redirecting...")
      // atau bisa diarahkan ke halaman login lagi jika perlu.
    }
    // Jika tidak ada user, komponen akan menampilkan LandingPage
  }, [user, loading, router]);

  // Tampilkan loading indicator saat sesi sedang diperiksa
  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p>Loading session...</p>
      </div>
    );
  }

  // Jika tidak ada user, tampilkan halaman landing
  if (!user) {
    return <LandingPage />;
  }

  // Tampilkan pesan ini sementara redirect berjalan
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <p>Redirecting...</p>
    </div>
  );
}
