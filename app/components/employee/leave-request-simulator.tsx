'use client';

import type React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Send } from 'lucide-react';

// Ganti dengan path relatif yang benar jika path alias masih bermasalah
import { useToast } from '@/app/components/ui/use-toast';

export function LeaveRequestSimulator() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    employeeName: 'Jane Doe',
    leaveType: 'Annual Leave',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.employeeName ||
      !formData.leaveType ||
      !formData.startDate ||
      !formData.endDate
    ) {
      toast({
        title: 'Incomplete Form',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const days =
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleAttendanceRequest = () => {
    if (!formData.employeeName) {
      toast({ title: 'Employee Name Required', variant: 'destructive' });
      return;
    }
  };

  const handleDocumentUpload = () => {
    if (!formData.employeeName) {
      toast({ title: 'Employee Name Required', variant: 'destructive' });
      return;
    }
  };

  return (
    <Card className='w-full max-w-2xl mx-auto'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Calendar className='w-5 h-5' />
          Employee Request Simulator
        </CardTitle>
        <CardDescription>
          Simulate employee requests to test admin notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='employeeName'>Employee Name</Label>
              <Input
                id='employeeName'
                value={formData.employeeName}
                onChange={(e) =>
                  setFormData({ ...formData, employeeName: e.target.value })
                }
                placeholder='Enter employee name'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='leaveType'>Leave Type</Label>
              <Select
                value={formData.leaveType}
                onValueChange={(value) =>
                  setFormData({ ...formData, leaveType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select leave type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Annual Leave'>Annual Leave</SelectItem>
                  <SelectItem value='Sick Leave'>Sick Leave</SelectItem>
                  <SelectItem value='Emergency Leave'>
                    Emergency Leave
                  </SelectItem>
                  <SelectItem value='Maternity Leave'>
                    Maternity Leave
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='startDate'>Start Date</Label>
              <Input
                id='startDate'
                type='date'
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='endDate'>End Date</Label>
              <Input
                id='endDate'
                type='date'
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='reason'>Reason</Label>
            <Textarea
              id='reason'
              value={formData.reason}
              onChange={(e) =>
                setFormData({ ...formData, reason: e.target.value })
              }
              placeholder='Enter reason for leave'
              rows={3}
            />
          </div>
          <div className='flex flex-col sm:flex-row gap-2'>
            <Button type='submit' className='flex-1'>
              <Send className='w-4 h-4 mr-2' />
              Submit Leave Request
            </Button>
            <Button
              type='button'
              variant='outline'
              onClick={handleAttendanceRequest}
            >
              Submit Attendance Request
            </Button>
            <Button
              type='button'
              variant='outline'
              onClick={handleDocumentUpload}
            >
              Upload Document
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
