"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { getAnalysisHistory, deleteAnalysisFromHistory } from "@/lib/storage-utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Clock,
  Calendar,
  Trash2,
  Loader2,
  Lightbulb,
  Brain,
  TrendingUp,
  Scale,
  Cloud,
  Waves,
  Mountain,
} from "lucide-react"
import { format } from "date-fns"
import { useAIRecommendations } from "@/context/ai-recommendations-context"
import { useRouter } from "next/navigation"
import { getCategoryInfo } from "@/data/cbt-exercises"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function PastAnalyses() {
  const { user } = useAuth()
  const router = useRouter()
  const { setAIRecommendedExercises } = useAIRecommendations()
  const [analyses, setAnalyses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    const loadAnalysisHistory = async () => {
      if (!user?.uid) {
        setError("Please log in to view analysis history")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        const history = await getAnalysisHistory(user.uid)
        setAnalyses(history)
      } catch (err) {
        console.error("Error loading analysis history:", err)
        setError("Failed to load analysis history")
      } finally {
        setLoading(false)
      }
    }

    loadAnalysisHistory()
  }, [user?.uid])

  const handleDelete = async (analysisId: string) => {
    if (!user?.uid) return

    try {
      setDeleting(analysisId)
      await deleteAnalysisFromHistory(user.uid, analysisId)
      setAnalyses(analyses.filter((analysis) => analysis.id !== analysisId))
    } catch (err) {
      console.error("Error deleting analysis:", err)
    } finally {
      setDeleting(null)
    }
  }

  const navigateToExercise = (exerciseId: string, recommendedExercises: any[]) => {
    // Set the recommendations in context before navigating
    if (recommendedExercises && recommendedExercises.length > 0) {
      setAIRecommendedExercises(recommendedExercises)
    }

    // Navigate to practice page with exercise ID
    router.push(`/practice?exercise=${exerciseId}`)
  }

  const getTimeframeLabel = (timeframe: string) => {
    switch (timeframe) {
      case "week":
        return "Weekly Insight"
      case "month":
        return "Monthly Insight"
      case "year":
        return "Yearly Insight"
      default:
        return "Insight"
    }
  }

  const getTimeframeColor = (timeframe: string) => {
    switch (timeframe) {
      case "week":
        return "text-blue-500"
      case "month":
        return "text-purple-500"
      case "year":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-evoke-purple" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 rounded-lg">
        <p>{error}</p>
      </div>
    )
  }

  if (analyses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No past insights found. Generate insights to see them here.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {analyses.map((analysis) => (
          <Card key={analysis.id} className="bg-white dark:bg-gray-800 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Calendar className={`h-4 w-4 ${getTimeframeColor(analysis.timeframe)}`} />
                  <span>{getTimeframeLabel(analysis.timeframe)}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(analysis.id)}
                  disabled={deleting === analysis.id}
                  className="h-8 w-8 p-0"
                >
                  {deleting === analysis.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                  )}
                </Button>
              </CardTitle>
              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {analysis.timestamp ? format(new Date(analysis.timestamp), "MMM d, yyyy 'at' h:mm a") : "Unknown date"}
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="details" className="border-b-0">
                  <AccordionTrigger className="py-2 text-sm">View Here</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 text-sm">
                      {/* Key Insights */}
                      <div>
                        <h4 className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <Lightbulb className="h-4 w-4 text-yellow-500" />
                          Key Insights
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">{analysis.insights}</p>
                      </div>

                      {/* Visual Elements */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {/* Mood Weather */}
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-3 rounded-lg">
                          <h5 className="flex items-center gap-1 font-medium text-gray-700 dark:text-gray-300 mb-1 text-xs">
                            <Cloud className="h-3 w-3 text-blue-500" />
                            Mood Weather
                          </h5>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{analysis.moodWeather}</p>
                        </div>

                        {/* Energy Flow */}
                        <div className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 p-3 rounded-lg">
                          <h5 className="flex items-center gap-1 font-medium text-gray-700 dark:text-gray-300 mb-1 text-xs">
                            <Waves className="h-3 w-3 text-teal-500" />
                            Energy Flow
                          </h5>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{analysis.energyFlow}</p>
                        </div>

                        {/* Personal Growth */}
                        <div className="bg-gradient-to-br from-green-50 to-lime-50 dark:from-green-900/20 dark:to-lime-900/20 p-3 rounded-lg">
                          <h5 className="flex items-center gap-1 font-medium text-gray-700 dark:text-gray-300 mb-1 text-xs">
                            <Mountain className="h-3 w-3 text-green-500" />
                            Growth Journey
                          </h5>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{analysis.personalGrowth}</p>
                        </div>
                      </div>

                      {/* Patterns */}
                      <div>
                        <h4 className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <TrendingUp className="h-4 w-4 text-blue-500" />
                          Patterns & Rhythms
                        </h4>
                        <ul className="space-y-1">
                          {analysis.patterns?.map((pattern, index) => (
                            <li key={index} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1">
                              <span className="text-evoke-purple mt-1">•</span>
                              {pattern}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Recommendations */}
                      <div>
                        <h4 className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <Brain className="h-4 w-4 text-green-500" />
                          Recommendations
                        </h4>
                        <ul className="space-y-1">
                          {analysis.recommendations?.map((rec, index) => (
                            <li key={index} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1">
                              <span className="text-evoke-purple mt-1">•</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Recommended Exercises */}
                      {analysis.recommendedExercises && analysis.recommendedExercises.length > 0 && (
                        <div>
                          <h4 className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Recommended Exercises
                          </h4>
                          <div className="grid gap-2">
                            {analysis.recommendedExercises.slice(0, 2).map((exercise) => {
                              const categoryInfo = getCategoryInfo(exercise.category)
                              return (
                                <div
                                  key={exercise.id}
                                  className="border rounded-lg p-3 hover:shadow-sm transition-shadow cursor-pointer bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                  onClick={() => navigateToExercise(exercise.id, analysis.recommendedExercises)}
                                >
                                  <div className="flex items-center gap-2 mb-1">
                                    <FontAwesomeIcon
                                      icon={categoryInfo.icon}
                                      className="h-3 w-3"
                                      style={{ color: categoryInfo.color }}
                                    />
                                    <h5 className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                                      {exercise.title}
                                    </h5>
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span
                                      className="px-2 py-0.5 text-xs rounded-full"
                                      style={{
                                        backgroundColor: categoryInfo.bgColor,
                                        color: categoryInfo.color,
                                      }}
                                    >
                                      {exercise.category}
                                    </span>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}

                      {/* Balance Assessment */}
                      <div>
                        <h4 className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <Scale className="h-4 w-4 text-indigo-500" />
                          Balance Assessment
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{analysis.balanceAssessment}</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
