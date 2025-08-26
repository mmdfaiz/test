// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"
// import { useNotifications } from "../../components/notifications/notification-provider"
// import { Calendar, Send } from "lucide-react"

// export function LeaveRequestSimulator() {
//   const { addNotification } = useNotifications()
//   const [formData, setFormData] = useState({
//     employeeName: "",
//     leaveType: "",
//     startDate: "",
//     endDate: "",
//     reason: "",
//     days: 1,
//   })

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!formData.employeeName || !formData.leaveType || !formData.startDate || !formData.endDate) {
//       alert("Please fill in all required fields")
//       return
//     }

//     // Calculate days
//     const start = new Date(formData.startDate)
//     const end = new Date(formData.endDate)
//     const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1

//     // Add notification to admin
//     addNotification({
//       type: "leave_request",
//       title: "New Leave Request",
//       message: `${formData.leaveType} request for ${days} days submitted`,
//       employeeName: formData.employeeName,
//       employeeAvatar: formData.employeeName
//         .split(" ")
//         .map((n) => n[0])
//         .join("")
//         .toUpperCase(),
//       isRead: false,
//       actionRequired: true,
//       metadata: {
//         requestId: Math.floor(Math.random() * 1000),
//         leaveType: formData.leaveType,
//         days: days,
//       },
//     })

//     // Reset form
//     setFormData({
//       employeeName: "",
//       leaveType: "",
//       startDate: "",
//       endDate: "",
//       reason: "",
//       days: 1,
//     })

//     alert("Leave request submitted successfully! Check admin notifications.")
//   }

//   const handleAttendanceRequest = () => {
//     if (!formData.employeeName) {
//       alert("Please enter employee name first")
//       return
//     }

//     addNotification({
//       type: "attendance_request",
//       title: "Attendance Correction Request",
//       message: "Request to modify check-in time due to traffic jam",
//       employeeName: formData.employeeName,
//       employeeAvatar: formData.employeeName
//         .split(" ")
//         .map((n) => n[0])
//         .join("")
//         .toUpperCase(),
//       isRead: false,
//       actionRequired: true,
//       metadata: {
//         requestId: Math.floor(Math.random() * 1000),
//       },
//     })

//     alert("Attendance request submitted! Check admin notifications.")
//   }

//   const handleDocumentUpload = () => {
//     if (!formData.employeeName) {
//       alert("Please enter employee name first")
//       return
//     }

//     addNotification({
//       type: "document_upload",
//       title: "Document Uploaded",
//       message: "Medical certificate uploaded for leave request",
//       employeeName: formData.employeeName,
//       employeeAvatar: formData.employeeName
//         .split(" ")
//         .map((n) => n[0])
//         .join("")
//         .toUpperCase(),
//       isRead: false,
//       actionRequired: false,
//       metadata: {
//         documentName: "medical-certificate.pdf",
//       },
//     })

//     alert("Document uploaded! Check admin notifications.")
//   }

//   return (
//     <Card className="w-full max-w-2xl mx-auto">
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <Calendar className="w-5 h-5" />
//           Employee Request Simulator
//         </CardTitle>
//         <CardDescription>Simulate employee requests to test admin notifications</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="employeeName">Employee Name</Label>
//               <Input
//                 id="employeeName"
//                 value={formData.employeeName}
//                 onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
//                 placeholder="Enter employee name"
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="leaveType">Leave Type</Label>
//               <Select
//                 value={formData.leaveType}
//                 onValueChange={(value) => setFormData({ ...formData, leaveType: value })}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select leave type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Annual Leave">Annual Leave</SelectItem>
//                   <SelectItem value="Sick Leave">Sick Leave</SelectItem>
//                   <SelectItem value="Emergency Leave">Emergency Leave</SelectItem>
//                   <SelectItem value="Maternity Leave">Maternity Leave</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="startDate">Start Date</Label>
//               <Input
//                 id="startDate"
//                 type="date"
//                 value={formData.startDate}
//                 onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="endDate">End Date</Label>
//               <Input
//                 id="endDate"
//                 type="date"
//                 value={formData.endDate}
//                 onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
//                 required
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="reason">Reason</Label>
//             <Textarea
//               id="reason"
//               value={formData.reason}
//               onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
//               placeholder="Enter reason for leave"
//               rows={3}
//             />
//           </div>

//           <div className="flex flex-col sm:flex-row gap-2">
//             <Button type="submit" className="flex-1">
//               <Send className="w-4 h-4 mr-2" />
//               Submit Leave Request
//             </Button>
//             <Button type="button" variant="outline" onClick={handleAttendanceRequest}>
//               Submit Attendance Request
//             </Button>
//             <Button type="button" variant="outline" onClick={handleDocumentUpload}>
//               Upload Document
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }
// "use client"

