"use client"

import type React from "react"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronUp, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { getEmotionInsightTags } from "@/data/emotion-metadata"

interface EntryCardProps {
  id: string
  emotionName: string
  emotionCategory: string
  emotionIcon: IconDefinition
  emotionColor: string
  timestamp: Date
  answers: Record<string, string>
  questions: Array<{ id: string; text: string }>
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  description?: string
  reflectionAnswers?: string[]
  type?: "emotion" | "general"
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default function EntryCard({
  id,
  emotionName,
  emotionCategory,
  emotionIcon,
  emotionColor,
  timestamp,
  answers = {}, // Provide default empty object
  questions,
  onEdit,
  onDelete,
  description,
  reflectionAnswers,
  type = "emotion",
}: EntryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onEdit) onEdit(id)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onDelete) onDelete(id)
  }

  // Format the date
  const formattedDate = new Date(timestamp).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })

  // Format the time
  const formattedTime = new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })

  // Get insight tags for this emotion
  const insightTags = getEmotionInsightTags(emotionName) || ["Emotion", "Reflection"]

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/30 overflow-hidden mb-4 transition-all duration-300"
      style={{ borderLeft: `4px solid ${emotionColor}` }}
    >
      <div className="p-4 cursor-pointer flex items-center justify-between" onClick={toggleExpanded}>
        <div className="flex items-center">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
            style={{ backgroundColor: `${emotionColor}20` }}
          >
            <FontAwesomeIcon icon={emotionIcon} className="h-5 w-5" style={{ color: emotionColor }} />
          </div>
          <div className="flex-1">
            {/* Date display */}
            <div className="text-sm text-gray-600 dark:text-gray-400">{formattedDate}</div>

            {/* Add emotion display here */}
            {emotionName && (
              <div className="mt-1 font-medium">
                {type === "emotion" ? (
                  <span style={{ color: emotionColor }}>{capitalizeFirstLetter(emotionName)}</span>
                ) : (
                  <span className="text-gray-900 dark:text-gray-100">{capitalizeFirstLetter(emotionName)}</span>
                )}
                {description && (
                  <span className="font-normal text-sm text-gray-600 dark:text-gray-400 ml-1">- {description}</span>
                )}
              </div>
            )}

            {/* Add a preview of reflection answers if they exist */}
            {reflectionAnswers && reflectionAnswers.length > 0 && (
              <div className="mt-1 text-sm text-gray-700 dark:text-gray-300 line-clamp-1">{reflectionAnswers[0]}</div>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <button
            onClick={handleEdit}
            className="p-2 text-gray-500 hover:text-evoke-purple transition-colors"
            aria-label="Edit entry"
          >
            <FontAwesomeIcon icon={faPencil} className="h-4 w-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-red-500 hover:text-red-700 transition-colors"
            aria-label="Delete entry"
          >
            <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
          </button>
          <FontAwesomeIcon
            icon={isExpanded ? faChevronUp : faChevronDown}
            className="h-4 w-4 text-gray-500 dark:text-gray-400 ml-2"
          />
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t border-gray-100 dark:border-gray-700">
          {questions.map((question, index) => (
            <div key={question.id} className="mb-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{question.text}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                {answers[question.id] || (reflectionAnswers && reflectionAnswers[index]) || "No answer provided"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
