"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Brain,
  Lightbulb,
  TrendingUp,
  Scale,
  Loader2,
  TestTube,
  Bug,
  Cloud,
  Waves,
  Palette,
  Sparkles,
  Mountain,
  Sun,
  Heart,
  Zap,
  Leaf,
  Star,
  Moon,
  Flame,
  Droplets,
  Wind,
  TreePine,
  Flower,
  Rainbow,
  ArrowRight,
  BookOpen,
} from "lucide-react"
import { getMoodAnalysis } from "@/app/actions/grok-analysis"
import { testGrokConnection, testGrokWithAISDK } from "@/app/actions/test-grok"
import { getCategoryInfo, type CBTExercise } from "@/data/cbt-exercises"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useAIRecommendations } from "@/context/ai-recommendations-context"
import { useAuth } from "@/context/auth-context"
import { saveToFirebase, loadFromFirebase, removeFromFirebase, saveAnalysisToHistory } from "@/lib/storage-utils"

// Helper function to get icon and meaning for colors
const getColorInfo = (color: string, index: number) => {
  const colorMappings = [
    { icon: Sun, meaning: "Energy & Vitality", description: "Represents your active, energetic moments" },
    { icon: Heart, meaning: "Love & Connection", description: "Shows your emotional bonds and relationships" },
    { icon: Zap, meaning: "Excitement & Passion", description: "Captures your most intense positive emotions" },
    { icon: Leaf, meaning: "Growth & Renewal", description: "Reflects your personal development journey" },
    { icon: Star, meaning: "Hope & Inspiration", description: "Highlights your aspirational and optimistic states" },
    { icon: Moon, meaning: "Calm & Reflection", description: "Represents your peaceful, introspective moments" },
    { icon: Flame, meaning: "Intensity & Drive", description: "Shows your passionate and determined phases" },
    { icon: Droplets, meaning: "Emotional Flow", description: "Captures the fluid nature of your feelings" },
    { icon: Wind, meaning: "Change & Movement", description: "Represents transitions and dynamic periods" },
    { icon: TreePine, meaning: "Stability & Grounding", description: "Shows your centered, stable emotional states" },
    { icon: Flower, meaning: "Beauty & Joy", description: "Highlights moments of appreciation and delight" },
    { icon: Rainbow, meaning: "Complexity & Harmony", description: "Represents the full spectrum of your emotions" },
  ]

  return colorMappings[index % colorMappings.length]
}

// Helper function to determine if text should be light or dark based on background color
const getContrastColor = (hexColor: string) => {
  // Convert hex to RGB
  const r = Number.parseInt(hexColor.slice(1, 3), 16)
  const g = Number.parseInt(hexColor.slice(3, 5), 16)
  const b = Number.parseInt(hexColor.slice(5, 7), 16)

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  return luminance > 0.5 ? "#000000" : "#ffffff"
}

interface AIInsightsProps {
  entries: any[]
  timeframe: "week" | "month" | "year"
}

interface AnalysisData {
  insights: string
  patterns: string[]
  recommendations: string[]
  emotionalTrends: string
  balanceAssessment: string
  visualMetaphors: string[]
  moodWeather: string
  energyFlow: string
  colorPalette: string[]
  personalGrowth: string
  recommendedExercises: CBTExercise[]
  timestamp?: number // When the analysis was generated
}

