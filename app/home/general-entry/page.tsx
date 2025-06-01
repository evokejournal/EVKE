"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AppLayout from "@/components/layout/app-layout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { saveGeneralEntry } from "@/lib/realtime-db"
import Link from "next/link"

export default function GeneralEntryPage() {
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim()) {
      setError("Please enter some content for your entry")
      return
    }

    try {
      setIsSaving(true)
      setError(null)

      await saveGeneralEntry({
        title: title.trim() || "General Entry",
        content,
        timestamp: Date.now(),
        type: "general",
      })

      // Navigate back to home after successful save
      router.push("/home")
    } catch (error) {
      console.error("Error saving general entry:", error)
      setError("Failed to save your entry. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <AppLayout>
      <div className="p-4 pb-20">
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-4">
            <Link href="/home" className="mr-2 text-gray-600 dark:text-gray-300">
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
            <h1 className="text-xl font-bold text-evoke-purple">General Entry</h1>
          </div>

          {error && <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title (Optional)
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your entry a title"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-evoke-purple focus:border-evoke-purple text-gray-800 dark:text-white bg-white dark:bg-gray-800"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                What's on your mind?
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your thoughts here..."
                rows={10}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-evoke-purple focus:border-evoke-purple text-gray-800 dark:text-white bg-white dark:bg-gray-800"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full flex items-center justify-center p-3 bg-evoke-purple text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {isSaving ? (
                <>
                  <span className="mr-2">Saving...</span>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faSave} className="mr-2" />
                  Save Entry
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  )
}
