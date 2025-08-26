// File: lib/types.ts

import type { User as SupabaseUser } from "@supabase/supabase-js";

// Definisikan properti custom yang ada di user_metadata kamu
interface UserMetadata {
  name: string;
  avatar_url: string; // Di Supabase biasanya namanya avatar_url
  position?: string;
  department?: string;
}

// Gabungkan tipe SupabaseUser dengan metadata kita
export interface CustomUser extends SupabaseUser {
  user_metadata: UserMetadata;
}

// Di dalam file lib/supabase.ts atau lib/types.ts

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  // SEBELUMNYA:
  // type: "info" | "success" | "warning" | "error";

  // SESUDAH (tambahkan tipe baru yang kamu butuhkan):
  type: "info" | "success" | "warning" | "error" | "attendance_request" | "leave_request" | "document_upload";

  read: boolean;
  action_url?: string;
  created_at: string;
}