// import type React from "react"
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"
// import { Calendar, Send } from "lucide-react"

// // Ganti dengan path relatif yang benar jika path alias masih bermasalah
// import { useNotifications } from "../../components/notifications/notification-provider"
// import { useToast } from "../../../../components/ui/use-toast"

// export function LeaveRequestSimulator() {
//   const { addNotification } = useNotifications()
//   const { toast } = useToast()
//   const [formData, setFormData] = useState({
//     employeeName: "Jane Doe",
//     leaveType: "Annual Leave",
//     startDate: "",
//     endDate: "",
//     reason: "",
//   })

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!formData.employeeName || !formData.leaveType || !formData.startDate || !formData.endDate) {
//       toast({
//         title: "Incomplete Form",
//         description: "Please fill in all required fields.",
//         variant: "destructive",
//       })
//       return
//     }

//     const start = new Date(formData.startDate)
//     const end = new Date(formData.endDate)
//     const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1

//     addNotification({
//       type: "leave_request",
//       title: "New Leave Request",
//       message: `${formData.leaveType} request for ${days} days submitted`,
//       employeeName: formData.employeeName,
//       employeeAvatar: formData.employeeName
//         .split(" ")
//         .map((n: string) => n[0])
//         .join("")
//         .toUpperCase(),
//       isRead: false, // <-- DIPERBAIKI
//       actionRequired: true,
//       metadata: {
//         requestId: Math.floor(Math.random() * 1000),
//         leaveType: formData.leaveType,
//         days: days,
//       },
//     })

//     toast({
//       title: "Success!",
//       description: "Leave request submitted. Check admin notifications.",
//     })
//   }

//   const handleAttendanceRequest = () => {
//     if (!formData.employeeName) {
//       toast({ title: "Employee Name Required", variant: "destructive" })
//       return
//     }

//     addNotification({
//       type: "attendance_request",
//       title: "Attendance Correction Request",
//       message: "Request to modify check-in time due to traffic jam",
//       employeeName: formData.employeeName,
//       employeeAvatar: formData.employeeName
//         .split(" ")
//         .map((n: string) => n[0])
//         .join("")
//         .toUpperCase(),
//       read: false, // <-- DIPERBAIKI
//       actionRequired: true,
//       metadata: {
//         requestId: Math.floor(Math.random() * 1000),
//       },
//     })

//     toast({ title: "Success!", description: "Attendance request submitted." })
//   }

//   const handleDocumentUpload = () => {
//     if (!formData.employeeName) {
//       toast({ title: "Employee Name Required", variant: "destructive" })
//       return
//     }

//     addNotification({
//       type: "document_upload",
//       title: "Document Uploaded",
//       message: "Medical certificate uploaded for leave request",
//       employeeName: formData.employeeName,
//       employeeAvatar: formData.employeeName
//         .split(" ")
//         .map((n: string) => n[0])
//         .join("")
//         .toUpperCase(),
//       read: false, // <-- DIPERBAIKI
//       actionRequired: false,
//       metadata: {
//         documentName: "medical-certificate.pdf",
//       },
//     })

//     toast({ title: "Success!", description: "Document uploaded." })
//   }

//   return (
//     <Card className="w-full max-w-2xl mx-auto">
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <Calendar className="w-5 h-5" />
//           Employee Request Simulator
//         </CardTitle>
//         <CardDescription>Simulate employee requests to test admin notifications</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="employeeName">Employee Name</Label>
//               <Input
//                 id="employeeName"
//                 value={formData.employeeName}
//                 onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
//                 placeholder="Enter employee name"
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="leaveType">Leave Type</Label>
//               <Select
//                 value={formData.leaveType}
//                 onValueChange={(value) => setFormData({ ...formData, leaveType: value })}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select leave type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Annual Leave">Annual Leave</SelectItem>
//                   <SelectItem value="Sick Leave">Sick Leave</SelectItem>
//                   <SelectItem value="Emergency Leave">Emergency Leave</SelectItem>
//                   <SelectItem value="Maternity Leave">Maternity Leave</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="startDate">Start Date</Label>
//               <Input
//                 id="startDate"
//                 type="date"
//                 value={formData.startDate}
//                 onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="endDate">End Date</Label>
//               <Input
//                 id="endDate"
//                 type="date"
//                 value={formData.endDate}
//                 onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
//                 required
//               />
//             </div>
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="reason">Reason</Label>
//             <Textarea
//               id="reason"
//               value={formData.reason}
//               onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
//               placeholder="Enter reason for leave"
//               rows={3}
//             />
//           </div>
//           <div className="flex flex-col sm:flex-row gap-2">
//             <Button type="submit" className="flex-1">
//               <Send className="w-4 h-4 mr-2" />
//               Submit Leave Request
//             </Button>
//             <Button type="button" variant="outline" onClick={handleAttendanceRequest}>
//               Submit Attendance Request
//             </Button>
//             <Button type="button" variant="outline" onClick={handleDocumentUpload}>
//               Upload Document
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }

