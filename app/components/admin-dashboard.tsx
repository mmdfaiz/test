"use client"

import { useState } from "react"
import {
  Calendar,
  Clock,
  FileText,
  Home,
  Plus,
  Search,
  User,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Header } from "../components/layout/header"

const sidebarItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: FileText, label: "Documents" },
  { icon: Clock, label: "Attendance" },
  { icon: Calendar, label: "Cuti" },
  { icon: User, label: "Profile" },
]

const attendanceData = [
  {
    id: 1,
    name: "Jane Cooper",
    department: "Finance",
    checkIn: "07:59 AM",
    status: "On Time",
    avatar: "JC",
  },
  {
    id: 2,
    name: "Esther Howard",
    department: "IT",
    checkIn: "08:20 AM",
    status: "Late",
    avatar: "EH",
  },
  {
    id: 3,
    name: "Wade Warren",
    department: "Marketing",
    checkIn: "08:05 AM",
    status: "On Time",
    avatar: "WW",
  },
  {
    id: 4,
    name: "Brooklyn Simmons",
    department: "HR",
    checkIn: "-",
    status: "Absent",
    avatar: "BS",
  },
]

const leaveRequests = [
  {
    id: 1,
    name: "John Doe",
    type: "Sick Leave",
    startDate: "2025-01-15",
    endDate: "2025-01-17",
    status: "Pending",
    reason: "Flu symptoms",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    type: "Annual Leave",
    startDate: "2025-01-20",
    endDate: "2025-01-25",
    status: "Pending",
    reason: "Family vacation",
  },
]

const pendingAttendance = [
  {
    id: 1,
    name: "Mike Johnson",
    date: "2025-01-08",
    reason: "Traffic jam",
    requestedTime: "09:30 AM",
    status: "Pending",
  },
  {
    id: 2,
    name: "Lisa Chen",
    date: "2025-01-07",
    reason: "Medical appointment",
    requestedTime: "10:00 AM",
    status: "Pending",
  },
]

const employeeQuotas = [
  {
    id: 1,
    name: "Jane Cooper",
    department: "Finance",
    totalQuota: 12,
    usedQuota: 8,
    remainingQuota: 4,
    avatar: "JC",
  },
  {
    id: 2,
    name: "Esther Howard",
    department: "IT",
    totalQuota: 12,
    usedQuota: 12,
    remainingQuota: 0,
    avatar: "EH",
  },
  {
    id: 3,
    name: "Wade Warren",
    department: "Marketing",
    totalQuota: 12,
    usedQuota: 5,
    remainingQuota: 7,
    avatar: "WW",
  },
  {
    id: 4,
    name: "Brooklyn Simmons",
    department: "HR",
    totalQuota: 15,
    usedQuota: 3,
    remainingQuota: 12,
    avatar: "BS",
  },
]

const leaveRequestsWithQuota = [
  {
    id: 1,
    name: "John Doe",
    type: "Annual Leave",
    startDate: "2025-01-15",
    endDate: "2025-01-17",
    days: 3,
    status: "Pending",
    reason: "Family vacation",
    remainingQuota: 7,
    documents: ["medical-certificate.pdf"],
    avatar: "JD",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    type: "Sick Leave",
    startDate: "2025-01-20",
    endDate: "2025-01-22",
    days: 3,
    status: "Pending",
    reason: "Medical treatment",
    remainingQuota: 4,
    documents: ["doctor-note.pdf", "prescription.jpg"],
    avatar: "SW",
  },
  {
    id: 3,
    name: "Mike Johnson",
    type: "Annual Leave",
    startDate: "2025-01-25",
    endDate: "2025-01-25",
    days: 1,
    status: "Pending",
    reason: "Personal matters",
    remainingQuota: 0,
    documents: [],
    avatar: "MJ",
  },
]

