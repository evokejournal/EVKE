"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import AuthPage from "@/components/auth/auth-page"
import { useAuth } from "@/context/auth-context"

export default function Auth() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push("/home")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    )
  }

  return <AuthPage />
}
