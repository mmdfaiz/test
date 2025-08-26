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
import { adminCreateUser } from '../../../lib/supabase';
import { useToast } from '@/app/components/ui/use-toast';

export function CreateEmployeeForm() {
  const [nik, setNik] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCreateUser = async () => {
    if (!nik || !password || !fullName || !position || !department) {
      toast({
        title: 'Error',
        description: 'Please fill all fields.',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    try {
      await adminCreateUser(nik, password, { fullName, position, department });
      toast({
        title: 'Success',
        description: `Employee ${fullName} created successfully.`,
      });
      // Reset form
      setNik('');
      setPassword('');
      setFullName('');
      setPosition('');
      setDepartment('');
    } catch (error: any) {
      toast({
        title: 'Error creating user',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
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
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <Label htmlFor='nik'>NIK (Nomor Induk Karyawan)</Label>
            <Input
              id='nik'
              value={nik}
              onChange={(e) => setNik(e.target.value)}
              placeholder='e.g., 2024001'
            />
          </div>
          <div>
            <Label htmlFor='password'>Initial Password</Label>
            <Input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Set a temporary password'
            />
          </div>
        </div>
        <div>
          <Label htmlFor='fullName'>Full Name</Label>
          <Input
            id='fullName'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder='e.g., Jane Doe'
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <Label htmlFor='position'>Position</Label>
            <Input
              id='position'
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder='e.g., Software Engineer'
            />
          </div>
          <div>
            <Label htmlFor='department'>Department</Label>
            <Input
              id='department'
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder='e.g., Technology'
            />
          </div>
        </div>
        <Button onClick={handleCreateUser} disabled={loading}>
          {loading ? 'Creating...' : 'Create Employee Account'}
        </Button>
      </CardContent>
    </Card>
  );
}
