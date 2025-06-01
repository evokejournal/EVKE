"use client"

import { useRouter } from "next/navigation"
import EmotionGrid, { type Emotion } from "@/components/mood/emotion-grid"
import {
  faExclamationCircle,
  faBolt,
  faBrain,
  faRunning,
  faSkull,
  faLock,
  faEye,
  faBell,
  faShield,
  faPersonRunning,
  faHourglass,
  faUser,
  faWeight,
  faSpider,
  faMask,
  faRadiation,
  faVirus,
  faFaceFrown,
  faFaceFlushed,
  faFaceGrimace,
} from "@fortawesome/free-solid-svg-icons"
import Header from "@/components/layout/header"

// Fear/Anxiety specific emotions
const fearEmotions: Emotion[] = [
  {
    name: "Worried",
    path: "/home/mood-entry/fear/worried",
    icon: faExclamationCircle,
  },
  {
    name: "Nervous",
    path: "/home/mood-entry/fear/nervous",
    icon: faBolt,
  },
  {
    name: "Anxious",
    path: "/home/mood-entry/fear/anxious",
    icon: faBrain,
  },
  {
    name: "Scared",
    path: "/home/mood-entry/fear/scared",
    icon: faRunning,
  },
  {
    name: "Terrified",
    path: "/home/mood-entry/fear/terrified",
    icon: faSkull,
  },
  {
    name: "Insecure",
    path: "/home/mood-entry/fear/insecure",
    icon: faLock,
  },
  {
    name: "Shy",
    path: "/home/mood-entry/fear/shy",
    icon: faEye,
  },
  {
    name: "Alarmed",
    path: "/home/mood-entry/fear/alarmed",
    icon: faBell,
  },
  {
    name: "Apprehensive",
    path: "/home/mood-entry/fear/apprehensive",
    icon: faShield,
  },
  {
    name: "Panicked",
    path: "/home/mood-entry/fear/panicked",
    icon: faPersonRunning,
  },
  {
    name: "Hesitant",
    path: "/home/mood-entry/fear/hesitant",
    icon: faHourglass,
  },
  {
    name: "Distrustful",
    path: "/home/mood-entry/fear/distrustful",
    icon: faUser,
  },
  {
    name: "Overwhelmed",
    path: "/home/mood-entry/fear/overwhelmed",
    icon: faWeight,
  },
  {
    name: "Dreadful",
    path: "/home/mood-entry/fear/dreadful",
    icon: faSpider,
  },
  {
    name: "Timid",
    path: "/home/mood-entry/fear/timid",
    icon: faMask,
  },
  {
    name: "Paranoid",
    path: "/home/mood-entry/fear/paranoid",
    icon: faRadiation,
  },
  {
    name: "Startled",
    path: "/home/mood-entry/fear/startled",
    icon: faFaceFlushed,
  },
  {
    name: "Conflicted",
    path: "/home/mood-entry/fear/conflicted",
    icon: faFaceFrown,
  },
  {
    name: "Uneasy",
    path: "/home/mood-entry/fear/uneasy",
    icon: faFaceGrimace,
  },
  {
    name: "Exposed",
    path: "/home/mood-entry/fear/exposed",
    icon: faVirus,
  },
]

export default function FearMoodPage() {
  const router = useRouter()

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Header />
      <div className="pt-20 px-4 pb-20">
        <h2 className="text-xl font-bold text-[#FFC107] dark:text-[#FFC107] mb-6">Fear / Anxiety</h2>
        <EmotionGrid emotions={fearEmotions} color="#FFC107" bgColor="#FFF8E1" borderColor="#FFC107" />
      </div>
    </div>
  )
}
