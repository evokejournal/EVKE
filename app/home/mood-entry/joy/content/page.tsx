"use client"

import { faSmile } from "@fortawesome/free-solid-svg-icons"
import ReflectionQuestions from "@/components/mood/reflection-questions"
import { getQuestionsForEmotion } from "@/utils/reflection-questions"
import AppLayout from "@/components/layout/app-layout"

export default function ContentEmotionPage() {
  const emotionCategory = "Joy / Happiness"
  const emotionName = "Content"
  const emotionColor = "#4CAF50" // Green
  const emotionIcon = faSmile

  // Get the reflection questions for this specific emotion
  const questions = getQuestionsForEmotion(emotionCategory, emotionName)

  return (
    <AppLayout>
      <div className="pt-4 px-4 pb-20">
        <h2 className="text-xl font-bold mb-6" style={{ color: emotionColor }}>
          {emotionName}
        </h2>

        <ReflectionQuestions
          emotionName="Content"
          emotionCategory="Joy / Happiness"
          emotionIcon={faSmile}
          emotionColor="#4CAF50"
          questions={questions}
        />
      </div>
    </AppLayout>
  )
}
