"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import BottomNavigation from "./bottom-navigation"
import Header from "./header"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    // Only redirect if auth loading is complete and user is not authenticated
    if (!loading) {
      if (!user) {
        router.push("/auth")
      }
      setAuthChecked(true)
    }
  }, [user, loading, router])

  if (loading || !authChecked) {
    return (
      <div className="flex h-screen items-center justify-center bg-white dark:bg-gray-900">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-evoke-purple dark:border-primary-300"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-1 pt-16 pb-16 bg-white dark:bg-gray-900">{children}</main>
      <BottomNavigation />
    </div>
  )
}
