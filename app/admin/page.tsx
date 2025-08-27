// app/admin/page.tsx

'use client';

import { AdminDashboard } from '../components/admin-dashboard';
import { Sidebar } from '../components/layout/sidebar'; // Impor sidebar yang benar

export default function AdminPage() {
  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar />
      <AdminDashboard />
    </div>
  );
}
