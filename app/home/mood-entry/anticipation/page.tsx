"use client"

import { useRouter } from "next/navigation"
import {
  faSeedling,
  faMagnifyingGlass,
  faHourglassHalf,
  faHandHolding,
  faFire,
  faLightbulb,
  faPersonRunning,
  faRocket,
  faFaceGrinBeam,
  faPersonDigging,
  faChessKnight,
  faPersonCircleExclamation,
  faPersonRays,
} from "@fortawesome/free-solid-svg-icons"
import type { Emotion } from "@/components/mood/emotion-grid"
import EmotionGrid from "@/components/mood/emotion-grid"

// Anticipation/Desire specific emotions
const anticipationEmotions: Emotion[] = [
  {
    name: "Hopeful",
    path: "/home/mood-entry/anticipation/hopeful",
    icon: faSeedling,
  },
  {
    name: "Curious",
    path: "/home/mood-entry/anticipation/curious",
    icon: faMagnifyingGlass,
  },
  {
    name: "Longing",
    path: "/home/mood-entry/anticipation/longing",
    icon: faHourglassHalf,
  },
  {
    name: "Yearning",
    path: "/home/mood-entry/anticipation/yearning",
    icon: faHandHolding,
  },
  {
    name: "Desirous",
    path: "/home/mood-entry/anticipation/desirous",
    icon: faFire,
  },
  {
    name: "Inspired",
    path: "/home/mood-entry/anticipation/inspired",
    icon: faLightbulb,
  },
  {
    name: "Passionate",
    path: "/home/mood-entry/anticipation/passionate",
    icon: faFire,
  },
  {
    name: "Motivated",
    path: "/home/mood-entry/anticipation/motivated",
    icon: faPersonRunning,
  },
  {
    name: "Eager",
    path: "/home/mood-entry/anticipation/eager",
    icon: faRocket,
  },
  {
    name: "Enthusiastic",
    path: "/home/mood-entry/anticipation/enthusiastic",
    icon: faFaceGrinBeam,
  },
  {
    name: "Determined",
    path: "/home/mood-entry/anticipation/determined",
    icon: faPersonDigging,
  },
  {
    name: "Ambitious",
    path: "/home/mood-entry/anticipation/ambitious",
    icon: faChessKnight,
  },
  {
    name: "Focussed",
    path: "/home/mood-entry/anticipation/focussed",
    icon: faPersonCircleExclamation,
  },
  {
    name: "Zealous",
    path: "/home/mood-entry/anticipation/zealous",
    icon: faPersonRays,
  },
]

export default function AnticipationMoodPage() {
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
        <h2 className="text-xl font-bold text-[#FF80AB] dark:text-[#FF80AB] mb-6">Anticipation / Desire</h2>
        <EmotionGrid emotions={anticipationEmotions} color="#FF80AB" bgColor="#FCE4EC" borderColor="#FF80AB" />
      </div>
    </div>
  )
}
