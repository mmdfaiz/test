// app/admin/employees/page.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '../../components/layout/sidebar';
import { Header } from '../../components/layout/header';
import { useEmployees } from '@/hooks/use-supabase-data'; // <-- Impor hook
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'; // <-- Impor komponen tabel
import { Skeleton } from '@/components/ui/skeleton';

export default function EmployeesPage() {
  const router = useRouter();
  const { employees, loading, error, refetch } = useEmployees(); // <-- Gunakan hook untuk fetch data

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar />
      <div className='flex-1 p-6'>
        <Header title='Employees' subtitle='Manage employee data' />
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <CardTitle>Employee List</CardTitle>
              <Button onClick={() => router.push('/admin/employees/create')}>
                <Plus className='w-4 h-4 mr-2' />
                Add Employee
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {error && <p className='text-red-500'>Error: {error}</p>}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>NIK</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  // Skeleton Loading
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className='h-4 w-24' />
                      </TableCell>
                      <TableCell>
                        <Skeleton className='h-4 w-48' />
                      </TableCell>
                      <TableCell>
                        <Skeleton className='h-4 w-32' />
                      </TableCell>
                      <TableCell>
                        <Skeleton className='h-4 w-32' />
                      </TableCell>
                    </TableRow>
                  ))
                ) : employees.length > 0 ? (
                  // Data Karyawan
                  employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className='font-medium'>
                        {employee.employee_id}
                      </TableCell>
                      <TableCell>{employee.full_name}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  // Data Kosong
                  <TableRow>
                    <TableCell colSpan={4} className='text-center'>
                      No employee data found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
