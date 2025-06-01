"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useTheme } from "@/context/theme-context"
import { useAIRecommendations } from "@/context/ai-recommendations-context"
import AppLayout from "@/components/layout/app-layout"
import CBTExerciseCard from "@/components/practice/cbt-exercise-card"
import CategoryCard from "@/components/practice/category-card"
import {
  getExercisesByCategory,
  getRecommendedExercises,
  getAllCategoriesWithInfo,
  type CBTExercise,
} from "@/data/cbt-exercises"
import { getMoodEntries } from "@/lib/realtime-db"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLightbulb, faList } from "@fortawesome/free-solid-svg-icons"

export default function PracticePage() {
  const { user } = useAuth()
  const { theme } = useTheme()
  const { aiRecommendedExercises } = useAIRecommendations()
  const searchParams = useSearchParams()
  const exerciseId = searchParams.get("exercise")

  const isDark = theme === "dark"
  const [view, setView] = useState<"recommended" | "browse">("recommended")
  const [recommendedExercises, setRecommendedExercises] = useState<CBTExercise[]>([])
  const [loading, setLoading] = useState(true)
  const [highlightedExercise, setHighlightedExercise] = useState<string | null>(null)

  const categories = getAllCategoriesWithInfo()
  const categoriesWithExercises = categories.map((category) => ({
    category,
    exercises: getExercisesByCategory(category.name),
  }))

  // Fetch user's recent emotions for recommendations
  useEffect(() => {
    const fetchRecentEmotions = async () => {
      try {
        setLoading(true)

        // Get recent entries
        const entries = await getMoodEntries()

        // Extract emotions from entries
        const recentEmotions = entries
          .slice(0, 10) // Consider only the 10 most recent entries
          .map((entry) => entry.emotionName)

        // Combine AI recommendations with emotion-based recommendations
        let recommended: CBTExercise[] = []

        if (aiRecommendedExercises.length > 0) {
          // Use AI recommendations first
          recommended = [...aiRecommendedExercises]
          console.log(
            "Using AI recommendations:",
            recommended.map((e) => e.title),
          )

          // Add emotion-based recommendations if we need more
          if (recommended.length < 5) {
            const emotionBased = getRecommendedExercises(recentEmotions)
            const additionalExercises = emotionBased.filter(
              (exercise) => !recommended.some((rec) => rec.id === exercise.id),
            )
            recommended = [...recommended, ...additionalExercises].slice(0, 6)
          }
        } else {
          // Fallback to emotion-based recommendations
          console.log("No AI recommendations, using emotion-based")
          recommended = getRecommendedExercises(recentEmotions)
        }

        setRecommendedExercises(recommended)
      } catch (error) {
        console.error("Error fetching mood data:", error)
        // Fallback to default recommendations
        setRecommendedExercises(getRecommendedExercises([]))
      } finally {
        setLoading(false)
      }
    }

    fetchRecentEmotions()
  }, [aiRecommendedExercises]) // This dependency ensures it updates when AI recommendations change

  // Handle case where AI recommendations are already available when page loads
  useEffect(() => {
    if (aiRecommendedExercises.length > 0 && recommendedExercises.length === 0) {
      setRecommendedExercises(aiRecommendedExercises)
      setLoading(false)
    }
  }, [aiRecommendedExercises, recommendedExercises.length])

  // Handle exercise highlighting from URL
  useEffect(() => {
    if (exerciseId) {
      setHighlightedExercise(exerciseId)
      // Clear highlight after 3 seconds
      const timer = setTimeout(() => {
        setHighlightedExercise(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [exerciseId])

  const handleViewChange = (newView: "recommended" | "browse") => {
    setView(newView)
  }

  return (
    <AppLayout>
      <div className="p-4 max-w-4xl mx-auto min-h-screen" style={{ backgroundColor: isDark ? "#111827" : "#ffffff" }}>
        <h1 className="text-2xl font-bold text-evoke-purple mb-6">CBT Practice Exercises</h1>

        {/* View Toggle */}
        <div
          className="rounded-full p-1 flex mb-6 max-w-xs"
          style={{ backgroundColor: isDark ? "#1f2937" : "#f3f4f6" }}
        >
          <button
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              view === "recommended"
                ? "bg-evoke-purple text-white"
                : isDark
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleViewChange("recommended")}
          >
            <FontAwesomeIcon icon={faLightbulb} className="h-4 w-4" />
            <span>Recommended</span>
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              view === "browse"
                ? "bg-evoke-purple text-white"
                : isDark
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleViewChange("browse")}
          >
            <FontAwesomeIcon icon={faList} className="h-4 w-4" />
            <span>Browse</span>
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-evoke-purple"></div>
          </div>
        ) : (
          <>
            {view === "recommended" ? (
              <>
                {/* AI Recommendations Banner - REMOVED */}

                {recommendedExercises.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2">
                    {recommendedExercises.map((exercise) => (
                      <div
                        key={exercise.id}
                        className={`transition-all duration-300 ${
                          highlightedExercise === exercise.id
                            ? "ring-2 ring-evoke-purple ring-opacity-50 shadow-lg"
                            : ""
                        }`}
                      >
                        <CBTExerciseCard exercise={exercise} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    className="col-span-2 text-center py-12 rounded-lg"
                    style={{ backgroundColor: isDark ? "#1f2937" : "#f9fafb" }}
                  >
                    <p className="text-gray-600 dark:text-gray-300">
                      No personalized recommendations yet. Continue tracking your emotions to get tailored suggestions.
                    </p>
                  </div>
                )}
              </>
            ) : (
              // Browse view with category cards
              <div className="space-y-6">
                {categoriesWithExercises.map(({ category, exercises }) => (
                  <CategoryCard key={category.name} category={category} exercises={exercises} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </AppLayout>
  )
}
