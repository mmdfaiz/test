// app/employee/documents/page.tsx (Employee)

'use client';

import { useState, useEffect } from 'react';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EmployeeSidebar } from '../../components/employee/employee-sidebar';
import { EmployeeHeader } from '../../components/employee/employee-header';
import { useToast } from '@/app/components/ui/use-toast';
import { getDocuments, type Document } from '@/lib/supabase';

export default function EmployeeDocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const data = await getDocuments();
        setDocuments(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Could not fetch documents.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <EmployeeSidebar />
      <div className='flex-1 p-6'>
        <EmployeeHeader
          title='Company Documents'
          subtitle='Access and download company documents and resources'
        />
        <Card>
          <CardHeader>
            <CardTitle>Document Library</CardTitle>
            <CardDescription>
              Browse and download available company documents.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size (KB)</TableHead>
                  <TableHead>Uploaded At</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className='text-center'>
                      Loading documents...
                    </TableCell>
                  </TableRow>
                ) : (
                  documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className='font-medium'>
                        {doc.file_name}
                      </TableCell>
                      <TableCell>{doc.file_type}</TableCell>
                      <TableCell>{(doc.file_size / 1024).toFixed(2)}</TableCell>
                      <TableCell>
                        {new Date(doc.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button variant='outline' size='sm' asChild>
                          <a
                            href={doc.url}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <Download className='w-4 h-4 mr-1' />
                            Download
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
