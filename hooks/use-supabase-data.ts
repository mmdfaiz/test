'use client';

import { useState, useEffect } from 'react';
// --- PERBAIKAN: Impor fungsi spesifik, BUKAN seluruh objek supabase ---
import {
  getEmployees,
  getLeaveRequests,
  submitLeaveRequest,
  getAttendanceRecords,
  checkIn,
  checkOut,
  getDocuments,
  getNotifications,
  markNotificationAsRead,
  type Employee,
  type LeaveRequest,
  type AttendanceRecord,
  type Document,
  type Notification,
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
export function useLeaveRequests(employeeId?: string) {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!employeeId) return;
    const fetchLeaveRequests = async () => {
      try {
        setLoading(true);
        // --- PERBAIKAN: Panggil fungsi 'getLeaveRequests' secara langsung ---
        const data = await getLeaveRequests(employeeId);
        setLeaveRequests(data || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch leave requests'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveRequests();
  }, [employeeId]);

  const submitNewLeaveRequest = async (
    request: Omit<LeaveRequest, 'id' | 'created_at' | 'updated_at'>
  ) => {
    try {
      setLoading(true);
      // --- PERBAIKAN: Panggil fungsi 'submitLeaveRequest' secara langsung ---
      const newRequest = await submitLeaveRequest(request);
      if (newRequest) {
        setLeaveRequests((prev) => [newRequest, ...prev]);
      }
      return newRequest;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to submit leave request'
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    leaveRequests,
    loading,
    error,
    submitLeaveRequest: submitNewLeaveRequest,
  };
}

// ---------- Attendance ----------
export function useAttendance(employeeId?: string, employeeName?: string) {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!employeeId) return;
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        // --- PERBAIKAN: Panggil fungsi 'getAttendanceRecords' secara langsung ---
        const data = await getAttendanceRecords(employeeId);
        setAttendance(data || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch attendance'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [employeeId]);

  const handleCheckIn = async () => {
    if (!employeeId || !employeeName) return null;
    try {
      setLoading(true);
      // --- PERBAIKAN: Panggil fungsi 'checkIn' secara langsung ---
      const newRecord = await checkIn(employeeId, employeeName);
      if (newRecord) {
        setAttendance((prev) => [newRecord, ...prev]);
      }
      return newRecord;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check in');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async (attendanceId: string) => {
    try {
      setLoading(true);
      // --- PERBAIKAN: Panggil fungsi 'checkOut' secara langsung ---
      const updatedRecord = await checkOut(attendanceId);
      if (updatedRecord) {
        setAttendance((prev) =>
          prev.map((a) => (a.id === updatedRecord.id ? updatedRecord : a))
        );
      }
      return updatedRecord;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check out');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    attendance,
    loading,
    error,
    checkIn: handleCheckIn,
    checkOut: handleCheckOut,
  };
}

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
export function useNotifications(userId?: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        // --- PERBAIKAN: Panggil fungsi 'getNotifications' secara langsung ---
        const data = await getNotifications(userId);
        setNotifications(data || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch notifications'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userId]);

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      // --- PERBAIKAN: Panggil fungsi 'markNotificationAsRead' secara langsung ---
      await markNotificationAsRead(notificationId);
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId ? { ...n, read: true, isRead: true } : n
        )
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to mark notification as read'
      );
    }
  };

  return { notifications, loading, error, markAsRead: handleMarkAsRead };
}
