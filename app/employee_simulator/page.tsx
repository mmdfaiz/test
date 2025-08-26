"use client"

import { LeaveRequestSimulator } from "../components/employee/leave-request-simulator"
import { Sidebar } from "../components/layout/sidebar"
import { Header } from "../components/layout/header"

export default function EmployeeSimulatorPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header
          title="Employee Request Simulator"
          subtitle="Test the notification system by simulating employee requests"
        />
        <div className="max-w-4xl mx-auto">
          <LeaveRequestSimulator />
        </div>
      </div>
    </div>
  )
}
