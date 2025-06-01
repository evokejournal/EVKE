"use client"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import type { CBTExercise } from "@/data/cbt-exercises"
import { getCategoryInfo } from "@/data/cbt-exercises"
import { useTheme } from "@/context/theme-context"

interface CBTExerciseCardProps {
  exercise: CBTExercise
}

export default function CBTExerciseCard({ exercise }: CBTExerciseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const categoryInfo = getCategoryInfo(exercise.category)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  // Determine badge colors based on difficulty
  const difficultyColor = {
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-yellow-100 text-yellow-800",
    Advanced: "bg-red-100 text-red-800",
  }[exercise.difficulty]

  // Determine badge colors based on evidence level
  const evidenceColor = {
    Strong: "bg-blue-100 text-blue-800",
    Moderate: "bg-purple-100 text-purple-800",
    Limited: "bg-gray-100 text-gray-800",
  }[exercise.evidence]

  // Function to format markdown-like text
  const formatText = (text: string) => {
    // Replace **text** with <strong>text</strong>
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
  }

  return (
    <div
      className="rounded-2xl shadow-md dark:shadow-gray-900/30 overflow-hidden border transition-all duration-300"
      style={{
        borderColor: categoryInfo.borderColor,
        borderLeftWidth: "4px",
        backgroundColor: isDark ? "#111827" : "#ffffff",
      }}
    >
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: categoryInfo.bgColor }}
          >
            <FontAwesomeIcon icon={categoryInfo.icon} className="h-4 w-4" style={{ color: categoryInfo.color }} />
          </div>
          <span
            className="text-sm font-medium px-2.5 py-0.5 rounded-full"
            style={{
              backgroundColor: categoryInfo.bgColor,
              color: categoryInfo.color,
            }}
          >
            {exercise.category}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${difficultyColor}`}>
            {exercise.difficulty}
          </span>
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${evidenceColor}`}>
            {exercise.evidence} Evidence
          </span>
        </div>

        <h3 className="text-lg font-semibold mb-2" style={{ color: categoryInfo.color }}>
          {exercise.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{exercise.description}</p>

        <button
          onClick={toggleExpanded}
          className="flex items-center justify-center w-full py-2 px-4 text-white rounded-md transition-colors"
          style={{
            backgroundColor: categoryInfo.color,
            opacity: isExpanded ? 0.9 : 1,
          }}
        >
          <span>Instructions</span>
          <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} className="ml-2 h-4 w-4" />
        </button>
      </div>

      {isExpanded && (
        <div
          className="px-4 py-3 border-t dark:border-opacity-30"
          style={{
            backgroundColor: isDark ? "#1f2937" : categoryInfo.bgColor,
            borderColor: categoryInfo.borderColor,
          }}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {exercise.instructions.split("\n").map((paragraph, index) => (
              <p
                key={index}
                className="mb-2 whitespace-pre-wrap text-gray-800 dark:text-gray-200"
                dangerouslySetInnerHTML={{ __html: formatText(paragraph) }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
