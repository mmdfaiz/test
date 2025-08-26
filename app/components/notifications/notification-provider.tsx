"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useSupabaseAuth } from "@/hooks/use-supabase-auth"
// --- PERBAIKAN: Impor fungsi secara langsung ---
import { getNotifications, markNotificationAsRead, type Notification } from "@/lib/supabase"
// Kita tidak perlu mengimpor 'supabase' client di sini lagi

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => Promise<void>
  markAllAsRead: () => Promise<void>
  addNotification: (notification: Omit<Notification, "id" | "created_at">) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { user } = useSupabaseAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    if (user) {
      const fetchNotifications = async () => {
        try {
          // --- PERBAIKAN: Panggil fungsi langsung ---
          const data = await getNotifications(user.id)
          setNotifications(data)
        } catch (error) {
          console.error("Failed to fetch notifications:", error)
        }
      }

      fetchNotifications()
    }
  }, [user])

  const handleMarkAsRead = async (id: string) => {
    try {
      // --- PERBAIKAN: Panggil fungsi langsung ---
      await markNotificationAsRead(id)
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true, isRead: true } : n)))
    } catch (error) {
      console.error("Failed to mark notification as read:", error)
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      const unreadIds = notifications.filter((n) => !n.isRead).map((n) => n.id)
      // --- PERBAIKAN: Panggil fungsi langsung dalam loop ---
      await Promise.all(unreadIds.map((id) => markNotificationAsRead(id)))
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true, isRead: true })))
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error)
    }
  }

  // Fungsi addNotification ini hanya untuk simulasi, jadi tidak perlu diubah
  const addNotification = (notification: Omit<Notification, "id" | "created_at">) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      created_at: new Date().toISOString(),
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    markAsRead: handleMarkAsRead,
    markAllAsRead: handleMarkAllAsRead,
    addNotification,
  }

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}