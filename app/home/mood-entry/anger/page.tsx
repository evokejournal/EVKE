"use client"

import EmotionGrid, { type Emotion } from "@/components/mood/emotion-grid"
import {
  faBug,
  faExclamation,
  faBomb,
  faFire,
  faSkull,
  faWineGlass,
  faWind,
  faEye,
  faSkullCrossbones,
  faFaceDizzy,
  faRadiation,
  faCommentSlash,
  faHandRock,
  faTriangleExclamation,
  faPerson,
  faFaceTired,
  faComments,
  faFaceAngry,
  faBolt,
} from "@fortawesome/free-solid-svg-icons"
import Header from "@/components/layout/header"

// Anger specific emotions
const angerEmotions: Emotion[] = [
  {
    name: "Annoyed",
    path: "/home/mood-entry/anger/annoyed",
    icon: faBug,
  },
  {
    name: "Irritated",
    path: "/home/mood-entry/anger/irritated",
    icon: faExclamation,
  },
  {
    name: "Frustrated",
    path: "/home/mood-entry/anger/frustrated",
    icon: faBomb,
  },
  {
    name: "Enraged",
    path: "/home/mood-entry/anger/enraged",
    icon: faFire,
  },
  {
    name: "Resentful",
    path: "/home/mood-entry/anger/resentful",
    icon: faSkull,
  },
  {
    name: "Bitter",
    path: "/home/mood-entry/anger/bitter",
    icon: faWineGlass,
  },
  {
    name: "Agitated",
    path: "/home/mood-entry/anger/agitated",
    icon: faWind,
  },
  {
    name: "Jealous",
    path: "/home/mood-entry/anger/jealous",
    icon: faEye,
  },
  {
    name: "Vengeful",
    path: "/home/mood-entry/anger/vengeful",
    icon: faSkullCrossbones,
  },
  {
    name: "Hateful",
    path: "/home/mood-entry/anger/hateful",
    icon: faSkullCrossbones,
  },
  {
    name: "Disgusted",
    path: "/home/mood-entry/anger/disgusted",
    icon: faFaceDizzy,
  },
  {
    name: "Hostile",
    path: "/home/mood-entry/anger/hostile",
    icon: faRadiation,
  },
  {
    name: "Critical",
    path: "/home/mood-entry/anger/critical",
    icon: faCommentSlash,
  },
  {
    name: "Defiant",
    path: "/home/mood-entry/anger/defiant",
    icon: faHandRock,
  },
  {
    name: "Offended",
    path: "/home/mood-entry/anger/offended",
    icon: faTriangleExclamation,
  },
  {
    name: "Indignant",
    path: "/home/mood-entry/anger/indignant",
    icon: faPerson,
  },
  {
    name: "Outraged",
    path: "/home/mood-entry/anger/outraged",
    icon: faBolt,
  },
  {
    name: "Impatient",
    path: "/home/mood-entry/anger/impatient",
    icon: faFaceTired,
  },
  {
    name: "Sarcastic",
    path: "/home/mood-entry/anger/sarcastic",
    icon: faComments,
  },
  {
    name: "Furious",
    path: "/home/mood-entry/anger/furious",
    icon: faFaceAngry,
  },
]

export default function AngerMoodPage() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Header />
      <div className="pt-20 px-4 pb-20">
        <h2 className="text-xl font-bold text-[#F44336] dark:text-[#F44336] mb-6">Anger</h2>
        <EmotionGrid emotions={angerEmotions} color="#F44336" bgColor="#FFEBEE" borderColor="#F44336" />
      </div>
    </div>
  )
}
