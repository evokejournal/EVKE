"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "@/context/auth-context"
import LoginForm from "./login-form"
import SignupForm from "./signup-form"
import Header from "../layout/header"
import { DownloadAppBanner } from "./download-app-banner"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)
  const { signInWithGoogle } = useAuth()
  const router = useRouter()

  // Get the current hostname to display in the error message
  const currentHostname = typeof window !== "undefined" ? window.location.hostname : ""

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header is fixed at the top */}
      <Header />
      {/* Add padding at the top to account for the fixed header */}
      <div className="pt-16">
        {/* Banner below header */}
        <DownloadAppBanner />
      </div>
      <div className="flex flex-grow flex-col items-center justify-center bg-white dark:bg-gray-900 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                {isLogin ? (
                  <>
                    Sign in to <span className="font-museoModerno italic tracking-wide text-evoke-purple">EVOKE</span>
                  </>
                ) : (
                  <>
                    Create a new <span className="font-museoModerno italic tracking-wide text-evoke-purple">EVOKE</span>{" "}
                    account
                  </>
                )}
              </h2>
            </div>

            {authError && (
              <div className="mt-4 rounded-md bg-red-50 dark:bg-red-900/20 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FontAwesomeIcon
                      icon={faExclamationTriangle}
                      className="h-5 w-5 text-red-400 dark:text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Authentication Error</h3>
                    <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                      <p>{authError}</p>
                      {authError?.includes("unauthorized-domain") && (
                        <div className="mt-2 text-xs">
                          <p className="font-semibold">Developer Instructions:</p>
                          <ol className="list-decimal pl-5 mt-1 space-y-1">
                            <li>
                              Go to the{" "}
                              <a
                                href="https://console.firebase.google.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                              >
                                Firebase Console
                              </a>
                            </li>
                            <li>Select your project</li>
                            <li>Go to Authentication → Settings → Authorized domains</li>
                            <li>
                              Add{" "}
                              <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">
                                {currentHostname}
                              </code>{" "}
                              to the list
                            </li>
                          </ol>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 rounded-lg bg-white dark:bg-gray-800 p-6 shadow-md">
              {isLogin ? <LoginForm /> : <SignupForm />}

              <div className="mt-6 flex items-center justify-center">
                <div className="text-sm">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="font-medium text-evoke-purple hover:text-evoke-purple-light"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