export function AdminDashboard() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [newEvent, setNewEvent] = useState("")

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const handleApproveLeave = (id: number) => {
    console.log(`Approved leave request ${id}`)
  }

  const handleRejectLeave = (id: number) => {
    console.log(`Rejected leave request ${id}`)
  }

  const handleApproveAttendance = (id: number) => {
    console.log(`Approved attendance request ${id}`)
  }

  const handleRejectAttendance = (id: number) => {
    console.log(`Rejected attendance request ${id}`)
  }

  const addCalendarEvent = () => {
    if (newEvent && selectedDate) {
      console.log(`Added event "${newEvent}" on ${selectedDate}`)
      setNewEvent("")
      setSelectedDate(null)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 bg-slate-800 rounded"></div>
          </div>
          <div>
            <h1 className="font-bold text-sm">PT. MERPATI WAHANA RAYA</h1>
          </div>
        </div>

        <nav className="space-y-2">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                item.active ? "bg-slate-700 text-white" : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <Header title="Good to see you again, Admin!" subtitle="Semoga harimu produktif dan lancar 🚀" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Content - 3 columns */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-r from-cyan-400 to-cyan-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-cyan-100">Total Employee</p>
                      <p className="text-3xl font-bold">90</p>
                    </div>
                    <Users className="w-8 h-8 text-cyan-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-pink-400 to-pink-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-pink-100">Pending Attendance</p>
                      <p className="text-3xl font-bold">{pendingAttendance.length}</p>
                    </div>
                    <AlertCircle className="w-8 h-8 text-pink-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-400 to-orange-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Leave Requests</p>
                      <p className="text-3xl font-bold">{leaveRequests.length}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-orange-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-400 to-purple-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">On Time Today</p>
                      <p className="text-3xl font-bold">85</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Attendance Status */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Attendance Status</CardTitle>
                    <CardDescription>Overview of Daily Attendance Records</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input placeholder="Search employees..." className="pl-10" />
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Check In Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceData.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{employee.avatar}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{employee.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.checkIn}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              employee.status === "On Time"
                                ? "default"
                                : employee.status === "Late"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {employee.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Leave Requests with Quota */}
            <Card>
              <CardHeader>
                <CardTitle>Leave Requests</CardTitle>
                <CardDescription>Pending leave applications with quota information</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Remaining Quota</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaveRequestsWithQuota.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{request.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{request.name}</div>
                              <div className="text-sm text-gray-500">{request.reason}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{request.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{request.startDate}</div>
                            <div className="text-gray-500">to {request.endDate}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{request.days} days</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={request.remainingQuota > 0 ? "default" : "destructive"}
                              className={request.remainingQuota > 0 ? "bg-green-100 text-green-800" : ""}
                            >
                              {request.remainingQuota} days left
                            </Badge>
                            {request.remainingQuota < request.days && (
                              <Badge variant="destructive" className="text-xs">
                                Exceeds quota
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {request.documents.length > 0 ? (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Eye className="w-4 h-4 mr-1" />
                                    {request.documents.length} files
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Uploaded Documents</DialogTitle>
                                    <DialogDescription>Documents submitted by {request.name}</DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-2">
                                    {request.documents.map((doc, index) => (
                                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                                        <FileText className="w-5 h-5 text-blue-500" />
                                        <span className="flex-1">{doc}</span>
                                        <Button variant="ghost" size="sm">
                                          <Download className="w-4 h-4" />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                </DialogContent>
                              </Dialog>
                            ) : (
                              <span className="text-sm text-gray-500">No documents</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleApproveLeave(request.id)}
                              className="bg-green-600 hover:bg-green-700"
                              disabled={request.remainingQuota < request.days}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleRejectLeave(request.id)}>
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Employee Quota Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Employee Leave Quota</CardTitle>
                <CardDescription>Overview of annual leave quota for all employees</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Total Quota</TableHead>
                      <TableHead>Used</TableHead>
                      <TableHead>Remaining</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employeeQuotas.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{employee.avatar}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{employee.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>
                          <span className="font-medium">{employee.totalQuota} days</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-gray-600">{employee.usedQuota} days</span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`font-medium ${employee.remainingQuota === 0 ? "text-red-600" : "text-green-600"}`}
                          >
                            {employee.remainingQuota} days
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={employee.remainingQuota > 0 ? "default" : "destructive"}
                            className={employee.remainingQuota > 0 ? "bg-green-100 text-green-800" : ""}
                          >
                            {employee.remainingQuota > 0 ? "Available" : "Quota Exhausted"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Pending Attendance Requests */}
            <Card>
              <CardHeader>
                <CardTitle>Pending Attendance Requests</CardTitle>
                <CardDescription>Late arrival and attendance modification requests</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Requested Time</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingAttendance.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.name}</TableCell>
                        <TableCell>{request.date}</TableCell>
                        <TableCell>{request.requestedTime}</TableCell>
                        <TableCell>{request.reason}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleApproveAttendance(request.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleRejectAttendance(request.id)}>
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Calendar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </CardTitle>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => navigateMonth("prev")}>
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => navigateMonth("next")}>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                    <div key={day} className="text-xs text-gray-500 text-center p-2 font-medium">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {emptyDays.map((day) => (
                    <div key={`empty-${day}`} className="p-2"></div>
                  ))}
                  {days.map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(day)}
                      className={`p-2 text-sm rounded hover:bg-gray-100 transition-colors ${
                        selectedDate === day ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Add Event Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Calendar Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                  <DialogDescription>
                    Create a new event for{" "}
                    {selectedDate
                      ? `${monthNames[currentDate.getMonth()]} ${selectedDate}, ${currentDate.getFullYear()}`
                      : "selected date"}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="event-title">Event Title</Label>
                    <Input
                      id="event-title"
                      value={newEvent}
                      onChange={(e) => setNewEvent(e.target.value)}
                      placeholder="Enter event title..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="event-date">Date</Label>
                    <Input
                      id="event-date"
                      value={
                        selectedDate
                          ? `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`
                          : ""
                      }
                      readOnly
                    />
                  </div>
                  <div>
                    <Label htmlFor="event-description">Description</Label>
                    <Textarea id="event-description" placeholder="Event description (optional)..." />
                  </div>
                  <Button onClick={addCalendarEvent} className="w-full">
                    Add Event
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Working Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Working Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Working Hours MWR</span>
                  <span className="text-sm font-medium">8:00 AM - 16:50 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Working Hours EDV</span>
                  <span className="text-sm font-medium">8:00 AM - 16:50 PM</span>
                </div>
              </CardContent>
            </Card>

            {/* Employee Stats */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Employee by Gender</CardTitle>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold">90</div>
                </div>
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#ec4899"
                      strokeWidth="3"
                      strokeDasharray="50, 100"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      strokeDasharray="50, 100"
                      strokeDashoffset="-50"
                    />
                  </svg>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Male</span>
                    </div>
                    <span className="text-sm font-medium">50%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                      <span className="text-sm">Female</span>
                    </div>
                    <span className="text-sm font-medium">50%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
