// app/admin/page.tsx

'use client';

import { AdminDashboard } from '../components/admin-dashboard';
import { CreateEmployeeForm } from './components/CreateEmployeeForm'; // Impor komponen baru

export default function AdminPage() {
  return (
    <div>
      <AdminDashboard />
      <div className='p-6'>
        <CreateEmployeeForm />
      </div>
    </div>
  );
}
