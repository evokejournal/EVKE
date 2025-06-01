"use client"

import { useState, useEffect } from "react"
import AppLayout from "@/components/layout/app-layout"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil, faSun, faBook } from "@fortawesome/free-solid-svg-icons"
import EntryCard from "@/components/mood/entry-card"
import GeneralEntryCard from "@/components/mood/general-entry-card"
import {
  faSmile,
  faSadTear,
  faAngry,
  faFaceFrown,
  faSurprise,
  faHeart,
  faFire,
  faMask,
  faPerson,
  faWater,
  faCodeBranch,
} from "@fortawesome/free-solid-svg-icons"
import { getRecentEntries } from "@/lib/realtime-db"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"

// Map emotion categories to their icons and colors
const emotionIcons: Record<string, any> = {
  joy: { icon: faSmile, color: "#4CAF50" },
  sadness: { icon: faSadTear, color: "#2196F3" },
  anger: { icon: faAngry, color: "#F44336" },
  fear: { icon: faFaceFrown, color: "#FFC107" },
  surprise: { icon: faSurprise, color: "#FF9800" },
  love: { icon: faHeart, color: "#9C27B0" },
  anticipation: { icon: faFire, color: "#FF80AB" },
  shame: { icon: faMask, color: "#9E9E9E" },
  empowerment: { icon: faPerson, color: "#795548" },
  calm: { icon: faWater, color: "#607D8B" },
  complex: { icon: faCodeBranch, color: "#BDBDBD" },
  // Add the full category names as fallbacks
  "Joy / Happiness": { icon: faSmile, color: "#4CAF50" },
  Sadness: { icon: faSadTear, color: "#2196F3" },
  Anger: { icon: faAngry, color: "#F44336" },
  "Fear / Anxiety": { icon: faFaceFrown, color: "#FFC107" },
  Surprise: { icon: faSurprise, color: "#FF9800" },
  "Love / Connection": { icon: faHeart, color: "#9C27B0" },
  "Anticipation / Desire": { icon: faFire, color: "#FF80AB" },
  "Shame / Guilt": { icon: faMask, color: "#9E9E9E" },
  "Empowerment / Confidence": { icon: faPerson, color: "#795548" },
  "Calm / Stillness": { icon: faWater, color: "#607D8B" },
  "Complex / Ambiguous": { icon: faCodeBranch, color: "#BDBDBD" },
}

// Define the default reflection questions as fallback
const defaultReflectionQuestions = [
  { id: "feeling", text: "How does this emotion feel in your body?" },
  { id: "trigger", text: "What triggered this emotion?" },
  { id: "response", text: "How did you respond to this emotion?" },
  { id: "insight", text: "What did you learn from this experience?" },
]

