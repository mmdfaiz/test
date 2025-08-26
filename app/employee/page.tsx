"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSupabaseAuth } from "@/hooks/use-supabase-auth"
import { EmployeeDashboard } from "../components/employee-dashboard"
import { EmployeeSidebar } from "../components/employee/employee-sidebar"
import { EmployeeHeader } from "../components/employee/employee-header"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function EmployeePage() {
  const { user, loading } = useSupabaseAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || user.role !== "employee")) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user || user.role !== "employee") {
    return null
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <EmployeeSidebar />
        <div className="flex-1 flex flex-col">
          <EmployeeHeader title="employee"/>
          <main className="flex-1 p-6">
            <EmployeeDashboard />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
