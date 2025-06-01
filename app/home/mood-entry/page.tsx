"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faSmile,
  faSadTear,
  faAngry,
  faFaceFrown,
  faSurprise,
  faHeart,
  faFire,
  faMask,
  faPerson,
  faWater,
  faCodeBranch,
} from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import AppLayout from "@/components/layout/app-layout"

// Emotion category data
const emotionCategories = [
  {
    name: "Joy / Happiness",
    color: "#4CAF50", // Green
    bgColor: "#F1F8E9",
    borderColor: "#4CAF50",
    icon: faSmile,
    path: "/home/mood-entry/joy",
  },
  {
    name: "Sadness",
    color: "#2196F3", // Blue
    bgColor: "#E3F2FD",
    borderColor: "#2196F3",
    icon: faSadTear,
    path: "/home/mood-entry/sadness",
  },
  {
    name: "Anger",
    color: "#F44336", // Red
    bgColor: "#FFEBEE",
    borderColor: "#F44336",
    icon: faAngry,
    path: "/home/mood-entry/anger",
  },
  {
    name: "Fear / Anxiety",
    color: "#FFC107", // Yellow
    bgColor: "#FFF8E1",
    borderColor: "#FFC107",
    icon: faFaceFrown,
    path: "/home/mood-entry/fear",
  },
  {
    name: "Surprise",
    color: "#FF9800", // Orange
    bgColor: "#FFF3E0",
    borderColor: "#FF9800",
    icon: faSurprise,
    path: "/home/mood-entry/surprise",
  },
  {
    name: "Love / Connection",
    color: "#9C27B0", // Purple
    bgColor: "#F3E5F5",
    borderColor: "#9C27B0",
    icon: faHeart,
    path: "/home/mood-entry/love",
  },
  {
    name: "Anticipation / Desire",
    color: "#FF80AB", // Pink
    bgColor: "#FCE4EC",
    borderColor: "#FF80AB",
    icon: faFire,
    path: "/home/mood-entry/anticipation",
  },
  {
    name: "Shame / Guilt",
    color: "#9E9E9E", // Gray
    bgColor: "#F5F5F5",
    borderColor: "#9E9E9E",
    icon: faMask,
    path: "/home/mood-entry/shame",
  },
  {
    name: "Empowerment / Confidence",
    color: "#795548", // Brown
    bgColor: "#EFEBE9",
    borderColor: "#795548",
    icon: faPerson,
    path: "/home/mood-entry/empowerment",
  },
  {
    name: "Calm / Stillness",
    color: "#607D8B", // Blue Gray
    bgColor: "#ECEFF1",
    borderColor: "#607D8B",
    icon: faWater,
    path: "/home/mood-entry/calm",
  },
  {
    name: "Complex / Ambiguous",
    color: "#BDBDBD", // Light Gray
    bgColor: "#F5F5F5",
    borderColor: "#BDBDBD",
    icon: faCodeBranch,
    path: "/home/mood-entry/complex",
  },
]

export default function MoodEntryPage() {
  // Split the emotions into main grid (first 9) and bottom row (last 2)
  const mainGridEmotions = emotionCategories.slice(0, 9)
  const bottomRowEmotions = emotionCategories.slice(9)

  return (
    <AppLayout>
      <div className="pt-4 px-4 pb-20">
        <h2 className="text-xl font-bold text-evoke-purple dark:text-primary-400 mb-6">How are you feeling?</h2>

        {/* Main 3x3 grid */}
        <div className="grid grid-cols-3 gap-3">
          {mainGridEmotions.map((emotion, index) => (
            <Link
              key={index}
              href={emotion.path}
              className="flex flex-col items-center justify-center aspect-square p-4 rounded-2xl overflow-hidden transition-colors dark:bg-black dark:bg-opacity-40"
              style={{
                backgroundColor: emotion.bgColor,
                borderColor: emotion.borderColor,
                borderWidth: "2px",
                borderStyle: "solid",
              }}
            >
              <div className="mb-2" style={{ color: emotion.color }}>
                <FontAwesomeIcon icon={emotion.icon} className="h-8 w-8" />
              </div>
              <span className="text-center text-sm" style={{ color: emotion.color }}>
                {emotion.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Bottom centered row with 2 items */}
        <div className="flex justify-center mt-3">
          {bottomRowEmotions.map((emotion, index) => (
            <Link
              key={index}
              href={emotion.path}
              className="flex flex-col items-center justify-center aspect-square p-4 rounded-2xl overflow-hidden mx-1.5 w-[calc(33.333%-0.5rem)] transition-colors dark:bg-black dark:bg-opacity-40"
              style={{
                backgroundColor: emotion.bgColor,
                borderColor: emotion.borderColor,
                borderWidth: "2px",
                borderStyle: "solid",
              }}
            >
              <div className="mb-2" style={{ color: emotion.color }}>
                <FontAwesomeIcon icon={emotion.icon} className="h-8 w-8" />
              </div>
              <span className="text-center text-sm" style={{ color: emotion.color }}>
                {emotion.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
