// lib/types.ts

import type { User as SupabaseUser } from '@supabase/supabase-js';

// Tipe untuk data yang ada di tabel 'profiles'
export interface Profile {
  id: string; // UUID from auth.users
  employee_id: string; // NIK
  full_name: string;
  position: string;
  department: string;
  user_role: 'admin' | 'employee';
  avatar_url?: string;
}

// Gabungkan tipe SupabaseUser dengan Profile kita
export interface CustomUser extends SupabaseUser {
  profile: Profile;
}

// Definisikan juga tipe data untuk tabel lain
export interface AttendanceRecord {
  id: number;
  user_id: string;
  check_in: string | null;
  check_out: string | null;
  date: string;
  status: 'on_time' | 'late' | 'absent';
  hours_worked?: number;
}

export interface LeaveRequest {
  id: number;
  user_id: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected';
  document_url?: string;
}

export interface Document {
  id: number;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  uploaded_by: string;
  created_at: string;
  url?: string; // URL publik dari Supabase Storage
}

export interface Notification {
  id: number; // ID adalah number (BIGINT)
  user_id: string;
  title: string;
  message: string;
  type: string;
  read: boolean; // Gunakan 'read' secara konsisten
  created_at: string;
  action_url?: string;
}
