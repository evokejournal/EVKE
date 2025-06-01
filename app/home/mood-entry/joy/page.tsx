"use client"

import EmotionGrid, { type Emotion } from "@/components/mood/emotion-grid"
import EmotionCategoryLayout from "@/components/layout/emotion-category-layout"
import {
  faSmile,
  faLaughBeam,
  faGrinStars,
  faGrinBeam,
  faGrinSquint,
  faLaughSquint,
  faPray,
  faSun,
  faTrophy,
  faFireAlt,
  faLightbulb,
  faBolt,
  faHeart,
  faDove,
  faYinYang,
  faThumbsUp,
  faGrinAlt,
  faKissBeam,
  faGlassCheers,
} from "@fortawesome/free-solid-svg-icons"

// Joy/Happiness specific emotions
const joyEmotions: Emotion[] = [
  {
    name: "Content",
    icon: faSmile,
    slug: "content",
  },
  {
    name: "Cheerful",
    icon: faLaughBeam,
    slug: "cheerful",
  },
  {
    name: "Elated",
    icon: faGrinBeam,
    slug: "elated",
  },
  {
    name: "Ecstatic",
    icon: faGrinStars,
    slug: "ecstatic",
  },
  {
    name: "Euphoric",
    icon: faGrinSquint,
    slug: "euphoric",
  },
  {
    name: "Amused",
    icon: faLaughSquint,
    slug: "amused",
  },
  {
    name: "Playful",
    icon: faGrinAlt,
    slug: "playful",
  },
  {
    name: "Grateful",
    icon: faPray,
    slug: "grateful",
  },
  {
    name: "Optimistic",
    icon: faSun,
    slug: "optimistic",
  },
  {
    name: "Proud",
    icon: faTrophy,
    slug: "proud",
  },
  {
    name: "Excited",
    icon: faFireAlt,
    slug: "excited",
  },
  {
    name: "Inspired",
    icon: faLightbulb,
    slug: "inspired",
  },
  {
    name: "Energetic",
    icon: faBolt,
    slug: "energetic",
  },
  {
    name: "Loving",
    icon: faHeart,
    slug: "loving",
  },
  {
    name: "Peaceful",
    icon: faDove,
    slug: "peaceful",
  },
  {
    name: "Serene",
    icon: faYinYang,
    slug: "serene",
  },
  {
    name: "Satisfied",
    icon: faThumbsUp,
    slug: "satisfied",
  },
  {
    name: "Pleased",
    icon: faSmile,
    slug: "pleased",
  },
  {
    name: "Delighted",
    icon: faKissBeam,
    slug: "delighted",
  },
  {
    name: "Blissful",
    icon: faGlassCheers,
    slug: "blissful",
  },
]

export default function JoyMoodPage() {
  return (
    <EmotionCategoryLayout title="Joy / Happiness" color="#4CAF50">
      <EmotionGrid emotions={joyEmotions} color="#4CAF50" bgColor="#F1F8E9" borderColor="#4CAF50" categorySlug="joy" />
    </EmotionCategoryLayout>
  )
}
