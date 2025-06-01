"use client"

import { useRouter } from "next/navigation"
import { getQuestionsForEmotion } from "@/utils/reflection-questions"
import AppLayout from "@/components/layout/app-layout"
import ReflectionQuestions from "@/components/mood/reflection-questions"
import {
  faSmile,
  faSadTear,
  faAngry,
  faFaceFrown,
  faSurprise,
  faHeart,
  faFire,
  faMask,
  faPerson,
  faWater,
  faCodeBranch,
} from "@fortawesome/free-solid-svg-icons"

// Map emotion categories to their icons and colors
const emotionIcons: Record<string, any> = {
  joy: { icon: faSmile, color: "#4CAF50" },
  sadness: { icon: faSadTear, color: "#2196F3" },
  anger: { icon: faAngry, color: "#F44336" },
  fear: { icon: faFaceFrown, color: "#FFC107" },
  surprise: { icon: faSurprise, color: "#FF9800" },
  love: { icon: faHeart, color: "#9C27B0" },
  anticipation: { icon: faFire, color: "#FF80AB" },
  shame: { icon: faMask, color: "#9E9E9E" },
  empowerment: { icon: faPerson, color: "#795548" },
  calm: { icon: faWater, color: "#607D8B" },
  complex: { icon: faCodeBranch, color: "#BDBDBD" },
}

// Map category keys to full category names
const categoryNames: Record<string, string> = {
  joy: "Joy / Happiness",
  sadness: "Sadness",
  anger: "Anger",
  fear: "Fear / Anxiety",
  surprise: "Surprise",
  love: "Love / Connection",
  anticipation: "Anticipation / Desire",
  shame: "Shame / Guilt",
  empowerment: "Empowerment / Confidence",
  calm: "Calm / Stillness",
  complex: "Complex / Ambiguous",
}

interface ContentProps {
  params: {
    category: string;
    emotion: string;
  }
}

export default function DynamicEmotionContent({ params }: ContentProps) {
  const router = useRouter()
  const { category, emotion } = params

  if (!category || !emotion) {
    return <div>Invalid parameters</div>
  }

  // Format the emotion name (capitalize first letter)
  const formattedEmotion = emotion.charAt(0).toUpperCase() + emotion.slice(1)

  // Get the category key (first word of category, lowercase)
  const categoryKey = category.toLowerCase()

  // Get the full category name
  const fullCategoryName = categoryNames[categoryKey] || categoryKey

  // Get the emotion color and icon
  const emotionColor = emotionIcons[categoryKey]?.color || "#9333EA"
  const emotionIcon = emotionIcons[categoryKey]?.icon || faSmile

  // Get the reflection questions for this specific emotion
  const questions = getQuestionsForEmotion(fullCategoryName, formattedEmotion)

  // Handle successful save
  const handleSave = () => {
    // This is a backup in case the direct navigation in ReflectionQuestions fails
    router.push("/home")
  }

  return (
    <AppLayout>
      <div className="pt-4 px-4 pb-20">
        <h2 className="text-xl font-bold mb-6" style={{ color: emotionColor }}>
          {formattedEmotion}
        </h2>

        <ReflectionQuestions
          emotionName={formattedEmotion}
          emotionCategory={fullCategoryName}
          emotionIcon={emotionIcon}
          emotionColor={emotionColor}
          questions={questions}
          onSave={handleSave}
        />
      </div>
    </AppLayout>
  )
} 