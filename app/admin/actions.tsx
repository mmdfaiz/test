// app/admin/actions.ts
'use server';

import { createClient } from '@supabase/supabase-js';

// Fungsi ini hanya akan berjalan di server
export async function createEmployeeAction(formData: FormData) {
  const nik = formData.get('nik') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('fullName') as string;
  const position = formData.get('position') as string;
  const department = formData.get('department') as string;

  if (!nik || !password || !fullName || !position || !department) {
    return { error: 'Please fill all fields.' };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  // Kunci rahasia hanya diakses di sini (sisi server)
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  try {
    // Langkah 1: Buat user di Supabase Auth
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email: `${nik}@company.com`,
        password: password,
        email_confirm: true,
        user_metadata: {
          full_name: fullName,
          user_role: 'employee',
        },
      });

    if (authError) throw authError;
    if (!authData.user) throw new Error('User not created in auth.');

    // Langkah 2: Masukkan profil ke tabel 'employees'
    const { error: profileError } = await createClient(
      supabaseUrl,
      supabaseServiceKey
    )
      .from('employees')
      .insert({
        user_id: authData.user.id,
        employee_id: nik,
        full_name: fullName,
        position: position,
        department: department,
      });

    if (profileError) {
      // Rollback: hapus user jika gagal membuat profil
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      throw profileError;
    }

    return { success: `Employee ${fullName} created successfully.` };
  } catch (error: any) {
    return { error: error.message };
  }
}
