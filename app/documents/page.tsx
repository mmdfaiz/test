// app/documents/page.tsx (Admin)
'use client';

import { useState, useEffect } from 'react';
import { Plus, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Sidebar } from '../components/layout/sidebar';
import { Header } from '../components/layout/header';
// --- PERBAIKAN DI SINI ---
import { toast } from 'sonner'; // Langsung gunakan dari sonner agar lebih sederhana
import {
  getDocuments,
  uploadDocument,
  deleteDocument,
  type Document,
} from '@/lib/supabase';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [newDocumentFile, setNewDocumentFile] = useState<File | null>(null);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const data = await getDocuments();
      setDocuments(data);
    } catch (error) {
      toast.error('Failed to fetch documents.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleUpload = async () => {
    if (!newDocumentFile) {
      // Sekarang pesan error ini akan muncul
      toast.error('Please select a file to upload.');
      return;
    }

    try {
      toast.loading('Uploading document...');
      await uploadDocument(newDocumentFile);
      setUploadDialogOpen(false);
      setNewDocumentFile(null);
      toast.success('Document uploaded successfully!');
      await fetchDocuments();
    } catch (error: any) {
      toast.error('Upload Failed', {
        description: error.message,
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (
      confirm(
        'Are you sure you want to delete this document? This action cannot be undone.'
      )
    ) {
      try {
        toast.loading('Deleting document...');
        await deleteDocument(id);
        toast.success('Document deleted successfully.');
        await fetchDocuments();
      } catch (error: any) {
        toast.error('Error deleting document', {
          description: error.message,
        });
      }
    }
  };

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar />
      <div className='flex-1 p-6'>
        <Header
          title='Documents'
          subtitle='Manage company documents and files'
        />
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle>Document Library</CardTitle>
                <CardDescription>
                  Manage and organize company documents
                </CardDescription>
              </div>
              <Dialog
                open={uploadDialogOpen}
                onOpenChange={setUploadDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className='w-4 h-4 mr-2' />
                    Upload Document
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload New Document</DialogTitle>
                    <DialogDescription>
                      Supported files: PDF, DOCX, XLSX.
                    </DialogDescription>
                  </DialogHeader>
                  <div className='space-y-4'>
                    <div>
                      <Label htmlFor='file'>Select File</Label>
                      <Input
                        id='file'
                        type='file'
                        onChange={(e) =>
                          setNewDocumentFile(e.target.files?.[0] || null)
                        }
                      />
                    </div>
                    <Button className='w-full' onClick={handleUpload}>
                      Upload Document
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size (KB)</TableHead>
                  <TableHead>Uploaded At</TableHead>
                  <TableHead>Actions</TableHead>
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
                      <TableCell className='space-x-2'>
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
                        <Button
                          variant='destructive'
                          size='sm'
                          onClick={() => handleDelete(doc.id)}
                        >
                          <Trash2 className='w-4 h-4 mr-1' />
                          Delete
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
