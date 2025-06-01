"use client"

import { faSadTear } from "@fortawesome/free-solid-svg-icons"
import ReflectionQuestions from "@/components/mood/reflection-questions"
import { getQuestionsForEmotion } from "@/utils/reflection-questions"
import AppLayout from "@/components/layout/app-layout"

export default function LonelyEmotionPage() {
  const emotionCategory = "Sadness"
  const emotionName = "Lonely"
  const emotionColor = "#2196F3" // Blue
  const emotionIcon = faSadTear

  // Get the reflection questions for this specific emotion
  const questions = getQuestionsForEmotion(emotionCategory, emotionName)

  return (
    <AppLayout>
      <div className="pt-4 px-4 pb-20">
        <h2 className="text-xl font-bold mb-6" style={{ color: emotionColor }}>
          {emotionName}
        </h2>

        <ReflectionQuestions
          emotionName="Lonely"
          emotionCategory="Sadness"
          emotionIcon={faSadTear}
          emotionColor="#2196F3"
          questions={questions}
        />
      </div>
    </AppLayout>
  )
}
