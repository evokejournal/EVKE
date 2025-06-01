"use client"

import { useRouter } from "next/navigation"
import {
  faExclamation,
  faStar,
  faExplosion,
  faSurprise,
  faQuestion,
  faCompass,
  faMagnifyingGlass,
  faLightbulb,
  faFaceMeh,
  faCircleQuestion,
  faFaceDizzy,
} from "@fortawesome/free-solid-svg-icons"
import EmotionGrid, { type Emotion } from "@/components/mood/emotion-grid"

// Surprise specific emotions
const surpriseEmotions: Emotion[] = [
  {
    name: "Startled",
    path: "/home/mood-entry/surprise/startled",
    icon: faExclamation,
  },
  {
    name: "Amazed",
    path: "/home/mood-entry/surprise/amazed",
    icon: faStar,
  },
  {
    name: "Shocked",
    path: "/home/mood-entry/surprise/shocked",
    icon: faExplosion,
  },
  {
    name: "Stunned",
    path: "/home/mood-entry/surprise/stunned",
    icon: faSurprise,
  },
  {
    name: "Confused",
    path: "/home/mood-entry/surprise/confused",
    icon: faQuestion,
  },
  {
    name: "Disoriented",
    path: "/home/mood-entry/surprise/disoriented",
    icon: faCompass,
  },
  {
    name: "Curious",
    path: "/home/mood-entry/surprise/curious",
    icon: faMagnifyingGlass,
  },
  {
    name: "Intrigued",
    path: "/home/mood-entry/surprise/intrigued",
    icon: faLightbulb,
  },
  {
    name: "Awestruck",
    path: "/home/mood-entry/surprise/awestruck",
    icon: faStar,
  },
  {
    name: "Uncertain",
    path: "/home/mood-entry/surprise/uncertain",
    icon: faFaceMeh,
  },
  {
    name: "Baffled",
    path: "/home/mood-entry/surprise/baffled",
    icon: faCircleQuestion,
  },
  {
    name: "Dazed",
    path: "/home/mood-entry/surprise/dazed",
    icon: faFaceDizzy,
  },
]

export default function SurpriseMoodPage() {
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
        <h2 className="text-xl font-bold text-[#FF9800] dark:text-[#FF9800] mb-6">Surprise</h2>
        <EmotionGrid emotions={surpriseEmotions} color="#FF9800" bgColor="#FFF3E0" borderColor="#FF9800" />
      </div>
    </div>
  )
}
