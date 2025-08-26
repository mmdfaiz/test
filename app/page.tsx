// file: app/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseAuth } from '@/hooks/use-supabase-auth';
import { LandingPage } from '@/app/components/landing-page';

export default function HomePage() {
  const { user, loading } = useSupabaseAuth();
  const router = useRouter();

  console.log('HomePage State:', { user, loading }); // <-- TAMBAHKAN INI

  useEffect(() => {
    if (loading) {
      console.log('HomePage Effect: Loading, skipping redirect.');
      return;
    }

    if (user) {
      const role = user.user_metadata?.user_role;
      console.log('HomePage Effect: User found with role:', role); // <-- TAMBAHKAN INI
      if (role === 'admin') {
        router.push('/admin');
      } else if (role === 'employee') {
        router.push('/employee');
      } else {
        console.error('HomePage Effect: User has no role, cannot redirect.'); // <-- TAMBAHKAN INI
      }
    } else {
      console.log('HomePage Effect: No user found.');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p>Loading session...</p>
      </div>
    );
  }

  if (!user) {
    return <LandingPage />;
  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <p>Redirecting...</p>
    </div>
  );
}
