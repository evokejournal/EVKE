"use client"

import { faSurprise } from "@fortawesome/free-solid-svg-icons"
import ReflectionQuestions from "@/components/mood/reflection-questions"
import { getQuestionsForEmotion } from "@/utils/reflection-questions"
import AppLayout from "@/components/layout/app-layout"

export default function AmazedEmotionPage() {
  const emotionCategory = "Surprise"
  const emotionName = "Amazed"
  const emotionColor = "#FF9800" // Orange
  const emotionIcon = faSurprise

  // Get the reflection questions for this specific emotion
  const questions = getQuestionsForEmotion(emotionCategory, emotionName)

  return (
    <AppLayout>
      <div className="pt-4 px-4 pb-20">
        <h2 className="text-xl font-bold mb-6" style={{ color: emotionColor }}>
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
    </AppLayout>
  )
}
