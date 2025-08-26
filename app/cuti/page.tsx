"use client"

import { useState } from "react"
import { Search, Download, Eye, CheckCircle, XCircle, Calendar, Clock, TrendingUp, FileText } from "lucide-react"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sidebar } from "../components/layout/sidebar"
import { Header } from "../components/layout/header"

const leaveRequests = [
  {
    id: 1,
    name: "John Doe",
    department: "Finance",
    type: "Annual Leave",
    startDate: "2025-01-15",
    endDate: "2025-01-17",
    days: 3,
    status: "Pending",
    reason: "Family vacation",
    remainingQuota: 7,
    documents: ["vacation-plan.pdf"],
    avatar: "JD",
    submittedDate: "2025-01-08",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    department: "IT",
    type: "Sick Leave",
    startDate: "2025-01-20",
    endDate: "2025-01-22",
    days: 3,
    status: "Approved",
    reason: "Medical treatment",
    remainingQuota: 4,
    documents: ["doctor-note.pdf", "prescription.jpg"],
    avatar: "SW",
    submittedDate: "2025-01-07",
  },
  {
    id: 3,
    name: "Mike Johnson",
    department: "Marketing",
    type: "Emergency Leave",
    startDate: "2025-01-25",
    endDate: "2025-01-25",
    days: 1,
    status: "Rejected",
    reason: "Personal emergency",
    remainingQuota: 8,
    documents: [],
    avatar: "MJ",
    submittedDate: "2025-01-06",
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
]

const leaveStats = {
  totalRequests: 45,
  pendingRequests: 8,
  approvedRequests: 32,
  rejectedRequests: 5,
  avgProcessingTime: "2.3 days",
}

export default function CutiPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedDepartment, setSelectedDepartment] = useState("All")

  const statuses = ["All", "Pending", "Approved", "Rejected"]
  const departments = ["All", "Finance", "IT", "Marketing", "HR"]

  const filteredRequests = leaveRequests.filter((request) => {
    const matchesSearch = request.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "All" || request.status === selectedStatus
    const matchesDepartment = selectedDepartment === "All" || request.department === selectedDepartment
    return matchesSearch && matchesStatus && matchesDepartment
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "Approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "Rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleApprove = (id: number) => {
    console.log(`Approved leave request ${id}`)
  }

  const handleReject = (id: number) => {
    console.log(`Rejected leave request ${id}`)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header title="Leave Management" subtitle="Manage employee leave requests and quotas" />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-r from-blue-400 to-blue-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Requests</p>
                  <p className="text-3xl font-bold">{leaveStats.totalRequests}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100">Pending</p>
                  <p className="text-3xl font-bold">{leaveStats.pendingRequests}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-400 to-green-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Approved</p>
                  <p className="text-3xl font-bold">{leaveStats.approvedRequests}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-400 to-purple-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Avg Processing</p>
                  <p className="text-3xl font-bold">{leaveStats.avgProcessingTime}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList>
            <TabsTrigger value="requests">Leave Requests</TabsTrigger>
            <TabsTrigger value="quotas">Employee Quotas</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Leave Requests</CardTitle>
                    <CardDescription>Review and manage employee leave applications</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search employees..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{request.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{request.name}</div>
                              <div className="text-sm text-gray-500">{request.department}</div>
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
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell>
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
                                  <DialogTitle>Documents</DialogTitle>
                                  <DialogDescription>Files submitted by {request.name}</DialogDescription>
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
                        </TableCell>
                        <TableCell>
                          {request.status === "Pending" && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleApprove(request.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleReject(request.id)}>
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quotas">
            <Card>
              <CardHeader>
                <CardTitle>Employee Leave Quotas</CardTitle>
                <CardDescription>Overview of annual leave quotas for all employees</CardDescription>
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
                      <TableHead>Usage %</TableHead>
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
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${(employee.usedQuota / employee.totalQuota) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">
                              {Math.round((employee.usedQuota / employee.totalQuota) * 100)}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={employee.remainingQuota > 0 ? "default" : "destructive"}
                            className={employee.remainingQuota > 0 ? "bg-green-100 text-green-800" : ""}
                          >
                            {employee.remainingQuota > 0 ? "Available" : "Exhausted"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Leave Types Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Annual Leave</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                        <span className="text-sm font-medium">65%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Sick Leave</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: "25%" }}></div>
                        </div>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Emergency Leave</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{ width: "10%" }}></div>
                        </div>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Leave Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">January</span>
                      <span className="text-sm font-medium">12 requests</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">December</span>
                      <span className="text-sm font-medium">18 requests</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">November</span>
                      <span className="text-sm font-medium">8 requests</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">October</span>
                      <span className="text-sm font-medium">15 requests</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
