"use client"

import { useRouter } from "next/navigation"
import EmotionGrid, { type Emotion } from "@/components/mood/emotion-grid"
import {
  faBold,
  faHandFist,
  faUserTie,
  faDumbbell,
  faPersonWalking,
  faTrophy,
  faShield,
  faPersonWalkingArrowRight,
  faCompass,
  faPersonWalkingArrowLoopLeft,
  faPersonBreastfeeding,
  faPersonCircleCheck,
  faPersonCirclePlus,
  faPersonRays,
} from "@fortawesome/free-solid-svg-icons"

// Empowerment/Confidence specific emotions
const empowermentEmotions: Emotion[] = [
  {
    name: "Bold",
    path: "/home/mood-entry/empowerment/bold",
    icon: faBold,
  },
  {
    name: "Assertive",
    path: "/home/mood-entry/empowerment/assertive",
    icon: faHandFist,
  },
  {
    name: "Confident",
    path: "/home/mood-entry/empowerment/confident",
    icon: faUserTie,
  },
  {
    name: "Strong",
    path: "/home/mood-entry/empowerment/strong",
    icon: faDumbbell,
  },
  {
    name: "Capable",
    path: "/home/mood-entry/empowerment/capable",
    icon: faPersonWalking,
  },
  {
    name: "Proud",
    path: "/home/mood-entry/empowerment/proud",
    icon: faTrophy,
  },
  {
    name: "Resilient",
    path: "/home/mood-entry/empowerment/resilient",
    icon: faShield,
  },
  {
    name: "Independent",
    path: "/home/mood-entry/empowerment/independent",
    icon: faPersonWalkingArrowRight,
  },
  {
    name: "Grounded",
    path: "/home/mood-entry/empowerment/grounded",
    icon: faCompass,
  },
  {
    name: "Courageous",
    path: "/home/mood-entry/empowerment/courageous",
    icon: faPersonWalkingArrowLoopLeft,
  },
  {
    name: "Brave",
    path: "/home/mood-entry/empowerment/brave",
    icon: faPersonBreastfeeding,
  },
  {
    name: "Empowered",
    path: "/home/mood-entry/empowerment/empowered",
    icon: faPersonCircleCheck,
  },
  {
    name: "Centered",
    path: "/home/mood-entry/empowerment/centered",
    icon: faPersonCirclePlus,
  },
  {
    name: "Self-assured",
    path: "/home/mood-entry/empowerment/self-assured",
    icon: faPersonRays,
  },
]

export default function EmpowermentMoodPage() {
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
        <h2 className="text-xl font-bold text-[#795548] dark:text-[#795548] mb-6">Empowerment / Confidence</h2>
        <EmotionGrid emotions={empowermentEmotions} color="#795548" bgColor="#EFEBE9" borderColor="#795548" />
      </div>
    </div>
  )
}
