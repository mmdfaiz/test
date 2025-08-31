// app/admin/employees/create/page.tsx
'use client';

import { CreateEmployeeForm } from '../../components/CreateEmployeeForm';
import { Sidebar } from '../../../components/layout/sidebar';
import { Header } from '../../../components/layout/header';

export default function CreateEmployeePage() {
  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar />
      <div className='flex-1 p-6'>
        <Header
          title='Add New Employee'
          subtitle='Create a new employee profile'
        />
        <CreateEmployeeForm />
      </div>
    </div>
  );
}
