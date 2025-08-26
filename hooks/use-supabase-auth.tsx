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
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listener ini akan berjalan saat komponen pertama kali dimuat
    // dan setiap kali status otentikasi berubah (login/logout).
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Ambil data pengguna terbaru dari server.
        // Ini adalah cara paling andal untuk mendapatkan metadata.
        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser();

        setUser((currentUser as CustomUser) ?? null);
        setLoading(false);
      }
    );

    // Hentikan listener saat komponen tidak lagi digunakan
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const logout = async (): Promise<void> => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const value = {
    user,
    loading,
    logout,
    isAuthenticated: !!user,
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
