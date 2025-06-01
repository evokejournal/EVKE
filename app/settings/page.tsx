"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import AppLayout from "@/components/layout/app-layout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faSignOutAlt,
  faUser,
  faTrash,
  faCheck,
  faCalendarPlus,
  faShieldAlt,
  faFileContract,
} from "@fortawesome/free-solid-svg-icons"
import { deleteAllUserData, generateIncrementalTestData } from "@/utils/test-data"
import { CustomAlertDialog } from "@/components/ui/alert-dialog"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"

export default function SettingsPage() {
  const { user, signOut } = useAuth()
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [totalGenerated, setTotalGenerated] = useState(0)
  const [lastDaysBack, setLastDaysBack] = useState(0)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  // Modal states
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false)
  const [termsModalOpen, setTermsModalOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Error signing out:", error)
      setError("Failed to sign out. Please try again.")
    }
  }

  const handleGenerateTestData = async () => {
    if (!user) {
      setError("You must be logged in to generate test data")
      return
    }

    // Reset error
    setError("")

    try {
      setIsGenerating(true)
      setMessage("Generating 7 days of test data...")

      const result = await generateIncrementalTestData(user.uid)

      // Update counts
      setTotalGenerated((prev) => prev + result.count)
      setLastDaysBack(result.daysBack)
      setMessage(`Successfully generated ${result.count} entries! (${result.daysBack} days back from today)`)

      // Clear message after 5 seconds
      setTimeout(() => {
        setMessage("")
      }, 5000)
    } catch (error) {
      console.error("Error generating test data:", error)
      setError(`Error generating test data: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDeleteAllData = async () => {
    if (!user) {
      setError("You must be logged in to delete data")
      return
    }

    setDeleteConfirmOpen(true)
  }

  const confirmDeleteAllData = async () => {
    setError("")
    try {
      setIsDeleting(true)
      setMessage("Deleting all data...")

      await deleteAllUserData(user.uid)

      // Reset counts
      setTotalGenerated(0)
      setLastDaysBack(0)
      setMessage("All data has been deleted successfully.")

      setTimeout(() => {
        setMessage("")
      }, 5000)
    } catch (error) {
      console.error("Error deleting data:", error)
      setError(`Error deleting data: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsDeleting(false)
    }
  }

  // Reset states when user changes
  useEffect(() => {
    setTotalGenerated(0)
    setLastDaysBack(0)
    setMessage("")
    setError("")
  }, [user])

  // Custom Toggle Switch Component
  const ToggleSwitch = ({ checked, onChange, id }: { checked: boolean; onChange: () => void; id: string }) => {
    return (
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-evoke-purple focus:ring-offset-2 ${
          checked
            ? "bg-evoke-purple border-evoke-purple shadow-md"
            : "bg-gray-200 dark:bg-gray-600 border-gray-300 dark:border-gray-500"
        }`}
        role="switch"
        aria-checked={checked}
        id={id}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white border transition-transform duration-200 shadow-sm ${
            checked ? "translate-x-6 border-gray-200" : "translate-x-0.5 border-gray-300"
          }`}
        />
      </button>
    )
  }

  return (
    <AppLayout>
      <div className="flex min-h-[calc(100vh-4rem)] flex-col p-4 bg-white dark:bg-gray-900">
        <h1 className="mb-6 text-2xl font-bold text-evoke-purple dark:text-primary-300">Settings</h1>

        {/* Profile Card */}
        <div className="mb-6 rounded-lg bg-white dark:bg-gray-800 p-4 shadow-md">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-evoke-purple text-white">
              <FontAwesomeIcon icon={faUser} className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Profile</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center rounded-md bg-red-50 dark:bg-red-900/30 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* App Settings */}
        <div className="mb-6 rounded-lg bg-white dark:bg-gray-800 p-4 shadow-md">
          <h3 className="mb-4 font-medium text-gray-900 dark:text-gray-100">App Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="notifications-toggle" className="text-gray-900 dark:text-gray-100 cursor-pointer">
                Notifications
              </label>
              <ToggleSwitch
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                id="notifications-toggle"
              />
            </div>
          </div>
        </div>

        {/* Legal & Privacy */}
        <div className="mb-6 rounded-lg bg-white dark:bg-gray-800 p-4 shadow-md">
          <h3 className="mb-4 font-medium text-gray-900 dark:text-gray-100">Legal & Privacy</h3>
          <div className="space-y-3">
            <button
              onClick={() => setPrivacyModalOpen(true)}
              className="flex w-full items-center justify-between rounded-md bg-gray-50 dark:bg-gray-700 p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="flex items-center">
                <FontAwesomeIcon icon={faShieldAlt} className="mr-3 h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-gray-100">Privacy Policy</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
            <button
              onClick={() => setTermsModalOpen(true)}
              className="flex w-full items-center justify-between rounded-md bg-gray-50 dark:bg-gray-700 p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="flex items-center">
                <FontAwesomeIcon icon={faFileContract} className="mr-3 h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-gray-100">Terms of Use</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
          </div>
        </div>

        {/* Data Management */}
        <div className="rounded-lg bg-white dark:bg-gray-800 p-4 shadow-md">
          <h3 className="mb-4 font-medium text-gray-900 dark:text-gray-100">Data Management</h3>

          {message && (
            <div className="mb-4 p-3 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 rounded-md bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <button
                onClick={handleGenerateTestData}
                disabled={isGenerating}
                className="flex w-full items-center justify-center rounded-md bg-evoke-purple p-2 text-white hover:bg-purple-700 disabled:opacity-50"
              >
                <FontAwesomeIcon
                  icon={isGenerating ? "spinner" : faCalendarPlus}
                  className={`mr-2 h-4 w-4 ${isGenerating ? "animate-spin" : ""}`}
                />
                {isGenerating ? "Generating..." : "Generate Test Data (7 Days)"}
              </button>

              {totalGenerated > 0 && (
                <div className="mt-2 space-y-1">
                  <div className="text-sm flex items-center text-green-600 dark:text-green-400">
                    <FontAwesomeIcon icon={faCheck} className="mr-1 h-3 w-3" />
                    <span>Total entries generated: {totalGenerated}</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Last batch: {lastDaysBack} days back from today
                  </div>
                </div>
              )}

              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Generates one mood entry per day for the past 7 days. Each press generates entries for the previous 7
                days before that.
              </p>
            </div>

            <button
              onClick={handleDeleteAllData}
              disabled={isDeleting}
              className="flex w-full items-center justify-center rounded-md bg-red-600 p-2 text-white hover:bg-red-700 disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faTrash} className="mr-2 h-4 w-4" />
              {isDeleting ? "Deleting..." : "Delete All Data"}
            </button>
          </div>
        </div>

        {/* Privacy Policy Modal */}
        <CustomAlertDialog
          isOpen={privacyModalOpen}
          onClose={() => setPrivacyModalOpen(false)}
          title="Privacy Policy"
          message="Our privacy policy details how we collect, use, and protect your personal information. We are committed to ensuring the privacy and security of your data. A full privacy policy will be available soon."
          buttonText="Close"
        />

        {/* Terms of Use Modal */}
        <CustomAlertDialog
          isOpen={termsModalOpen}
          onClose={() => setTermsModalOpen(false)}
          title="Terms of Use"
          message="By using EVOKE, you agree to our terms of service. These terms outline your rights and responsibilities as a user of our application. A complete terms of use document will be available soon."
          buttonText="Close"
        />

        {/* Delete Confirmation Modal */}
        <ConfirmDialog
          isOpen={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
          onConfirm={confirmDeleteAllData}
          title="Delete All Data"
          message="Are you sure you want to delete ALL your data? This action cannot be undone."
          confirmText="Delete All"
          cancelText="Cancel"
          variant="danger"
        />
      </div>
    </AppLayout>
  )
}
