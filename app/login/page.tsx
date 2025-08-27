// file: app/login/page.tsx

'use client';

import type React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, User, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '../../lib/supabase';

export default function LoginPage() {
  const [nikOrEmail, setNikOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const isEmail = nikOrEmail.includes('@');
      const email = isEmail ? nikOrEmail : `${nikOrEmail}@company.com`;

      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

      if (signInError) {
        setError(signInError.message || 'Invalid NIK/email or password');
      } else if (data.session) {
        // --- PERBAIKAN PENTING DI SINI ---
        // 1. Beri tahu Next.js untuk me-refresh state di server & client
        router.refresh();

        // 2. Arahkan ke halaman utama. Halaman utama akan menangani
        //    pengalihan ke dasbor yang benar (admin/employee).
        router.push('/');
      } else {
        // Kasus aneh jika tidak ada error tapi sesi juga tidak ada
        setError('Login failed without a specific error. Please try again.');
      }
    } catch (err) {
      setError('An unknown error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Enter your NIK or Admin Email to access your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='nik'>NIK atau Email Admin</Label>
              <div className='relative'>
                <User className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                <Input
                  id='nik'
                  type='text'
                  placeholder='Enter your NIK or email'
                  value={nikOrEmail}
                  onChange={(e) => setNikOrEmail(e.target.value)}
                  className='pl-10'
                  required
                />
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <div className='relative'>
                <Lock className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter your password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='pl-10 pr-10'
                  required
                />
                <Button
                  type='button'
                  variant='ghost'
                  size='icon'
                  className='absolute right-0 top-0 h-full px-3'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className='h-4 w-4' />
                  ) : (
                    <Eye className='h-4 w-4' />
                  )}
                </Button>
              </div>
            </div>

            {error && (
              <Alert variant='destructive'>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type='submit' className='w-full' disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
