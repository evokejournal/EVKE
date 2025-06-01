"use client"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faSave } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/navigation"
import { saveMoodEntry } from "@/lib/realtime-db"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { getEmotionMetadata } from "@/data/emotion-metadata"

// Define the structure for a reflection question
interface ReflectionQuestion {
  id: string
  text: string
}

// Define the structure for an emotion entry
interface EmotionEntry {
  emotionName: string
  emotionCategory: string
  emotionIcon: IconDefinition
  emotionColor: string
  intensity?: number
  timestamp: Date
  answers: Record<string, string>
  questions: ReflectionQuestion[]
}

interface ReflectionQuestionsProps {
  emotionName: string
  emotionCategory: string
  emotionIcon: IconDefinition
  emotionColor: string
  questions: ReflectionQuestion[]
  onSave?: (entry: EmotionEntry) => void
}

export default function ReflectionQuestions({
  emotionName,
  emotionCategory,
  emotionIcon,
  emotionColor,
  questions,
  onSave,
}: ReflectionQuestionsProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Safety check: ensure questions array exists and has items
  if (!questions || !Array.isArray(questions) || questions.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto mt-4 mb-20">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={emotionIcon} className="h-6 w-6 mr-2" style={{ color: emotionColor }} />
            <h3 className="text-lg font-medium dark:text-white" style={{ color: emotionColor }}>
              {emotionName}
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400">No reflection questions available for this emotion.</p>
        </div>
      </div>
    )
  }

  // Ensure currentQuestionIndex is within bounds
  const safeCurrentIndex = Math.min(Math.max(currentQuestionIndex, 0), questions.length - 1)
  const currentQuestion = questions[safeCurrentIndex]

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const handleSaveEntry = async () => {
    try {
      // Prevent multiple submissions
      if (isSubmitting) return

      setIsSubmitting(true)
      setError(null)

      const timestamp = new Date()

      // Get the emotion metadata
      const metadata = getEmotionMetadata(emotionName)

      // Create the entry object (without the icon which can't be serialized)
      const entry = {
        emotionName,
        emotionCategory,
        emotionColor,
        timestamp: timestamp.getTime(), // Store as timestamp for easier querying
        answers,
        questions, // Save the actual questions that were asked
        // Add metadata for analytics (hidden from user)
        balanceRating: metadata?.balanceRating || 50,
        intensityRating: metadata?.intensityRating || 50, // Use the pre-determined intensity
        insightTags: metadata?.insightTags || ["Emotion", "Reflection"],
      }

      // Save to Realtime Database
      await saveMoodEntry(entry)
      console.log("Entry saved successfully")

      // Call the onSave callback if provided
      if (onSave) {
        onSave({
          ...entry,
          emotionIcon,
          timestamp,
          questions,
        })
      }

      // Prefetch the home page to minimize loading time
      router.prefetch("/home")

      // Navigate to home using the router
      router.push("/home")
    } catch (error) {
      console.error("Error saving entry:", error)
      setError("Failed to save entry. Please try again.")
      setIsSubmitting(false)
    }
  }

  const isLastQuestion = safeCurrentIndex === questions.length - 1

  return (
    <div className="w-full max-w-md mx-auto mt-4 mb-20">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <FontAwesomeIcon icon={emotionIcon} className="h-6 w-6 mr-2" style={{ color: emotionColor }} />
          <h3 className="text-lg font-medium dark:text-white" style={{ color: emotionColor }}>
            {emotionName}
          </h3>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-200 rounded-md">{error}</div>
        )}

        <div className="mb-6">
          <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
            Question {safeCurrentIndex + 1} of {questions.length}
          </p>
          <p className="text-lg dark:text-white" style={{ color: emotionColor }}>
            {currentQuestion?.text || "Question not available"}
          </p>
        </div>

        <textarea
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 text-black dark:text-white dark:bg-gray-700"
          style={{ focusRing: emotionColor }}
          placeholder="Your reflection..."
          value={answers[currentQuestion?.id || ""] || ""}
          onChange={(e) => handleAnswerChange(currentQuestion?.id || "", e.target.value)}
          disabled={isSubmitting}
        />

        <div className="mt-4 flex justify-end">
          {isLastQuestion ? (
            <button
              onClick={handleSaveEntry}
              disabled={isSubmitting}
              className="flex items-center justify-center px-4 py-2 text-white rounded-md hover:opacity-90 transition-colors"
              style={{ backgroundColor: emotionColor }}
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Saving...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faSave} className="mr-2" />
                  Save Entry
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="flex items-center justify-center px-4 py-2 text-white rounded-md hover:opacity-90 transition-colors"
              style={{ backgroundColor: emotionColor }}
              disabled={isSubmitting}
            >
              Next
              <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
