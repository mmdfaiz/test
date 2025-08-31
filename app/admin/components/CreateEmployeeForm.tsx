// app/admin/components/CreateEmployeeForm.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { toast } from 'sonner';
import { createEmployeeAction } from '../actions'; // <-- Pastikan path ini benar

export function CreateEmployeeForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await createEmployeeAction(formData);

    if (result.error) {
      toast.error('Error creating user', {
        description: result.error,
      });
    } else if (result.success) {
      toast.success(result.success);
      (event.target as HTMLFormElement).reset(); // Reset form setelah berhasil
    }

    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Employee</CardTitle>
        <CardDescription>
          Create a new user account for an employee. They will log in with their
          NIK.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Mengubah menjadi form dengan name attribute */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='nik'>NIK (Nomor Induk Karyawan)</Label>
              <Input
                id='nik'
                name='nik' // <-- Tambahkan name
                placeholder='e.g., 2024001'
                required
              />
            </div>
            <div>
              <Label htmlFor='password'>Initial Password</Label>
              <Input
                id='password'
                name='password' // <-- Tambahkan name
                type='password'
                placeholder='Set a temporary password'
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor='fullName'>Full Name</Label>
            <Input
              id='fullName'
              name='fullName' // <-- Tambahkan name
              placeholder='e.g., Jane Doe'
              required
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='position'>Position</Label>
              <Input
                id='position'
                name='position' // <-- Tambahkan name
                placeholder='e.g., Software Engineer'
                required
              />
            </div>
            <div>
              <Label htmlFor='department'>Department</Label>
              <Input
                id='department'
                name='department' // <-- Tambahkan name
                placeholder='e.g., Technology'
                required
              />
            </div>
          </div>
          <Button type='submit' disabled={loading}>
            {loading ? 'Creating...' : 'Create Employee Account'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