export default function AIInsights({ entries, timeframe }: AIInsightsProps) {
  const router = useRouter()
  const { user } = useAuth()
  const { setAIRecommendedExercises } = useAIRecommendations()
  const [analyses, setAnalyses] = useState<{
    week: AnalysisData | null
    month: AnalysisData | null
    year: AnalysisData | null
  }>({
    week: null,
    month: null,
    year: null,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [testResult, setTestResult] = useState<any>(null)
  const [debugMode, setDebugMode] = useState(false)

  // Load saved analyses from Firebase on component mount
  useEffect(() => {
    const loadSavedAnalyses = async () => {
      if (!user?.uid) return

      try {
        const [savedWeekAnalysis, savedMonthAnalysis, savedYearAnalysis] = await Promise.all([
          loadFromFirebase<AnalysisData | null>(user.uid, "week", null),
          loadFromFirebase<AnalysisData | null>(user.uid, "month", null),
          loadFromFirebase<AnalysisData | null>(user.uid, "year", null),
        ])

        // Only update state if we have saved analyses
        if (savedWeekAnalysis || savedMonthAnalysis || savedYearAnalysis) {
          setAnalyses({
            week: savedWeekAnalysis,
            month: savedMonthAnalysis,
            year: savedYearAnalysis,
          })

          // If we have a saved analysis for the current timeframe, set the AI recommendations
          const currentAnalysis =
            timeframe === "week" ? savedWeekAnalysis : timeframe === "month" ? savedMonthAnalysis : savedYearAnalysis
          if (currentAnalysis?.recommendedExercises && currentAnalysis.recommendedExercises.length > 0) {
            setAIRecommendedExercises(currentAnalysis.recommendedExercises)
            console.log(
              "Restored AI recommendations from Firebase:",
              currentAnalysis.recommendedExercises.map((e) => e.title).join(", "),
            )
          }
        }
      } catch (error) {
        console.error("Error loading saved analyses from Firebase:", error)
      }
    }

    loadSavedAnalyses()
  }, [user?.uid, timeframe, setAIRecommendedExercises])

  const testConnection = async () => {
    setLoading(true)
    setTestResult(null)
    try {
      console.log("Starting connection test...")
      const result = await testGrokConnection()
      console.log("Test result:", result)
      setTestResult(result)
    } catch (err) {
      console.error("Test failed:", err)
      setTestResult({
        success: false,
        error: "Test failed",
        details: err instanceof Error ? err.message : "Unknown error",
      })
    } finally {
      setLoading(false)
    }
  }

  const testAISDK = async () => {
    setLoading(true)
    try {
      const result = await testGrokWithAISDK()
      setTestResult(result)
    } catch (err) {
      setTestResult({ success: false, error: "SDK test failed" })
    } finally {
      setLoading(false)
    }
  }

  const generateAnalysis = async () => {
    if (entries.length === 0) {
      setError("No mood data available for analysis")
      return
    }

    if (!user?.uid) {
      setError("Please log in to generate analysis")
      return
    }

    setLoading(true)
    setError(null)
    setTestResult(null)

    try {
      const result = await getMoodAnalysis(entries, timeframe)

      if (result.success) {
        // Add timestamp to the analysis data
        const analysisWithTimestamp = {
          ...result.data,
          timestamp: Date.now(),
        }

        setAnalyses((prev) => ({
          ...prev,
          [timeframe]: analysisWithTimestamp,
        }))

        // Save to Firebase immediately
        await saveToFirebase(user.uid, timeframe, analysisWithTimestamp)

        // Also save to analysis history
        await saveAnalysisToHistory(user.uid, timeframe, analysisWithTimestamp)

        // Set AI recommendations in context for practice page
        if (result.data.recommendedExercises && result.data.recommendedExercises.length > 0) {
          setAIRecommendedExercises(result.data.recommendedExercises)
          console.log("Set AI recommendations:", result.data.recommendedExercises.map((e) => e.title).join(", "))
        }
      } else {
        setError(result.error || "Failed to generate analysis")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const navigateToExercise = (exerciseId: string) => {
    // Set the current analysis recommendations in context before navigating
    if (analyses[timeframe]?.recommendedExercises) {
      setAIRecommendedExercises(analyses[timeframe].recommendedExercises)
      console.log(
        "Navigating with recommendations:",
        analyses[timeframe].recommendedExercises.map((e) => e.title).join(", "),
      )
    }

    // Navigate to practice page with exercise ID
    router.push(`/practice?exercise=${exerciseId}`)
  }

  const refreshAnalysis = async () => {
    if (!user?.uid) return

    // Clear the current analysis for this timeframe
    setAnalyses((prev) => ({
      ...prev,
      [timeframe]: null,
    }))

    // Remove from Firebase
    await removeFromFirebase(user.uid, timeframe)

    // Generate a new analysis
    generateAnalysis()
  }

  const clearAllAnalyses = async () => {
    if (!user?.uid) return

    // Clear all analyses
    setAnalyses({
      week: null,
      month: null,
      year: null,
    })

    // Remove from Firebase
    await Promise.all([
      removeFromFirebase(user.uid, "week"),
      removeFromFirebase(user.uid, "month"),
      removeFromFirebase(user.uid, "year"),
    ])
  }

  return (
    <Card className="bg-white dark:bg-gray-900 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-gray-800 dark:text-gray-200">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-evoke-purple" />
            Detailed Analysis
          </div>
          <Button onClick={() => setDebugMode(!debugMode)} variant="ghost" size="sm">
            <Bug className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!analyses[timeframe] && !loading && (
          <div className="text-center py-6">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Get personalized insights about your patterns and journey using advanced analysis.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                onClick={generateAnalysis}
                className="bg-evoke-purple hover:bg-evoke-purple/90"
                disabled={entries.length === 0 || !user?.uid}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Analysis
              </Button>
              {debugMode && (
                <>
                  <Button onClick={testConnection} variant="outline" size="sm">
                    <TestTube className="h-4 w-4 mr-2" />
                    Test Direct API
                  </Button>
                  <Button onClick={testAISDK} variant="outline" size="sm">
                    <TestTube className="h-4 w-4 mr-2" />
                    Test SDK
                  </Button>
                </>
              )}
            </div>
            {entries.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Add some mood entries to get started</p>
            )}
            {!user?.uid && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Please log in to generate analysis</p>
            )}
          </div>
        )}

        {loading && (
          <div className="text-center py-6">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-evoke-purple mb-2" />
            <p className="text-gray-600 dark:text-gray-400">
              {testResult ? "Testing connection..." : "Analyzing your patterns..."}
            </p>
          </div>
        )}

        {testResult && (
          <div
            className={`p-4 rounded-lg ${testResult.success ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"}`}
          >
            <h4 className="font-semibold mb-2">
              {testResult.success ? "✅ Connection Test Successful" : "❌ Connection Test Failed"}
            </h4>
            <div className="text-sm">
              <pre className="overflow-auto whitespace-pre-wrap">{JSON.stringify(testResult, null, 2)}</pre>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 rounded-lg">
            <p>{error}</p>
            <div className="flex gap-2 mt-2">
              <Button onClick={generateAnalysis} variant="outline" size="sm">
                Try Again
              </Button>
              <Button onClick={testConnection} variant="outline" size="sm">
                Debug Connection
              </Button>
            </div>
          </div>
        )}

        {analyses[timeframe] && (
          <div className="space-y-6">
            {/* Analysis timestamp */}
            {analyses[timeframe].timestamp && (
              <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
                Analysis generated: {new Date(analyses[timeframe].timestamp).toLocaleString()}
              </div>
            )}

            {/* Visual Elements Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Mood Weather */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-lg">
                <h4 className="flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-200 mb-2 text-sm">
                  <Cloud className="h-4 w-4 text-blue-500" />
                  Mood Weather
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{analyses[timeframe].moodWeather}</p>
              </div>

              {/* Energy Flow */}
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 p-4 rounded-lg">
                <h4 className="flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-200 mb-2 text-sm">
                  <Waves className="h-4 w-4 text-teal-500" />
                  Energy Flow
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{analyses[timeframe].energyFlow}</p>
              </div>

              {/* Personal Growth */}
              <div className="bg-gradient-to-br from-green-50 to-lime-50 dark:from-green-900/20 dark:to-lime-900/20 p-4 rounded-lg">
                <h4 className="flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-200 mb-2 text-sm">
                  <Mountain className="h-4 w-4 text-green-500" />
                  Growth Journey
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{analyses[timeframe].personalGrowth}</p>
              </div>
            </div>

            {/* Key Insights - MOVED TO TOP as requested */}
            <div>
              <h3 className="flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-200 mb-2">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                Key Insights
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{analyses[timeframe].insights}</p>
            </div>

            {/* Color Palette */}
            {analyses[timeframe].colorPalette && analyses[timeframe].colorPalette.length > 0 && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg">
                <h4 className="flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-200 mb-3 text-sm">
                  <Palette className="h-4 w-4 text-purple-500" />
                  Your {timeframe === "week" ? "Weekly" : timeframe === "month" ? "Monthly" : "Yearly"} Color Palette
                </h4>
                <div className="flex gap-3 flex-wrap">
                  {analyses[timeframe].colorPalette.map((color, index) => {
                    const colorInfo = getColorInfo(color, index)
                    const IconComponent = colorInfo.icon
                    const iconColor = getContrastColor(color)

                    return (
                      <div key={index} className="group relative">
                        <div
                          className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-700 shadow-md cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-lg flex items-center justify-center"
                          style={{ backgroundColor: color }}
                          title={colorInfo.meaning}
                        >
                          <IconComponent
                            className="h-5 w-5 transition-all duration-200 group-hover:scale-110"
                            style={{ color: iconColor }}
                          />
                        </div>

                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 w-48">
                          <div className="font-semibold mb-1">{colorInfo.meaning}</div>
                          <div className="text-xs opacity-90">{colorInfo.description}</div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Visual Metaphors */}
            {analyses[timeframe].visualMetaphors && analyses[timeframe].visualMetaphors.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  Visual Metaphors
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {analyses[timeframe].visualMetaphors.map((metaphor, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-3 rounded-lg"
                    >
                      <p className="text-sm text-gray-600 dark:text-gray-400 italic">"{metaphor}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Patterns */}
            <div>
              <h3 className="flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-200 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-500" />
                Patterns & Rhythms
              </h3>
              <ul className="space-y-1">
                {analyses[timeframe].patterns.map((pattern, index) => (
                  <li key={index} className="text-gray-600 dark:text-gray-400 flex items-start gap-2">
                    <span className="text-evoke-purple mt-1">•</span>
                    {pattern}
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <div>
              <h3 className="flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-200 mb-2">
                <Brain className="h-4 w-4 text-green-500" />
                Recommendations
              </h3>
              <ul className="space-y-1 mb-4">
                {analyses[timeframe].recommendations.map((rec, index) => (
                  <li key={index} className="text-gray-600 dark:text-gray-400 flex items-start gap-2">
                    <span className="text-evoke-purple mt-1">•</span>
                    {rec}
                  </li>
                ))}
              </ul>

              {/* Recommended CBT Exercises */}
              {/* Debug info - remove in production */}
              {debugMode && analyses[timeframe].recommendedExercises && (
                <div className="mb-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-xs">
                  <strong>Debug:</strong> AI recommended {analyses[timeframe].recommendedExercises.length} exercises:{" "}
                  {analyses[timeframe].recommendedExercises.map((e) => e.title).join(", ")}
                </div>
              )}
              {analyses[timeframe].recommendedExercises && analyses[timeframe].recommendedExercises.length > 0 && (
                <div className="mt-4">
                  <h4 className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300 mb-3">
                    <BookOpen className="h-4 w-4 text-evoke-purple" />
                    Recommended CBT Exercises
                  </h4>
                  <div className="grid gap-3">
                    {analyses[timeframe].recommendedExercises.slice(0, 2).map((exercise) => {
                      const categoryInfo = getCategoryInfo(exercise.category)
                      return (
                        <div
                          key={exercise.id}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                          onClick={() => navigateToExercise(exercise.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <FontAwesomeIcon
                                  icon={categoryInfo.icon}
                                  className="h-4 w-4"
                                  style={{ color: categoryInfo.color }}
                                />
                                <h5 className="font-medium text-gray-800 dark:text-gray-200">{exercise.title}</h5>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{exercise.description}</p>
                              <div className="flex items-center gap-2">
                                <span
                                  className="px-2 py-1 text-xs rounded-full"
                                  style={{
                                    backgroundColor: categoryInfo.bgColor,
                                    color: categoryInfo.color,
                                  }}
                                >
                                  {exercise.category}
                                </span>
                                <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                                  {exercise.difficulty}
                                </span>
                              </div>
                            </div>
                            <ArrowRight className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0" />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  {analyses[timeframe].recommendedExercises.length > 2 && (
                    <Button
                      onClick={() => router.push("/practice")}
                      variant="outline"
                      size="sm"
                      className="mt-3 w-full"
                    >
                      View All Recommended Exercises
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Trends */}
            <div>
              <h3 className="flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-200 mb-2">
                <TrendingUp className="h-4 w-4 text-purple-500" />
                Journey Trends
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{analyses[timeframe].emotionalTrends}</p>
            </div>

            {/* Balance Assessment */}
            <div>
              <h3 className="flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-200 mb-2">
                <Scale className="h-4 w-4 text-indigo-500" />
                Balance Assessment
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {analyses[timeframe].balanceAssessment}
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={refreshAnalysis} variant="outline" size="sm" className="flex-1">
                Refresh Analysis
              </Button>

              {debugMode && (
                <Button onClick={clearAllAnalyses} variant="outline" size="sm" className="text-red-500">
                  Clear All
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
