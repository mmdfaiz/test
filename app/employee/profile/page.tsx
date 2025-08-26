"use client"

import { useState } from "react"
import { User, MapPin, Calendar, Building, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { EmployeeSidebar } from "../../components/employee/employee-sidebar"
import { EmployeeHeader } from "../../components/employee/employee-header"

const employeeData = {
  name: "John Doe",
  employeeId: "EMP001",
  email: "john.doe@merpati.com",
  phone: "+62 812-3456-7890",
  address: "Jl. Sudirman No. 123, Jakarta Selatan",
  joinDate: "2023-01-15",
  department: "IT Department",
  position: "Software Developer",
  manager: "Jane Smith",
  workLocation: "Jakarta Office",
  emergencyContact: {
    name: "Jane Doe",
    relationship: "Spouse",
    phone: "+62 812-9876-5432",
  },
  avatar: "JD",
}

const employmentStats = {
  totalDaysWorked: 365,
  totalLeavesTaken: 8,
  averageWorkingHours: 8.5,
  performanceRating: "Excellent",
}

export default function EmployeeProfilePage() {
  const [showPassword, setShowPassword] = useState(false)
  const [profileForm, setProfileForm] = useState({
    name: employeeData.name,
    email: employeeData.email,
    phone: employeeData.phone,
    address: employeeData.address,
    emergencyContactName: employeeData.emergencyContact.name,
    emergencyContactPhone: employeeData.emergencyContact.phone,
    emergencyContactRelationship: employeeData.emergencyContact.relationship,
  })
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    leaveUpdates: true,
    attendanceReminders: true,
    systemUpdates: false,
  })

  const handleProfileUpdate = () => {
    alert("Profile updated successfully!")
  }

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords don't match!")
      return
    }
    alert("Password changed successfully!")
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  const handleNotificationUpdate = () => {
    alert("Notification preferences updated!")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <EmployeeSidebar />
      <div className="flex-1 p-6">
        <EmployeeHeader title="My Profile" subtitle="Manage your personal information and account settings" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" />
                  <AvatarFallback className="text-2xl">{employeeData.avatar}</AvatarFallback>
                </Avatar>
                <CardTitle>{employeeData.name}</CardTitle>
                <CardDescription>{employeeData.position}</CardDescription>
                <Badge className="w-fit mx-auto mt-2">{employeeData.employeeId}</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Building className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{employeeData.department}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{employeeData.workLocation}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Joined {employeeData.joinDate}</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Reports to {employeeData.manager}</span>
                </div>
              </CardContent>
            </Card>

            {/* Employment Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Employment Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Days Worked</span>
                  <span className="font-semibold">{employmentStats.totalDaysWorked}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Leaves Taken</span>
                  <span className="font-semibold">{employmentStats.totalLeavesTaken}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg. Hours/Day</span>
                  <span className="font-semibold">{employmentStats.averageWorkingHours}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Performance</span>
                  <Badge className="bg-green-100 text-green-800">{employmentStats.performanceRating}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Settings */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="profile" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="employment">Employment</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile" className="space-y-6 mt-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={profileForm.name}
                            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profileForm.email}
                            onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={profileForm.phone}
                            onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="address">Address</Label>
                          <Textarea
                            id="address"
                            value={profileForm.address}
                            onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="emergencyName">Contact Name</Label>
                          <Input
                            id="emergencyName"
                            value={profileForm.emergencyContactName}
                            onChange={(e) => setProfileForm({ ...profileForm, emergencyContactName: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="emergencyPhone">Contact Phone</Label>
                          <Input
                            id="emergencyPhone"
                            value={profileForm.emergencyContactPhone}
                            onChange={(e) => setProfileForm({ ...profileForm, emergencyContactPhone: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="relationship">Relationship</Label>
                          <Input
                            id="relationship"
                            value={profileForm.emergencyContactRelationship}
                            onChange={(e) =>
                              setProfileForm({ ...profileForm, emergencyContactRelationship: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <Button onClick={handleProfileUpdate}>Update Profile</Button>
                  </TabsContent>

                  <TabsContent value="employment" className="space-y-6 mt-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Employment Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label>Employee ID</Label>
                            <Input value={employeeData.employeeId} disabled />
                          </div>
                          <div>
                            <Label>Department</Label>
                            <Input value={employeeData.department} disabled />
                          </div>
                          <div>
                            <Label>Position</Label>
                            <Input value={employeeData.position} disabled />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label>Join Date</Label>
                            <Input value={employeeData.joinDate} disabled />
                          </div>
                          <div>
                            <Label>Manager</Label>
                            <Input value={employeeData.manager} disabled />
                          </div>
                          <div>
                            <Label>Work Location</Label>
                            <Input value={employeeData.workLocation} disabled />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card>
                          <CardContent className="p-4 text-center">
                            <p className="text-2xl font-bold text-blue-600">{employmentStats.totalDaysWorked}</p>
                            <p className="text-sm text-gray-600">Days Worked</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4 text-center">
                            <p className="text-2xl font-bold text-green-600">{employmentStats.totalLeavesTaken}</p>
                            <p className="text-sm text-gray-600">Leaves Taken</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4 text-center">
                            <p className="text-2xl font-bold text-purple-600">{employmentStats.averageWorkingHours}h</p>
                            <p className="text-sm text-gray-600">Avg Hours</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4 text-center">
                            <Badge className="bg-green-100 text-green-800">{employmentStats.performanceRating}</Badge>
                            <p className="text-sm text-gray-600 mt-1">Rating</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="security" className="space-y-6 mt-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                      <div className="space-y-4 max-w-md">
                        <div>
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <div className="relative">
                            <Input
                              id="currentPassword"
                              type={showPassword ? "text" : "password"}
                              value={passwordForm.currentPassword}
                              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            type={showPassword ? "text" : "password"}
                            value={passwordForm.newPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            value={passwordForm.confirmPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                          />
                        </div>
                        <Button onClick={handlePasswordChange}>Change Password</Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Enable 2FA</p>
                          <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                        </div>
                        <Switch />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Active Sessions</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">Current Session</p>
                            <p className="text-sm text-gray-600">Chrome on Windows • Jakarta, Indonesia</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">Mobile App</p>
                            <p className="text-sm text-gray-600">Android App • Last active 2 hours ago</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Revoke
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="notifications" className="space-y-6 mt-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-gray-600">Receive notifications via email</p>
                          </div>
                          <Switch
                            checked={notifications.email}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">Push Notifications</p>
                            <p className="text-sm text-gray-600">Receive push notifications in browser</p>
                          </div>
                          <Switch
                            checked={notifications.push}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">SMS Notifications</p>
                            <p className="text-sm text-gray-600">Receive important updates via SMS</p>
                          </div>
                          <Switch
                            checked={notifications.sms}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Notification Types</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">Leave Updates</p>
                            <p className="text-sm text-gray-600">Notifications about leave request status</p>
                          </div>
                          <Switch
                            checked={notifications.leaveUpdates}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, leaveUpdates: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">Attendance Reminders</p>
                            <p className="text-sm text-gray-600">Daily check-in/check-out reminders</p>
                          </div>
                          <Switch
                            checked={notifications.attendanceReminders}
                            onCheckedChange={(checked) =>
                              setNotifications({ ...notifications, attendanceReminders: checked })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">System Updates</p>
                            <p className="text-sm text-gray-600">Notifications about system maintenance and updates</p>
                          </div>
                          <Switch
                            checked={notifications.systemUpdates}
                            onCheckedChange={(checked) =>
                              setNotifications({ ...notifications, systemUpdates: checked })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <Button onClick={handleNotificationUpdate}>Save Preferences</Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
