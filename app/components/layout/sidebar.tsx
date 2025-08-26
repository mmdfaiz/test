"use client"
import { useRouter, usePathname } from "next/navigation"
import { Calendar, Clock, FileText, Home, User, TestTube } from "lucide-react"

const sidebarItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: FileText, label: "Documents", path: "/documents" },
  { icon: Clock, label: "Attendance", path: "/attendance" },
  { icon: Calendar, label: "Cuti", path: "/cuti" },
  { icon: User, label: "Profile", path: "/profile" },
  { icon: TestTube, label: "Employee Simulator", path: "/employee-simulator" },
]

export function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="w-64 bg-slate-800 text-white p-6 min-h-screen">
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
            onClick={() => router.push(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              pathname === item.path ? "bg-slate-700 text-white" : "text-slate-300 hover:bg-slate-700 hover:text-white"
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