"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Send } from "lucide-react"

// Ganti dengan path relatif yang benar jika path alias masih bermasalah
import { useNotifications } from "../../components/notifications/notification-provider"
import { useToast } from "@/app/components/ui/use-toast"

export function LeaveRequestSimulator() {
  const { addNotification } = useNotifications()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    employeeName: "Jane Doe",
    leaveType: "Annual Leave",
    startDate: "",
    endDate: "",
    reason: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.employeeName || !formData.leaveType || !formData.startDate || !formData.endDate) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const start = new Date(formData.startDate)
    const end = new Date(formData.endDate)
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1

    addNotification({
      user_id: "admin-1", // <-- DITAMBAHKAN
      type: "leave_request",
      title: "New Leave Request",
      message: `${formData.leaveType} request for ${days} days submitted`,
      employeeName: formData.employeeName,
      employeeAvatar: formData.employeeName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase(),
      read: false, // <-- DIPERBAIKI
      isRead: false, // <-- DIPERBAIKI dari isRead
      actionRequired: true,
      metadata: {
        requestId: Math.floor(Math.random() * 1000),
        leaveType: formData.leaveType,
        days: days,
      },
    })

    toast({
      title: "Success!",
      description: "Leave request submitted. Check admin notifications.",
    })
  }

  const handleAttendanceRequest = () => {
    if (!formData.employeeName) {
      toast({ title: "Employee Name Required", variant: "destructive" })
      return
    }

    addNotification({
      user_id: "admin-1", // <-- DITAMBAHKAN
      type: "attendance_request",
      title: "Attendance Correction Request",
      message: "Request to modify check-in time due to traffic jam",
      employeeName: formData.employeeName,
      employeeAvatar: formData.employeeName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase(),
        read: false, // <-- DITAMBAHKAN
      isRead: false,
      actionRequired: true,
      metadata: {
        requestId: Math.floor(Math.random() * 1000),
      },
    })

    toast({ title: "Success!", description: "Attendance request submitted." })
  }

  const handleDocumentUpload = () => {
    if (!formData.employeeName) {
      toast({ title: "Employee Name Required", variant: "destructive" })
      return
    }

    addNotification({
      user_id: "admin-1", // <-- DITAMBAHKAN
      type: "document_upload",
      title: "Document Uploaded",
      message: "Medical certificate uploaded for leave request",
      employeeName: formData.employeeName,
      employeeAvatar: formData.employeeName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase(),
      read: false, // <-- DITAMBAHKAN
      isRead: false,
      actionRequired: false,
      metadata: {
        documentName: "medical-certificate.pdf",
      },
    })

    toast({ title: "Success!", description: "Document uploaded." })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Employee Request Simulator
        </CardTitle>
        <CardDescription>Simulate employee requests to test admin notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="employeeName">Employee Name</Label>
              <Input
                id="employeeName"
                value={formData.employeeName}
                onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                placeholder="Enter employee name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="leaveType">Leave Type</Label>
              <Select
                value={formData.leaveType}
                onValueChange={(value) => setFormData({ ...formData, leaveType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Annual Leave">Annual Leave</SelectItem>
                  <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                  <SelectItem value="Emergency Leave">Emergency Leave</SelectItem>
                  <SelectItem value="Maternity Leave">Maternity Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              placeholder="Enter reason for leave"
              rows={3}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button type="submit" className="flex-1">
              <Send className="w-4 h-4 mr-2" />
              Submit Leave Request
            </Button>
            <Button type="button" variant="outline" onClick={handleAttendanceRequest}>
              Submit Attendance Request
            </Button>
            <Button type="button" variant="outline" onClick={handleDocumentUpload}>
              Upload Document
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}