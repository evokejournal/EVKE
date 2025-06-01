"use client"

import EmotionGrid, { type Emotion } from "@/components/mood/emotion-grid"
import EmotionCategoryLayout from "@/components/layout/emotion-category-layout"
import {
  faThumbsDown,
  faUserAlt,
  faCloudRain,
  faPray,
  faBandAid,
  faMask,
  faBalanceScale,
  faGhost,
  faCloudShowersHeavy,
  faUndo,
  faFrown,
  faMeh,
  faArrowDown,
  faUserSlash,
  faHeartBroken,
  faChartLine,
  faShieldAlt,
  faWater,
  faSadTear,
} from "@fortawesome/free-solid-svg-icons"

// Sadness specific emotions
const sadnessEmotions: Emotion[] = [
  {
    name: "Disappointed",
    path: "/home/mood-entry/sadness/disappointed",
    icon: faThumbsDown,
  },
  {
    name: "Lonely",
    path: "/home/mood-entry/sadness/lonely",
    icon: faUserAlt,
  },
  {
    name: "Hopeless",
    path: "/home/mood-entry/sadness/hopeless",
    icon: faCloudRain,
  },
  {
    name: "Grieving",
    path: "/home/mood-entry/sadness/grieving",
    icon: faPray,
  },
  {
    name: "Hurt",
    path: "/home/mood-entry/sadness/hurt",
    icon: faBandAid,
  },
  {
    name: "Ashamed",
    path: "/home/mood-entry/sadness/ashamed",
    icon: faMask,
  },
  {
    name: "Guilty",
    path: "/home/mood-entry/sadness/guilty",
    icon: faBalanceScale,
  },
  {
    name: "Mournful",
    path: "/home/mood-entry/sadness/mournful",
    icon: faGhost,
  },
  {
    name: "Despairing",
    path: "/home/mood-entry/sadness/despairing",
    icon: faCloudShowersHeavy,
  },
  {
    name: "Regretful",
    path: "/home/mood-entry/sadness/regretful",
    icon: faUndo,
  },
  {
    name: "Depressed",
    path: "/home/mood-entry/sadness/depressed",
    icon: faFrown,
  },
  {
    name: "Numb",
    path: "/home/mood-entry/sadness/numb",
    icon: faMeh,
  },
  {
    name: "Downcast",
    path: "/home/mood-entry/sadness/downcast",
    icon: faArrowDown,
  },
  {
    name: "Isolated",
    path: "/home/mood-entry/sadness/isolated",
    icon: faUserSlash,
  },
  {
    name: "Heartbroken",
    path: "/home/mood-entry/sadness/heartbroken",
    icon: faHeartBroken,
  },
  {
    name: "Discouraged",
    path: "/home/mood-entry/sadness/discouraged",
    icon: faChartLine,
  },
  {
    name: "Vulnerable",
    path: "/home/mood-entry/sadness/vulnerable",
    icon: faShieldAlt,
  },
  {
    name: "Melancholy",
    path: "/home/mood-entry/sadness/melancholy",
    icon: faWater,
  },
  {
    name: "Sorrowful",
    path: "/home/mood-entry/sadness/sorrowful",
    icon: faSadTear,
  },
  {
    name: "Defeated",
    path: "/home/mood-entry/sadness/defeated",
    icon: faThumbsDown,
  },
]

export default function SadnessMoodPage() {
  return (
    <EmotionCategoryLayout title="Sadness" color="#2196F3">
      <EmotionGrid emotions={sadnessEmotions} color="#2196F3" bgColor="#E3F2FD" borderColor="#2196F3" />
    </EmotionCategoryLayout>
  )
}
