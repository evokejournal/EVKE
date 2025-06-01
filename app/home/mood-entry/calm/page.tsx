"use client"

import { useRouter } from "next/navigation"
import EmotionGrid, { type Emotion } from "@/components/mood/emotion-grid"
import {
  faCouch,
  faDove,
  faWater,
  faBook,
  faMountain,
  faTree,
  faYinYang,
  faScaleBalanced,
  faShieldHeart,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons"

// Calm/Stillness specific emotions
const calmEmotions: Emotion[] = [
  {
    name: "Relaxed",
    path: "/home/mood-entry/calm/relaxed",
    icon: faCouch,
  },
  {
    name: "Peaceful",
    path: "/home/mood-entry/calm/peaceful",
    icon: faDove,
  },
  {
    name: "Tranquil",
    path: "/home/mood-entry/calm/tranquil",
    icon: faWater,
  },
  {
    name: "Reflective",
    path: "/home/mood-entry/calm/reflective",
    icon: faBook,
  },
  {
    name: "Meditative",
    path: "/home/mood-entry/calm/meditative",
    icon: faMountain,
  },
  {
    name: "Settled",
    path: "/home/mood-entry/calm/settled",
    icon: faTree,
  },
  {
    name: "Grounded",
    path: "/home/mood-entry/calm/grounded",
    icon: faYinYang,
  },
  {
    name: "Balanced",
    path: "/home/mood-entry/calm/balanced",
    icon: faScaleBalanced,
  },
  {
    name: "Safe",
    path: "/home/mood-entry/calm/safe",
    icon: faShieldHeart,
  },
  {
    name: "Open",
    path: "/home/mood-entry/calm/open",
    icon: faDoorOpen,
  },
]

export default function CalmMoodPage() {
  const router = useRouter()

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-white dark:bg-gray-800">
        <div className="flex flex-col">
          <h1 className="text-2xl font-extrabold text-evoke-purple font-museoModerno italic tracking-wide">EVOKE</h1>
          <span className="text-xs text-gray-500 dark:text-gray-400">Flash journaling and mood tracker</span>
        </div>
      </div>

      <div className="pt-20 px-4 pb-20">
        <h2 className="text-xl font-bold text-[#607D8B] dark:text-[#607D8B] mb-6">Calm / Stillness</h2>
        <EmotionGrid emotions={calmEmotions} color="#607D8B" bgColor="#ECEFF1" borderColor="#607D8B" />
      </div>
    </div>
  )
}
