"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"

export default function SignupForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { signUpWithEmail } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      return setError("Passwords do not match")
    }

    setLoading(true)

    try {
      await signUpWithEmail(email, password)
      router.push("/home")
    } catch (error: any) {
      setError(error.message || "Failed to create an account")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">{error}</div>}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-black dark:text-white dark:bg-gray-800 placeholder-gray-400 shadow-sm focus:border-evoke-purple focus:outline-none focus:ring-evoke-purple sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-black dark:text-white dark:bg-gray-800 placeholder-gray-400 shadow-sm focus:border-evoke-purple focus:outline-none focus:ring-evoke-purple sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Confirm Password
        </label>
        <div className="mt-1">
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-black dark:text-white dark:bg-gray-800 placeholder-gray-400 shadow-sm focus:border-evoke-purple focus:outline-none focus:ring-evoke-purple sm:text-sm"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="flex w-full justify-center rounded-md border border-transparent bg-evoke-purple px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-evoke-purple-light focus:outline-none focus:ring-2 focus:ring-evoke-purple focus:ring-offset-2"
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </div>
    </form>
  )
}
