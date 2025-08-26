"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NotificationCenter } from "../../components/notifications/notification-center"
import { useNotifications } from "../../components/notifications/notification-provider"
import { useRouter } from "next/navigation"

interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  const { notifications, markAsRead, markAllAsRead } = useNotifications()
  const router = useRouter()

  const handleNotificationClick = (notification: any) => {
    // Navigate to relevant page based on notification type
    switch (notification.type) {
      case "leave_request":
        router.push("/cuti")
        break
      case "attendance_request":
        router.push("/attendance")
        break
      case "document_upload":
        router.push("/documents")
        break
      case "profile_update":
        router.push("/profile")
        break
      default:
        break
    }
  }

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <div>
          <p className="text-sm text-gray-600">PT. MERPATI WAHANA RAYA</p>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <NotificationCenter
          notifications={notifications}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={markAllAsRead}
          onNotificationClick={handleNotificationClick}
        />
        <Avatar className="w-12 h-12">
          <AvatarImage src="/placeholder.svg?height=48&width=48" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
