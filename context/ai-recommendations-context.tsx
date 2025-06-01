"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { CBTExercise } from "@/data/cbt-exercises"

interface AIRecommendationsContextType {
  aiRecommendedExercises: CBTExercise[]
  setAIRecommendedExercises: (exercises: CBTExercise[]) => void
}

const AIRecommendationsContext = createContext<AIRecommendationsContextType | undefined>(undefined)

export function AIRecommendationsProvider({ children }: { children: ReactNode }) {
  const [aiRecommendedExercises, setAIRecommendedExercises] = useState<CBTExercise[]>([])

  return (
    <AIRecommendationsContext.Provider value={{ aiRecommendedExercises, setAIRecommendedExercises }}>
      {children}
    </AIRecommendationsContext.Provider>
  )
}

export function useAIRecommendations() {
  const context = useContext(AIRecommendationsContext)
  if (context === undefined) {
    throw new Error("useAIRecommendations must be used within an AIRecommendationsProvider")
  }
  return context
}