export default function HomePage() {
  const [recentEntries, setRecentEntries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  useEffect(() => {
    // Prefetch the mood entry page to make navigation faster
    router.prefetch("/home/mood-entry")
    router.prefetch("/home/general-entry")

    // Only fetch entries if the user is authenticated and auth loading is complete
    if (authLoading) {
      return // Still loading auth state, don't do anything yet
    }

    if (!user) {
      setLoading(false)
      setError("Please log in to view your entries")
      return
    }

    const fetchRecentEntries = async () => {
      try {
        setLoading(true)
        setError(null)
        const entries = await getRecentEntries(10)

        // Process entries to ensure they have all required fields
        const processedEntries = entries.map((entry) => {
          // For general entries, just return as is
          if (entry.type === "general") {
            return entry
          }

          // Process emotion entries
          const category = entry.category || entry.emotionCategory || "unknown"
          const emotionIcon = emotionIcons[category]?.icon || faSmile
          const emotionColor = emotionIcons[category]?.color || "#9E9E9E"

          // Use the actual questions from the entry, or fall back to defaults
          const actualQuestions = entry.questions || defaultReflectionQuestions

          // Create answers object from reflectionAnswers array if needed
          const answers = entry.answers || {}
          if (entry.reflectionAnswers && Array.isArray(entry.reflectionAnswers) && actualQuestions.length > 0) {
            actualQuestions.forEach((question, index) => {
              if (entry.reflectionAnswers[index]) {
                answers[question.id] = entry.reflectionAnswers[index]
              }
            })
          }

          return {
            ...entry,
            emotionName: entry.emotion || entry.emotionName || "Unknown",
            emotionCategory: category,
            emotionIcon,
            emotionColor,
            answers,
            questions: actualQuestions, // Use the actual questions that were asked
          }
        })

        setRecentEntries(processedEntries)
      } catch (error: any) {
        console.error("Error fetching recent entries:", error)
        setError(error.message || "Failed to load entries")
      } finally {
        setLoading(false)
      }
    }

    fetchRecentEntries()

    // Set up an interval to refresh entries every 30 seconds
    const refreshInterval = setInterval(() => {
      if (user) {
        fetchRecentEntries()
      }
    }, 30000)

    // Clean up the interval on component unmount
    return () => clearInterval(refreshInterval)
  }, [user, authLoading, router])

  // Render the appropriate card based on entry type - without edit/delete functionality
  const renderEntryCard = (entry) => {
    if (entry.type === "general") {
      return (
        <GeneralEntryCard
          key={entry.id}
          id={entry.id}
          title={entry.title || "General Entry"}
          content={entry.content}
          timestamp={new Date(entry.timestamp)}
        />
      )
    } else {
      return (
        <EntryCard
          key={entry.id}
          id={entry.id}
          emotionName={entry.emotionName}
          emotionCategory={entry.emotionCategory}
          emotionIcon={entry.emotionIcon}
          emotionColor={entry.emotionColor}
          timestamp={new Date(entry.timestamp)}
          answers={entry.answers}
          questions={entry.questions || defaultReflectionQuestions} // Use actual questions
          description={entry.description}
          reflectionAnswers={entry.reflectionAnswers}
        />
      )
    }
  }

  return (
    <AppLayout>
      <div className="pt-4 px-4 pb-20">
        <div className="space-y-4 max-w-md mx-auto">
          <Link
            href="/home/mood-entry"
            className="flex items-center justify-center w-full p-4 text-white bg-gradient-to-r from-evoke-purple to-teal-500 rounded-xl hover:opacity-90 transition-opacity"
          >
            <FontAwesomeIcon icon={faPencil} className="mr-2" />
            <span className="text-lg font-medium">Mood Entry</span>
          </Link>

          <Link
            href="/home/general-entry"
            className="flex items-center justify-center w-full p-4 text-white bg-gradient-to-l from-evoke-purple to-teal-500 rounded-xl hover:opacity-90 transition-opacity"
          >
            <FontAwesomeIcon icon={faBook} className="mr-2" />
            <span className="text-lg font-medium">General Entry</span>
          </Link>

          <Link
            href="/upgrade"
            className="flex items-center justify-center w-full p-3 text-white bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 hover:from-yellow-300 hover:via-amber-400 hover:to-orange-500 rounded-xl transition-all duration-200 shadow-lg"
          >
            <FontAwesomeIcon icon={faSun} className="mr-2 text-sm" />
            <span className="text-sm font-medium">
              Upgrade to <span className="font-museoModerno italic font-extrabold">EVOKE</span>+
            </span>
          </Link>

          <div className="mt-8">
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faBook} className="text-evoke-purple mr-2" />
              <h2 className="text-lg font-medium text-evoke-purple">Recent Entries</h2>
            </div>

            {loading ? (
              <div className="flex justify-center py-4">
                <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-t-2 border-evoke-purple"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 rounded-lg p-6 text-center">
                <p className="text-red-700 font-medium">{error}</p>
                <p className="text-red-500 text-sm mt-1">Please try again later</p>
              </div>
            ) : recentEntries.length > 0 ? (
              <div>{recentEntries.map((entry) => renderEntryCard(entry))}</div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
                <p className="text-gray-700 dark:text-gray-300 font-medium">No entries yet</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Your recent entries will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
