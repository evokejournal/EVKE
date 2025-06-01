"use client"

import { useRouter } from "next/navigation"
import {
  faHeart,
  faHandHoldingHeart,
  faTemperatureHigh,
  faUserFriends,
  faHandsHolding,
  faFaceSmileBeam,
  faUserDoctor,
  faHeartPulse,
  faRing,
  faShieldHeart,
  faHandsPraying,
  faHouseChimney,
} from "@fortawesome/free-solid-svg-icons"
import type { Emotion } from "@/components/mood/emotion-grid"
import EmotionGrid from "@/components/mood/emotion-grid"

// Love/Connection specific emotions
const loveEmotions: Emotion[] = [
  {
    name: "Affectionate",
    path: "/home/mood-entry/love/affectionate",
    icon: faHeart,
  },
  {
    name: "Compassionate",
    path: "/home/mood-entry/love/compassionate",
    icon: faHandHoldingHeart,
  },
  {
    name: "Warm",
    path: "/home/mood-entry/love/warm",
    icon: faTemperatureHigh,
  },
  {
    name: "Intimate",
    path: "/home/mood-entry/love/intimate",
    icon: faUserFriends,
  },
  {
    name: "Caring",
    path: "/home/mood-entry/love/caring",
    icon: faHandsHolding,
  },
  {
    name: "Sympathetic",
    path: "/home/mood-entry/love/sympathetic",
    icon: faFaceSmileBeam,
  },
  {
    name: "Empathetic",
    path: "/home/mood-entry/love/empathetic",
    icon: faUserDoctor,
  },
  {
    name: "Romantic",
    path: "/home/mood-entry/love/romantic",
    icon: faHeartPulse,
  },
  {
    name: "Devoted",
    path: "/home/mood-entry/love/devoted",
    icon: faRing,
  },
  {
    name: "Trusting",
    path: "/home/mood-entry/love/trusting",
    icon: faShieldHeart,
  },
  {
    name: "Protective",
    path: "/home/mood-entry/love/protective",
    icon: faShieldHeart,
  },
  {
    name: "Appreciative",
    path: "/home/mood-entry/love/appreciative",
    icon: faHandsPraying,
  },
  {
    name: "Forgiving",
    path: "/home/mood-entry/love/forgiving",
    icon: faHandsPraying,
  },
  {
    name: "Secure",
    path: "/home/mood-entry/love/secure",
    icon: faHouseChimney,
  },
  {
    name: "Comforted",
    path: "/home/mood-entry/love/comforted",
    icon: faHouseChimney,
  },
]

export default function LoveMoodPage() {
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
        <h2 className="text-xl font-bold text-[#9C27B0] dark:text-[#9C27B0] mb-6">Love / Connection</h2>
        <EmotionGrid emotions={loveEmotions} color="#9C27B0" bgColor="#F3E5F5" borderColor="#9C27B0" />
      </div>
    </div>
  )
}
