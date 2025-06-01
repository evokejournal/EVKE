"use client"

import { useState, useEffect } from "react"
import AppLayout from "@/components/layout/app-layout"
import BalanceGauge from "@/components/insights/balance-gauge"
import WeeklyRhythmChart from "@/components/insights/weekly-rhythm-chart"
import MonthlyFlowChart from "@/components/insights/monthly-flow-chart"
import YearlyEmotionsChart from "@/components/insights/yearly-emotions-chart"
import { getMoodEntries } from "@/lib/realtime-db"
import { getEmotionMetadata } from "@/data/emotion-metadata"
import { useAuth } from "@/context/auth-context"
import { ErrorBoundary } from "react-error-boundary"
import AIInsights from "@/components/insights/ai-insights"
import PastAnalyses from "@/components/insights/past-analyses"
import { loadUserPreference, saveUserPreference } from "@/lib/storage-utils"

// Error fallback component
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Something went wrong:</h2>
      <p className="mb-4">{error.message || "An error occurred while loading the chart."}</p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Try again
      </button>
    </div>
  )
}

export default function InsightsPage() {
  const { user, authLoading } = useAuth()
  const [activeTab, setActiveTab] = useState<"week" | "month" | "year" | "history">("week")
  const [entries, setEntries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [balanceScores, setBalanceScores] = useState({
    week: 50,
    month: 50,
    year: 50,
  })
  const [topEmotions, setTopEmotions] = useState({
    week: [] as { name: string; count: number; color: string }[],
    month: [] as { name: string; count: number; color: string }[],
    year: [] as { name: string; count: number; color: string }[],
  })

  // Load user's preferred active tab from Firebase
  useEffect(() => {
    const loadActiveTab = async () => {
      if (!user?.uid) return
      try {
        const savedTab = await loadUserPreference<"week" | "month" | "year" | "history">(user.uid, "activeTab", "week")
        setActiveTab(savedTab)
      } catch (error) {
        console.error("Error loading active tab preference:", error)
      }
    }

    loadActiveTab()
  }, [user?.uid])

  // Save active tab preference to Firebase
  useEffect(() => {
    const saveActiveTab = async () => {
      if (!user?.uid) return
      try {
        await saveUserPreference(user.uid, "activeTab", activeTab)
      } catch (error) {
        console.error("Error saving active tab preference:", error)
      }
    }

    saveActiveTab()
  }, [activeTab, user?.uid])

  // Fetch entries and calculate balance scores
  useEffect(() => {
    const fetchEntries = async () => {
      if (authLoading) return
      if (!user) {
        setError("Please log in to view insights")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        // Fetch entries
        let allEntries = []
        try {
          allEntries = await getMoodEntries()
          // Ensure entries is an array
          if (!Array.isArray(allEntries)) {
            console.error("getMoodEntries did not return an array:", allEntries)
            allEntries = []
          }
        } catch (err) {
          console.error("Error fetching entries:", err)
          setError("Failed to load entries. Please try again later.")
          setLoading(false)
          return
        }

        setEntries(allEntries)

        try {
          // Calculate balance scores based on actual entries
          const now = new Date()
          const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)

          const weekEntries = allEntries.filter(
            (entry) => entry && entry.timestamp && new Date(entry.timestamp) >= oneWeekAgo,
          )
          const monthEntries = allEntries.filter(
            (entry) => entry && entry.timestamp && new Date(entry.timestamp) >= oneMonthAgo,
          )
          const yearEntries = allEntries.filter(
            (entry) => entry && entry.timestamp && new Date(entry.timestamp) >= oneYearAgo,
          )

          setBalanceScores({
            week: calculateAverageBalance(weekEntries),
            month: calculateAverageBalance(monthEntries),
            year: calculateAverageBalance(yearEntries),
          })

          setTopEmotions({
            week: getTopEmotions(weekEntries),
            month: getTopEmotions(monthEntries),
            year: getTopEmotions(yearEntries),
          })
        } catch (err) {
          console.error("Error calculating insights:", err)
          // Don't set an error here, just log it
        }
      } catch (error) {
        console.error("Error in fetchEntries:", error)
        setError("Failed to load insights data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchEntries()
  }, [user, authLoading])

  // Calculate average balance score from entries
  const calculateAverageBalance = (entries: any[]): number => {
    try {
      if (!entries || !entries.length) return 50 // Default to neutral if no entries

      let totalBalance = 0
      let count = 0

      entries.forEach((entry) => {
        if (!entry) return

        // Use the balance rating from the entry if available, otherwise get it from metadata
        if (entry.balanceRating) {
          totalBalance += entry.balanceRating
          count++
        } else if (entry.emotionName) {
          const metadata = getEmotionMetadata(entry.emotionName)
          if (metadata?.balanceRating) {
            totalBalance += metadata.balanceRating
            count++
          }
        }
      })

      return count > 0 ? Math.round(totalBalance / count) : 50
    } catch (err) {
      console.error("Error calculating average balance:", err)
      return 50
    }
  }

  // Get top emotions for a time period
  const getTopEmotions = (entries: any[]) => {
    try {
      if (!entries || !entries.length) return []

      const emotionCounts: Record<string, { count: number; color: string }> = {}

      entries.forEach((entry) => {
        if (!entry || !entry.emotionName) return

        if (!emotionCounts[entry.emotionName]) {
          const metadata = getEmotionMetadata(entry.emotionName)
          emotionCounts[entry.emotionName] = {
            count: 0,
            color: metadata?.color || "#CCCCCC",
          }
        }
        emotionCounts[entry.emotionName].count++
      })

      // Convert to array and sort
      const emotionsArray = Object.keys(emotionCounts).map((name) => ({
        name,
        count: emotionCounts[name].count,
        color: emotionCounts[name].color,
      }))

      // Sort by count (descending) and take top 3
      return emotionsArray.sort((a, b) => b.count - a.count).slice(0, 3)
    } catch (err) {
      console.error("Error getting top emotions:", err)
      return []
    }
  }

  const handleTabChange = (tab: "week" | "month" | "year" | "history") => {
    setActiveTab(tab)
  }

  // Filter entries based on active tab
  const getFilteredEntries = () => {
    try {
      if (!entries || !Array.isArray(entries)) return []

      const now = new Date()
      let cutoffDate: Date

      switch (activeTab) {
        case "week":
          cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          break
        case "month":
          cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          break
        case "year":
        case "history":
          cutoffDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
          break
      }

      return entries.filter((entry) => entry && entry.timestamp && new Date(entry.timestamp) >= cutoffDate)
    } catch (err) {
      console.error("Error filtering entries:", err)
      return []
    }
  }

  return (
    <AppLayout>
      <div className="min-h-[calc(100vh-4rem)] p-4 bg-gray-50 dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-evoke-purple mb-6 text-center">Insights</h1>

        {/* Time period tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-1 flex flex-wrap">
            <button
              onClick={() => handleTabChange("week")}
              className={`px-4 py-2 rounded-md transition-all ${
                activeTab === "week"
                  ? "bg-evoke-purple text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => handleTabChange("month")}
              className={`px-4 py-2 rounded-md transition-all ${
                activeTab === "month"
                  ? "bg-evoke-purple text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => handleTabChange("year")}
              className={`px-4 py-2 rounded-md transition-all ${
                activeTab === "year"
                  ? "bg-evoke-purple text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Past Year
            </button>
            <button
              onClick={() => handleTabChange("history")}
              className={`px-4 py-2 rounded-md transition-all ${
                activeTab === "history"
                  ? "bg-evoke-purple text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Past Insights
            </button>
          </div>
        </div>

        {error ? (
          <div className="max-w-4xl mx-auto bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 rounded-lg shadow-md">
            <p>{error}</p>
          </div>
        ) : loading && activeTab !== "history" ? (
          <div className="max-w-4xl mx-auto flex justify-center py-12">
            <div className="animate-pulse text-gray-400 dark:text-gray-500">Loading insights data...</div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            {activeTab !== "history" ? (
              <>
                {/* Balance gauge - no heading, just the gauge */}
                <div className="mt-2">
                  <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
                    <BalanceGauge balanceScore={balanceScores[activeTab]} />
                  </ErrorBoundary>
                </div>

                {/* Charts based on active tab - ABOVE the analysis */}
                <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
                  {activeTab === "week" && <WeeklyRhythmChart entries={getFilteredEntries()} />}

                  {activeTab === "month" && <MonthlyFlowChart entries={getFilteredEntries()} />}

                  {activeTab === "year" && <YearlyEmotionsChart entries={getFilteredEntries()} />}
                </ErrorBoundary>

                {/* Detailed Analysis - AFTER the charts */}
                <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
                  <AIInsights entries={getFilteredEntries()} timeframe={activeTab} />
                </ErrorBoundary>
              </>
            ) : (
              <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
                <PastAnalyses />
              </ErrorBoundary>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
