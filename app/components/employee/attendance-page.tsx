"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, CheckCircle, XCircle, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const attendanceHistory = [
  {
    date: "2025-01-08",
    checkIn: "08:05 AM",
    checkOut: "17:10 PM",
    hours: "9h 5m",
    status: "Present",
    location: "Jakarta Office",
  },
  {
    date: "2025-01-07",
    checkIn: "07:58 AM",
    checkOut: "16:45 PM",
    hours: "8h 47m",
    status: "Present",
    location: "Jakarta Office",
  },
  {
    date: "2025-01-06",
    checkIn: "08:15 AM",
    checkOut: "17:00 PM",
    hours: "8h 45m",
    status: "Late",
    location: "Jakarta Office",
  },
  { date: "2025-01-05", checkIn: "-", checkOut: "-", hours: "-", status: "Weekend", location: "-" },
  { date: "2025-01-04", checkIn: "-", checkOut: "-", hours: "-", status: "Weekend", location: "-" },
  {
    date: "2025-01-03",
    checkIn: "08:00 AM",
    checkOut: "16:50 PM",
    hours: "8h 50m",
    status: "Present",
    location: "Jakarta Office",
  },
  {
    date: "2025-01-02",
    checkIn: "08:10 AM",
    checkOut: "17:05 PM",
    hours: "8h 55m",
    status: "Present",
    location: "Jakarta Office",
  },
]

const monthlyStats = {
  totalWorkingDays: 22,
  presentDays: 20,
  absentDays: 0,
  lateDays: 2,
  avgHours: "8h 45m",
  totalHours: "175h 30m",
}

export function EmployeeAttendancePage() {
  const [selectedMonth, setSelectedMonth] = useState("2025-01")
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [currentLocation, setCurrentLocation] = useState("Jakarta Office")

  const handleCheckIn = () => {
    setIsCheckedIn(true)
    console.log("Checked in at", new Date().toLocaleTimeString())
  }

  const handleCheckOut = () => {
    setIsCheckedIn(false)
    console.log("Checked out at", new Date().toLocaleTimeString())
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Present":
        return <Badge className="bg-green-100 text-green-800">Present</Badge>
      case "Late":
        return <Badge className="bg-orange-100 text-orange-800">Late</Badge>
      case "Absent":
        return <Badge variant="destructive">Absent</Badge>
      case "Weekend":
        return <Badge variant="outline">Weekend</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
        <p className="text-gray-600">Track your daily attendance and working hours</p>
      </div>

      {/* Check In/Out Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-blue-100">Current Status</p>
                <p className="text-2xl font-bold">{isCheckedIn ? "Checked In" : "Not Checked In"}</p>
                <p className="text-blue-200 text-sm">{currentLocation}</p>
              </div>
              <Clock className="w-12 h-12 text-blue-200" />
            </div>
            {isCheckedIn ? (
              <Button onClick={handleCheckOut} className="w-full bg-white text-blue-600 hover:bg-blue-50">
                <CheckCircle className="w-4 h-4 mr-2" />
                Check Out
              </Button>
            ) : (
              <Button onClick={handleCheckIn} className="w-full bg-white text-blue-600 hover:bg-blue-50">
                <MapPin className="w-4 h-4 mr-2" />
                Check In
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Check In Time</span>
                <span className="font-medium">08:05 AM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Working Hours</span>
                <span className="font-medium">6h 45m</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <Badge className="bg-green-100 text-green-800">On Time</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Location</span>
                <span className="font-medium">{currentLocation}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold">{monthlyStats.totalWorkingDays}</p>
            <p className="text-xs text-gray-600">Working Days</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{monthlyStats.presentDays}</p>
            <p className="text-xs text-gray-600">Present</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <XCircle className="w-4 h-4 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-red-600">{monthlyStats.absentDays}</p>
            <p className="text-xs text-gray-600">Absent</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <AlertCircle className="w-4 h-4 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-600">{monthlyStats.lateDays}</p>
            <p className="text-xs text-gray-600">Late</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">{monthlyStats.avgHours}</p>
            <p className="text-xs text-gray-600">Avg Hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock className="w-4 h-4 text-indigo-600" />
            </div>
            <p className="text-2xl font-bold text-indigo-600">{monthlyStats.totalHours}</p>
            <p className="text-xs text-gray-600">Total Hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Attendance History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Attendance History</CardTitle>
              <CardDescription>Your daily attendance records</CardDescription>
            </div>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025-01">January 2025</SelectItem>
                <SelectItem value="2024-12">December 2024</SelectItem>
                <SelectItem value="2024-11">November 2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Working Hours</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceHistory.map((record, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{record.date}</TableCell>
                  <TableCell>{record.checkIn}</TableCell>
                  <TableCell>{record.checkOut}</TableCell>
                  <TableCell>{record.hours}</TableCell>
                  <TableCell>{record.location}</TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
