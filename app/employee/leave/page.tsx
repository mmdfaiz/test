"use client"

import { useState } from "react"
import { Plus, FileText, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { EmployeeSidebar } from "../../components/employee/employee-sidebar"
import { EmployeeHeader } from "../../components/employee/employee-header"
import { useNotifications } from "../../components/notifications/notification-provider"

const leaveRequests = [
  {
    id: 1,
    type: "Annual Leave",
    startDate: "2025-01-20",
    endDate: "2025-01-22",
    days: 3,
    status: "Approved",
    reason: "Family vacation",
    appliedDate: "2025-01-15",
    documents: ["vacation-plan.pdf"],
  },
  {
    id: 2,
    type: "Sick Leave",
    startDate: "2025-01-10",
    endDate: "2025-01-10",
    days: 1,
    status: "Approved",
    reason: "Medical checkup",
    appliedDate: "2025-01-09",
    documents: ["medical-certificate.pdf"],
  },
  {
    id: 3,
    type: "Annual Leave",
    startDate: "2025-01-25",
    endDate: "2025-01-27",
    days: 3,
    status: "Pending",
    reason: "Personal matters",
    appliedDate: "2025-01-08",
    documents: [],
  },
  {
    id: 4,
    type: "Emergency Leave",
    startDate: "2025-01-05",
    endDate: "2025-01-05",
    days: 1,
    status: "Rejected",
    reason: "Family emergency",
    appliedDate: "2025-01-04",
    documents: [],
    rejectionReason: "Insufficient notice period",
  },
]

const leaveQuota = {
  annual: { total: 12, used: 6, remaining: 6 },
  sick: { total: 12, used: 2, remaining: 10 },
  emergency: { total: 3, used: 1, remaining: 2 },
}

export default function EmployeeLeavePage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [leaveForm, setLeaveForm] = useState({
    type: "",
    startDate: "",
    endDate: "",
    reason: "",
  })
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const { addNotification } = useNotifications()

  const handleSubmit = () => {
    if (!leaveForm.type || !leaveForm.startDate || !leaveForm.endDate || !leaveForm.reason) {
      alert("Please fill in all required fields")
      return
    }

    const startDate = new Date(leaveForm.startDate)
    const endDate = new Date(leaveForm.endDate)
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1

    addNotification({
      type: "leave_request",
      title: "New Leave Request",
      message: `${leaveForm.type} request for ${days} days submitted${selectedFiles ? ` with ${selectedFiles.length} document(s)` : ""}`,
      employeeName: "John Doe",
      employeeAvatar: "JD",
      isRead: false,
      read: false,
      user_id: "12345",
      actionRequired: true,
      metadata: {
        requestId: Math.floor(Math.random() * 1000),
        leaveType: leaveForm.type,
        days: days,
      },
    })

    setDialogOpen(false)
    setLeaveForm({ type: "", startDate: "", endDate: "", reason: "" })
    setSelectedFiles(null)
    alert("Leave request submitted successfully!")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "Rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <EmployeeSidebar />
      <div className="flex-1 p-6">
        <EmployeeHeader title="Leave Management" subtitle="Manage your leave requests and track your quota" />

        {/* Leave Quota Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Annual Leave</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-bold text-blue-600">{leaveQuota.annual.remaining}</span>
                <span className="text-sm text-gray-600">days left</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(leaveQuota.annual.used / leaveQuota.annual.total) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {leaveQuota.annual.used} of {leaveQuota.annual.total} used
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Sick Leave</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-bold text-green-600">{leaveQuota.sick.remaining}</span>
                <span className="text-sm text-gray-600">days left</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${(leaveQuota.sick.used / leaveQuota.sick.total) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {leaveQuota.sick.used} of {leaveQuota.sick.total} used
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Emergency Leave</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-bold text-orange-600">{leaveQuota.emergency.remaining}</span>
                <span className="text-sm text-gray-600">days left</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-600 h-2 rounded-full"
                  style={{ width: `${(leaveQuota.emergency.used / leaveQuota.emergency.total) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {leaveQuota.emergency.used} of {leaveQuota.emergency.total} used
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Leave Requests */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Leave Requests</CardTitle>
                <CardDescription>View your leave request history and status</CardDescription>
              </div>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Request
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Submit Leave Request</DialogTitle>
                    <DialogDescription>Fill out the form to request time off</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Leave Type *</Label>
                      <Select
                        value={leaveForm.type}
                        onValueChange={(value) => setLeaveForm({ ...leaveForm, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select leave type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Annual Leave">Annual Leave</SelectItem>
                          <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                          <SelectItem value="Emergency Leave">Emergency Leave</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Start Date *</Label>
                        <Input
                          type="date"
                          value={leaveForm.startDate}
                          onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>End Date *</Label>
                        <Input
                          type="date"
                          value={leaveForm.endDate}
                          onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Reason *</Label>
                      <Textarea
                        value={leaveForm.reason}
                        onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                        placeholder="Please provide a reason for your leave"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="documents">Supporting Documents (Optional)</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <Input
                          id="documents"
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          className="hidden"
                          onChange={(e) => setSelectedFiles(e.target.files)}
                        />
                        <Label htmlFor="documents" className="cursor-pointer">
                          <span className="text-blue-600 hover:text-blue-700">Click to upload</span> or drag and drop
                        </Label>
                        <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, JPG, PNG up to 5MB each</p>
                      </div>
                      {selectedFiles && selectedFiles.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium">Selected files:</p>
                          <ul className="text-sm text-gray-600">
                            {Array.from(selectedFiles).map((file, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <Button onClick={handleSubmit} className="w-full">
                      Submit Request
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaveRequests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{request.type}</h3>
                      <p className="text-sm text-gray-600">
                        {request.startDate} to {request.endDate} ({request.days} days)
                      </p>
                    </div>
                    {getStatusBadge(request.status)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Reason:</p>
                      <p className="text-sm text-gray-600">{request.reason}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Applied Date:</p>
                      <p className="text-sm text-gray-600">{request.appliedDate}</p>
                    </div>
                  </div>

                  {request.documents.length > 0 && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">Documents:</p>
                      <div className="flex flex-wrap gap-2">
                        {request.documents.map((doc, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <FileText className="w-3 h-3 mr-1" />
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {request.status === "Rejected" && request.rejectionReason && (
                    <div className="bg-red-50 border border-red-200 rounded p-3">
                      <p className="text-sm font-medium text-red-800">Rejection Reason:</p>
                      <p className="text-sm text-red-700">{request.rejectionReason}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
