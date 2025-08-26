"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, Clock, Calendar, FileText, User, LogOut, ChevronLeft, Building2 } from "lucide-react"
import { useSupabaseAuth } from "@/hooks/use-supabase-auth"
import { usePathname, useRouter } from "next/navigation"

const navigation = [
  {
    name: "Dashboard",
    href: "/employee",
    icon: Home,
  },
  {
    name: "Attendance",
    href: "/employee/attendance",
    icon: Clock,
  },
  {
    name: "Leave Requests",
    href: "/employee/leave",
    icon: Calendar,
  },
  {
    name: "Documents",
    href: "/employee/documents",
    icon: FileText,
  },
  {
    name: "Profile",
    href: "/employee/profile",
    icon: User,
  },
]

export function EmployeeSidebar() {
  const { user, logout } = useSupabaseAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="font-bold text-lg text-gray-900">PT. Merpati</h1>
                <p className="text-xs text-gray-500">Wahana Raya</p>
              </div>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8 p-0">
            <ChevronLeft className={cn("h-4 w-4 transition-transform", isCollapsed && "rotate-180")} />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Button
              key={item.name}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start",
                isCollapsed && "justify-center px-2",
                isActive && "bg-blue-600 text-white hover:bg-blue-700",
              )}
              asChild
            >
              <a href={item.href}>
                <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
                {!isCollapsed && item.name}
              </a>
            </Button>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        {!isCollapsed ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.user_metadata?.avatar_url || " "} />
                <AvatarFallback>
                  {user?.user_metadata?.name
                    ?.split(" ")
                    .map((n:any) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.user_metadata?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.user_metadata?.position}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.user_metadata?.avatar_url || "/placeholder.svg"} />
                <AvatarFallback className="text-xs">
                  {user?.user_metadata?.name
                    ?.split(" ")
                    .map((n:any) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <Button variant="outline" size="sm" className="w-full p-2 bg-transparent" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
