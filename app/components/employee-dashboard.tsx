"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Calendar, FileText } from "lucide-react"

// --- IMPOR YANG DIPERLUKAN ---
import { useSupabaseAuth } from "../../hooks/use-supabase-auth"
import {
  useAttendance,
  useLeaveRequests,
  useDocuments,
} from "../../hooks/use-supabase-data"
import { useToast } from "@/app/components/ui/use-toast"
import type { AttendanceRecord, LeaveRequest, Document } from "@/lib/supabase"

export function EmployeeDashboard() {
  const { user } = useSupabaseAuth()
  // --- PERBAIKAN: Kirim 'user.id' dan 'user.user_metadata.name' saat inisialisasi hook ---
  const { attendance, checkIn, checkOut, loading: attendanceLoading } = useAttendance(user?.id, user?.user_metadata?.name)
  const { leaveRequests } = useLeaveRequests(user?.id)
  const { documents } = useDocuments()
  const { toast } = useToast()

  const [isCheckedIn, setIsCheckedIn] = useState(false)
  // --- TAMBAHAN: State untuk menyimpan ID absensi hari ini ---
  const [todayAttendanceId, setTodayAttendanceId] = useState<string | null>(null);


  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]
    const todayRecord = attendance.find(
      (a: AttendanceRecord) => a.date === today && a.check_in && !a.check_out
    )
    setIsCheckedIn(!!todayRecord)
    // --- TAMBAHAN: Jika ada record hari ini, simpan ID-nya ---
    if (todayRecord) {
        setTodayAttendanceId(todayRecord.id);
    } else {
        setTodayAttendanceId(null);
    }
  }, [attendance])

  const handleCheckIn = async () => {
    // --- PERBAIKAN: 'checkIn' dari hook tidak lagi memerlukan argumen ---
    const result = await checkIn()
    if (result && result.check_in) {
      toast({
        title: "Checked In Successfully",
        description: `Welcome to work! Checked in at ${new Date(result.check_in).toLocaleTimeString()}`,
      })
    }
  }

  const handleCheckOut = async () => {
    // --- PERBAIKAN: 'checkOut' memerlukan ID dari record absensi yang mau ditutup ---
    if (!todayAttendanceId) {
        toast({
            title: "Check Out Failed",
            description: "No active check-in record found for today.",
            variant: "destructive"
        })
        return;
    }
    const result = await checkOut(todayAttendanceId)
    if (result) {
      setIsCheckedIn(false)
      toast({
        title: "Checked Out Successfully",
        description: `Have a great day! Worked for ${result.hours_worked || 0} hours.`,
      })
    }
  }

  const recentAttendance = attendance.slice(0, 5)
  const recentLeaveRequests = leaveRequests.slice(0, 3)
  const recentDocuments = documents.slice(0, 3)

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.user_metadata?.name?.split(" ")[0]}!</h1>
            <p className="text-blue-100 mt-1">
              {user?.user_metadata?.position} • {user?.user_metadata?.department}
            </p>
            <p className="text-blue-100 text-sm mt-2">
              Today is{" "}
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <Avatar className="h-16 w-16 border-2 border-white/20">
            <AvatarImage src={user?.user_metadata?.avatar_url|| "/placeholder.svg"} />
            <AvatarFallback className="bg-white/20 text-white text-lg">
              {user?.user_metadata?.name
                ?.split(" ")
                .map((n: string) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Quick Actions & Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex flex-col justify-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Attendance</p>
                <Button
                  size="sm"
                  className="mt-2 w-full"
                  onClick={isCheckedIn ? handleCheckOut : handleCheckIn}
                  disabled={attendanceLoading}
                  variant={isCheckedIn ? "destructive" : "default"}
                >
                  {attendanceLoading ? "Loading..." : isCheckedIn ? "Check Out" : "Check In"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Anda bisa menambahkan card lain di sini jika perlu */}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Attendance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Attendance
            </CardTitle>
            <CardDescription>Your latest attendance records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAttendance.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No recent attendance records.</p>
              ) : (
                recentAttendance.map((record: AttendanceRecord) => (
                  <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${ record.status === "present" ? "bg-green-500" : record.status === "late" ? "bg-orange-500" : "bg-gray-400"}`} />
                      <div>
                        <p className="text-sm font-medium">{new Date(record.date).toLocaleDateString("en-GB", { weekday: 'long', day: 'numeric', month: 'short' })}</p>
                        <p className="text-xs text-muted-foreground">
                          {record.check_in ? new Date(record.check_in).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A"} - 
                          {record.check_out ? new Date(record.check_out).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Active"}
                        </p>
                      </div>
                    </div>
                    <Badge variant={record.status === "present" ? "default" : record.status === "late" ? "secondary" : "outline"}>
                      {record.status}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Leave Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Your Leave Requests
            </CardTitle>
            <CardDescription>Status of your recent requests</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-3">
              {recentLeaveRequests.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No leave requests found.</p>
              ) : (
                recentLeaveRequests.map((request: LeaveRequest) => (
                  <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium capitalize">{request.leave_type} Leave</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(request.start_date).toLocaleDateString()} - {new Date(request.end_date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={request.status === "approved" ? "default" : request.status === "pending" ? "secondary" : "destructive"}>
                      {request.status}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Documents */}
      <div className="grid grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Company Documents
            </CardTitle>
            <CardDescription>Latest documents shared by the company</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentDocuments.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No documents available.</p>
              ) : (
                recentDocuments.map((doc: Document) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">{doc.title}</p>
                        <p className="text-xs text-muted-foreground">{doc.category}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" asChild>
                      <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                        View
                      </a>
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}