"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, Download, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EmployeeSidebar } from "../../components/employee/employee-sidebar"
import { EmployeeHeader } from "../../components/employee/employee-header"

const attendanceData = [
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
    checkOut: "17:15 PM",
    hours: "9h 15m",
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
  { date: "2025-01-01", checkIn: "-", checkOut: "-", hours: "-", status: "Holiday", location: "-" },
]

export default function EmployeeAttendancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [monthFilter, setMonthFilter] = useState("2025-01")

  const filteredData = attendanceData.filter((record) => {
    const matchesSearch =
      record.date.includes(searchTerm) || record.status.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || record.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesMonth = record.date.startsWith(monthFilter)
    return matchesSearch && matchesStatus && matchesMonth
  })

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
      case "Holiday":
        return <Badge className="bg-blue-100 text-blue-800">Holiday</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const exportToExcel = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Date,Check In,Check Out,Hours,Status,Location\n" +
      filteredData
        .map(
          (record) =>
            `${record.date},${record.checkIn},${record.checkOut},${record.hours},${record.status},${record.location}`,
        )
        .join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `attendance_${monthFilter}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const stats = {
    totalDays: filteredData.length,
    presentDays: filteredData.filter((r) => r.status === "Present").length,
    lateDays: filteredData.filter((r) => r.status === "Late").length,
    absentDays: filteredData.filter((r) => r.status === "Absent").length,
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <EmployeeSidebar />
      <div className="flex-1 p-6">
        <EmployeeHeader title="Attendance Records" subtitle="Track your daily attendance and working hours" />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalDays}</p>
                  <p className="text-sm text-gray-600">Total Days</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.presentDays}</p>
                  <p className="text-sm text-gray-600">Present Days</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MapPin className="w-8 h-8 text-orange-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.lateDays}</p>
                  <p className="text-sm text-gray-600">Late Days</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-red-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.absentDays}</p>
                  <p className="text-sm text-gray-600">Absent Days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Export */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Attendance History</CardTitle>
                <CardDescription>View and export your attendance records</CardDescription>
              </div>
              <Button onClick={exportToExcel} className="w-fit">
                <Download className="w-4 h-4 mr-2" />
                Export to Excel
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by date or status..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="weekend">Weekend</SelectItem>
                  <SelectItem value="holiday">Holiday</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="month"
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
                className="w-full md:w-48"
              />
            </div>

            {/* Attendance Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium text-gray-900">Date</th>
                    <th className="text-left p-3 font-medium text-gray-900">Check In</th>
                    <th className="text-left p-3 font-medium text-gray-900">Check Out</th>
                    <th className="text-left p-3 font-medium text-gray-900">Hours</th>
                    <th className="text-left p-3 font-medium text-gray-900">Location</th>
                    <th className="text-left p-3 font-medium text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((record, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{record.date}</td>
                      <td className="p-3 text-gray-600">{record.checkIn}</td>
                      <td className="p-3 text-gray-600">{record.checkOut}</td>
                      <td className="p-3 text-gray-600">{record.hours}</td>
                      <td className="p-3 text-gray-600">{record.location}</td>
                      <td className="p-3">{getStatusBadge(record.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredData.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No attendance records found for the selected criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
