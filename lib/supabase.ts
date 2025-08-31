// file: lib/supabase.ts

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client ini aman untuk digunakan di sisi client (browser)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- INTERFACES & TYPES ---
export interface Employee {
  id: string;
  user_id: string;
  employee_id: string; // NIK
  full_name: string;
  position: string;
  department: string;
  created_at: string;
}

export interface Document {
  id: number;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  uploaded_by: string;
  created_at: string;
  url?: string;
}

// --- FUNGSI-FUNGSI ---

// Mengambil semua data karyawan
export async function getEmployees(): Promise<Employee[]> {
  const { data, error } = await supabase.from('employees').select('*');
  if (error) throw error;
  return data || [];
}

// Mengambil semua dokumen
export async function getDocuments(): Promise<Document[]> {
  const { data, error } = await supabase.from('documents').select('*');
  if (error) throw error;
  // Menghasilkan URL publik untuk setiap file
  return data.map((doc) => ({
    ...doc,
    url: supabase.storage.from('company_documents').getPublicUrl(doc.file_path)
      .data.publicUrl,
  }));
}

// Mengunggah dokumen baru
export async function uploadDocument(file: File): Promise<Document> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error('User not authenticated');

  const filePath = `${user.id}/${Date.now()}_${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from('company_documents')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Error uploading file:', uploadError);
    throw uploadError;
  }

  const { data, error: insertError } = await supabase
    .from('documents')
    .insert({
      file_name: file.name,
      file_path: filePath,
      file_type: file.type || 'application/octet-stream',
      file_size: file.size,
      uploaded_by: user.id,
    })
    .select()
    .single();

  if (insertError) {
    // Hapus file dari storage jika gagal menyimpan metadata
    await supabase.storage.from('company_documents').remove([filePath]);
    console.error('Error saving document metadata:', insertError);
    throw insertError;
  }

  return data;
}

// Menghapus dokumen
export async function deleteDocument(
  docId: number
): Promise<{ success: boolean }> {
  const { data: doc, error: fetchError } = await supabase
    .from('documents')
    .select('file_path')
    .eq('id', docId)
    .single();

  if (fetchError || !doc) {
    console.error('Document not found:', fetchError?.message);
    throw new Error('Document not found.');
  }

  const { error: deleteDbError } = await supabase
    .from('documents')
    .delete()
    .eq('id', docId);
  if (deleteDbError) {
    console.error('Error deleting document from database:', deleteDbError);
    throw deleteDbError;
  }

  const { error: deleteStorageError } = await supabase.storage
    .from('company_documents')
    .remove([doc.file_path]);

  if (deleteStorageError) {
    console.warn(
      'Could not delete file from storage (DB record deleted):',
      deleteStorageError
    );
  }

  return { success: true };
}

// --- FUNGSI OTENTIKASI ---

// Fungsi login untuk karyawan menggunakan NIK
export async function signInWithNik(nik: string, password: string) {
  const email = `${nik}@company.com`; // Mengubah NIK menjadi format email
  return supabase.auth.signInWithPassword({ email, password });
}
