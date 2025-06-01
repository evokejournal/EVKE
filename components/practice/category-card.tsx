"use client"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import type { CategoryInfo, CBTExercise } from "@/data/cbt-exercises"
import CBTExerciseCard from "./cbt-exercise-card"
import { useTheme } from "@/context/theme-context"

interface CategoryCardProps {
  category: CategoryInfo
  exercises: CBTExercise[]
}

export default function CategoryCard({ category, exercises }: CategoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div
      className="mb-6 overflow-hidden rounded-2xl border shadow-sm dark:shadow-gray-900/20 transition-all duration-300"
      style={{
        borderColor: category.borderColor,
        backgroundColor: isDark ? "#111827" : "#ffffff",
      }}
    >
      <div
        className="flex cursor-pointer items-center justify-between p-4 transition-colors"
        style={{
          backgroundColor: isExpanded ? category.color : category.bgColor,
          color: isExpanded ? "white" : category.color,
        }}
        onClick={toggleExpanded}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{
              backgroundColor: isExpanded ? "rgba(255, 255, 255, 0.2)" : category.bgColor,
              border: isExpanded ? "1px solid rgba(255, 255, 255, 0.3)" : "none",
            }}
          >
            <FontAwesomeIcon
              icon={category.icon}
              className="h-5 w-5"
              style={{ color: isExpanded ? "white" : category.color }}
            />
          </div>
          <h3 className="text-lg font-semibold">{category.name}</h3>
          <div className="ml-2 rounded-full bg-white bg-opacity-20 px-2 py-0.5 text-xs">
            {exercises.length} {exercises.length === 1 ? "exercise" : "exercises"}
          </div>
        </div>
        <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} className="h-4 w-4" />
      </div>

      {isExpanded && (
        <div
          className="divide-y divide-gray-100 dark:divide-gray-700 p-4"
          style={{ backgroundColor: isDark ? "#111827" : "#ffffff" }}
        >
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">{getCategoryDescription(category.name)}</p>
          <div className="grid gap-4 pt-4 md:grid-cols-2">
            {exercises.map((exercise) => (
              <CBTExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Helper function to get descriptions for each category
function getCategoryDescription(categoryName: string): string {
  const descriptions: Record<string, string> = {
    "Cognitive Restructuring":
      "Techniques to identify, challenge, and modify unhelpful thoughts and beliefs that contribute to emotional distress.",
    "Behavioral Activation":
      "Strategies to increase engagement in positive and rewarding activities to improve mood and motivation.",
    "Exposure Techniques":
      "Gradual, controlled exposure to feared situations or stimuli to reduce anxiety and avoidance behaviors.",
    Mindfulness:
      "Practices that cultivate present-moment awareness and acceptance to reduce stress and improve emotional regulation.",
    "Problem Solving": "Structured approaches to identify solutions to life challenges and make effective decisions.",
    Relaxation:
      "Techniques to reduce physical tension and induce the relaxation response to counter stress and anxiety.",
    "Social Skills": "Methods to improve interpersonal communication and relationship-building abilities.",
  }

  return descriptions[categoryName] || "Exercises to improve mental wellbeing and emotional regulation."
}
