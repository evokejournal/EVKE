"use client"

import { useRouter } from "next/navigation"
import {
  faCodeBranch,
  faClockRotateLeft,
  faPersonWalkingDashedLineArrowRight,
  faScaleBalanced,
  faMehBlank,
  faFaceMeh,
  faPersonCircleQuestion,
  faPersonDigging,
  faPersonWalking,
  faPersonCircleExclamation,
  faPersonThroughWindow,
  faFaceRollingEyes,
  faFaceMehBlank,
  faPersonWalkingArrowLoopLeft,
  faPersonCircleXmark,
  faPersonHarassing,
  faPersonWalkingLuggage,
  faMagnifyingGlass,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons"
import EmotionGrid, { type Emotion } from "@/components/mood/emotion-grid"

// Complex/Ambiguous specific emotions
const complexEmotions: Emotion[] = [
  {
    name: "Conflicted",
    path: "/home/mood-entry/complex/conflicted",
    icon: faCodeBranch,
  },
  {
    name: "Nostalgic",
    path: "/home/mood-entry/complex/nostalgic",
    icon: faClockRotateLeft,
  },
  {
    name: "Awkward",
    path: "/home/mood-entry/complex/awkward",
    icon: faPersonWalkingDashedLineArrowRight,
  },
  {
    name: "Ambivalent",
    path: "/home/mood-entry/complex/ambivalent",
    icon: faScaleBalanced,
  },
  {
    name: "Mixed",
    path: "/home/mood-entry/complex/mixed",
    icon: faCodeBranch,
  },
  {
    name: "Detached",
    path: "/home/mood-entry/complex/detached",
    icon: faPersonCircleXmark,
  },
  {
    name: "Indifferent",
    path: "/home/mood-entry/complex/indifferent",
    icon: faMehBlank,
  },
  {
    name: "Bored",
    path: "/home/mood-entry/complex/bored",
    icon: faFaceMeh,
  },
  {
    name: "Surreal",
    path: "/home/mood-entry/complex/surreal",
    icon: faPersonCircleQuestion,
  },
  {
    name: "Pensive",
    path: "/home/mood-entry/complex/pensive",
    icon: faPersonDigging,
  },
  {
    name: "Reflective",
    path: "/home/mood-entry/complex/reflective",
    icon: faPersonWalking,
  },
  {
    name: "Intrigued",
    path: "/home/mood-entry/complex/intrigued",
    icon: faPersonCircleExclamation,
  },
  {
    name: "Envious",
    path: "/home/mood-entry/complex/envious",
    icon: faPersonThroughWindow,
  },
  {
    name: "Cynical",
    path: "/home/mood-entry/complex/cynical",
    icon: faFaceRollingEyes,
  },
  {
    name: "Skeptical",
    path: "/home/mood-entry/complex/skeptical",
    icon: faFaceMehBlank,
  },
  {
    name: "Distracted",
    path: "/home/mood-entry/complex/distracted",
    icon: faPersonWalkingArrowLoopLeft,
  },
  {
    name: "Restless",
    path: "/home/mood-entry/complex/restless",
    icon: faPersonHarassing,
  },
  {
    name: "Alienated",
    path: "/home/mood-entry/complex/alienated",
    icon: faPersonWalkingLuggage,
  },
  {
    name: "Curious",
    path: "/home/mood-entry/complex/curious",
    icon: faMagnifyingGlass,
  },
  {
    name: "Inspired",
    path: "/home/mood-entry/complex/inspired",
    icon: faLightbulb,
  },
]

export default function ComplexMoodPage() {
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
        <h2 className="text-xl font-bold text-[#BDBDBD] dark:text-[#BDBDBD] mb-6">Complex / Ambiguous</h2>
        <EmotionGrid emotions={complexEmotions} color="#BDBDBD" bgColor="#F5F5F5" borderColor="#BDBDBD" />
      </div>
    </div>
  )
}
