"use client"

import { useRouter } from "next/navigation"
import {
  faFaceFlushed,
  faPersonFallingBurst,
  faBalanceScale,
  faFaceSadTear,
  faUndo,
  faPersonCircleXmark,
  faPersonBurst,
  faPersonArrowDownToLine,
  faPersonFalling,
  faPersonCircleMinus,
} from "@fortawesome/free-solid-svg-icons"
import EmotionGrid, { type Emotion } from "@/components/mood/emotion-grid"

// Shame/Guilt specific emotions
const shameEmotions: Emotion[] = [
  {
    name: "Embarrassed",
    path: "/home/mood-entry/shame/embarrassed",
    icon: faFaceFlushed,
  },
  {
    name: "Humiliated",
    path: "/home/mood-entry/shame/humiliated",
    icon: faPersonFallingBurst,
  },
  {
    name: "Guilty",
    path: "/home/mood-entry/shame/guilty",
    icon: faBalanceScale,
  },
  {
    name: "Ashamed",
    path: "/home/mood-entry/shame/ashamed",
    icon: faFaceSadTear,
  },
  {
    name: "Regretful",
    path: "/home/mood-entry/shame/regretful",
    icon: faUndo,
  },
  {
    name: "Self-loathing",
    path: "/home/mood-entry/shame/self-loathing",
    icon: faPersonCircleXmark,
  },
  {
    name: "Remorseful",
    path: "/home/mood-entry/shame/remorseful",
    icon: faPersonBurst,
  },
  {
    name: "Inadequate",
    path: "/home/mood-entry/shame/inadequate",
    icon: faPersonArrowDownToLine,
  },
  {
    name: "Unworthy",
    path: "/home/mood-entry/shame/unworthy",
    icon: faPersonFalling,
  },
  {
    name: "Inferior",
    path: "/home/mood-entry/shame/inferior",
    icon: faPersonCircleMinus,
  },
]

export default function ShameMoodPage() {
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
        <h2 className="text-xl font-bold text-[#9E9E9E] dark:text-[#9E9E9E] mb-6">Shame / Guilt</h2>
        <EmotionGrid emotions={shameEmotions} color="#9E9E9E" bgColor="#F5F5F5" borderColor="#9E9E9E" />
      </div>
    </div>
  )
}
