// lib/supabase.ts

import { createClient } from '@supabase/supabase-js';

// Pastikan variabel environment Anda sudah benar di file .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- INTERFACES & TYPES ---
// Ini adalah definisi tipe yang akan digunakan di seluruh aplikasi.
// Pastikan tidak ada duplikasi atau definisi lain di file lain.

export interface Employee {
  id: string;
  user_id: string;
  employee_id: string; // NIK
  full_name: string;
  position: string;
  department: string;
  created_at: string;
}

export interface LeaveRequest {
  id: string;
  employee_id: string;
  start_date: string;
  end_date: string;
  leave_type: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface AttendanceRecord {
  id: string;
  date: string;
  check_in: string | null;
  check_out: string | null;
  status: 'present' | 'late' | 'absent';
  hours_worked?: number;
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

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
}

// --- FUNGSI-FUNGSI ---
// Semua fungsi yang berinteraksi dengan Supabase ada di sini.

export async function getEmployees(): Promise<Employee[]> {
  const { data, error } = await supabase.from('employees').select('*');
  if (error) throw error;
  return data || [];
}

export async function getLeaveRequests(
  employeeId?: string
): Promise<LeaveRequest[]> {
  let query = supabase.from('leave_requests').select('*');
  if (employeeId) {
    query = query.eq('employee_id', employeeId);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function submitLeaveRequest(
  request: Omit<LeaveRequest, 'id'>
): Promise<LeaveRequest> {
  const { data, error } = await supabase
    .from('leave_requests')
    .insert(request)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getAttendanceRecords(
  employeeId: string
): Promise<AttendanceRecord[]> {
  const { data, error } = await supabase
    .from('attendance')
    .select('*')
    .eq('employee_id', employeeId)
    .order('date', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function checkIn(
  employeeId: string,
  employeeName: string
): Promise<AttendanceRecord> {
  const now = new Date();
  const status = now.getHours() > 9 ? 'late' : 'present';
  const { data, error } = await supabase
    .from('attendance')
    .insert({
      employee_id: employeeId,
      employee_name: employeeName,
      check_in: now.toISOString(),
      date: now.toISOString().split('T')[0],
      status: status,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function checkOut(
  attendanceId: string
): Promise<AttendanceRecord> {
  const now = new Date();
  const { data: currentRecord, error: fetchError } = await supabase
    .from('attendance')
    .select('check_in')
    .eq('id', attendanceId)
    .single();

  if (fetchError || !currentRecord)
    throw new Error('Could not find record to check out.');

  const checkInTime = new Date(currentRecord.check_in);
  const diffMs = now.getTime() - checkInTime.getTime();
  const hoursWorked = parseFloat((diffMs / 3600000).toFixed(2));

  const { data, error } = await supabase
    .from('attendance')
    .update({ check_out: now.toISOString(), hours_worked: hoursWorked })
    .eq('id', attendanceId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getDocuments(): Promise<Document[]> {
  const { data, error } = await supabase.from('documents').select('*');
  if (error) throw error;
  return data.map((doc) => ({
    ...doc,
    url: supabase.storage.from('company_documents').getPublicUrl(doc.file_path)
      .data.publicUrl,
  }));
}

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
    await supabase.storage.from('company_documents').remove([filePath]);
    console.error('Error saving document metadata:', insertError);
    throw insertError;
  }

  return data;
}

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

export async function getNotifications(
  userId: string
): Promise<Notification[]> {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function markNotificationAsRead(
  notificationId: string
): Promise<void> {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', notificationId);
  if (error) throw error;
}

// --- FUNGSI KHUSUS ADMIN ---
// PASTIKAN FUNGSI INI ADA DAN DIEKSPOR
export async function adminCreateUser(
  nik: string,
  password: string,
  metadata: { fullName: string; position: string; department: string }
) {
  const { data, error } = await supabase.rpc('create_new_user', {
    nik: nik,
    password: password,
    full_name: metadata.fullName,
    position: metadata.position,
    department: metadata.department,
  });

  if (error) {
    console.error('Error creating user from RPC:', error);
    throw error;
  }
  return data;
}

export async function signInWithNik(nik: string, password: string) {
  const email = `${nik}@company.com`; // Mengubah NIK menjadi format email
  return supabase.auth.signInWithPassword({ email, password });
}
