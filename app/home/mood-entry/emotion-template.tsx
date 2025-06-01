"use client"

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import ReflectionQuestions from "@/components/mood/reflection-questions"
import { getQuestionsForEmotion } from "@/utils/reflection-questions"
import Header from "@/components/layout/header"

interface EmotionPageProps {
  emotionCategory: string
  emotionName: string
  emotionColor: string
  emotionIcon: IconDefinition
}

export default function EmotionPage({ emotionCategory, emotionName, emotionColor, emotionIcon }: EmotionPageProps) {
  // Get the reflection questions for this specific emotion
  const questions = getQuestionsForEmotion(emotionCategory, emotionName)

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <div className="pt-20 px-4 pb-20">
        <h2 className="text-xl font-bold" style={{ color: emotionColor }}>
          {emotionName}
        </h2>

        <ReflectionQuestions
          emotionName={emotionName}
          emotionCategory={emotionCategory}
          emotionIcon={emotionIcon}
          emotionColor={emotionColor}
          questions={questions}
        />
      </div>
    </div>
  )
}
