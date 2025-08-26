import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/hooks/use-supabase-auth"
import { NotificationProvider } from "@/app/components/notifications/notification-provider"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PT. Merpati Wahana Raya - Admin Dashboard",
  description: "Employee management system for PT. Merpati Wahana Raya",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <NotificationProvider>
            {children}
            <Toaster position="top-right" richColors closeButton />
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
