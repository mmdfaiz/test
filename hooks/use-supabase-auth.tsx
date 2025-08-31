// file: hooks/use-supabase-auth.tsx

'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { supabase } from '@/lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation'; // <-- Impor useRouter

// Definisikan tipe untuk metadata pengguna
interface UserMetadata {
  user_role: 'admin' | 'employee';
  full_name: string;
}

// Gabungkan tipe SupabaseUser dengan metadata kustom
export interface CustomUser extends SupabaseUser {
  user_metadata: UserMetadata;
}

interface AuthContextType {
  user: CustomUser | null;
  loading: boolean;
  logout: (redirectPath?: string) => Promise<void>; // <-- Perbarui tipe fungsi logout
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter(); // <-- Gunakan router di dalam provider

  useEffect(() => {
    const checkActiveSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const loggedInUser = (session?.user as CustomUser) ?? null;
      setUser(loggedInUser);
      setIsAuthenticated(!!loggedInUser);
      setLoading(false);
    };

    checkActiveSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const loggedInUser = (session?.user as CustomUser) ?? null;
        setUser(loggedInUser);
        setIsAuthenticated(!!loggedInUser);
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Fungsi logout sekarang menangani redirect
  const logout = async (redirectPath: string = '/'): Promise<void> => {
    await supabase.auth.signOut();
    // State akan diupdate oleh listener, kita hanya perlu redirect
    router.push(redirectPath);
  };

  const value = {
    user,
    loading,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useSupabaseAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useSupabaseAuth must be used within an AuthProvider');
  }
  return context;
}
