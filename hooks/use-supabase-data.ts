'use client';

import { useState, useEffect } from 'react';
// --- PERBAIKAN: Impor fungsi spesifik, BUKAN seluruh objek supabase ---
import {
  getEmployees,
  getDocuments,
  type Employee,
  type Document,
} from '../lib/supabase'; // Pastikan path ini benar

// ---------- Generic Hook (Tidak perlu diubah) ----------
export function useSupabaseData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAsync = async (
    operation: () => Promise<any>
  ): Promise<any | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await operation();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleAsync,
  };
}

// ---------- Employees ----------
export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      // --- PERBAIKAN: Panggil fungsi 'getEmployees' secara langsung ---
      const data = await getEmployees();
      setEmployees(data || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch employees'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return { employees, loading, error, refetch: fetchEmployees };
}

// ---------- Leave Requests ----------

// ---------- Attendance ----------

// ---------- Documents ----------
export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        // --- PERBAIKAN: Panggil fungsi 'getDocuments' secara langsung ---
        const data = await getDocuments();
        setDocuments(data || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch documents'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  return { documents, loading, error };
}

// ---------- Notifications ----------
