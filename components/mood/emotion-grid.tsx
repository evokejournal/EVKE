"use client"

import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"

export interface Emotion {
  name: string
  icon: IconDefinition
  path?: string
  slug?: string
}

interface EmotionGridProps {
  emotions: Emotion[]
  color: string
  bgColor: string
  borderColor: string
  categorySlug?: string
}

export default function EmotionGrid({ emotions, color, bgColor, borderColor, categorySlug }: EmotionGridProps) {
  // Calculate how many rows of 3 we need
  const fullRows = Math.floor(emotions.length / 3)
  const remainingItems = emotions.length % 3

  // Split emotions into main grid and bottom row if needed
  const mainGridEmotions = emotions.slice(0, fullRows * 3)
  const bottomRowEmotions = remainingItems > 0 ? emotions.slice(fullRows * 3) : []

  return (
    <>
      {/* Main grid */}
      <div className="grid grid-cols-3 gap-3">
        {mainGridEmotions.map((emotion, index) => {
          // If path is provided, use it directly
          // Otherwise, construct path from category and emotion slug
          const path =
            emotion.path ||
            (categorySlug && emotion.slug
              ? `/home/mood-entry/${categorySlug}/${emotion.slug.toLowerCase()}`
              : `/home/mood-entry/${categorySlug}/${emotion.name.toLowerCase()}`)

          return (
            <Link
              key={index}
              href={path}
              className="flex flex-col items-center justify-center aspect-square p-4 rounded-2xl overflow-hidden transition-colors"
              style={{
                backgroundColor: bgColor,
                borderColor: borderColor,
                borderWidth: "2px",
                borderStyle: "solid",
                // Dark mode overrides
                ...(typeof window !== "undefined" &&
                  document.documentElement.classList.contains("dark") && {
                    backgroundColor: "rgb(17, 24, 39)",
                  }),
              }}
            >
              <div className="mb-2" style={{ color }}>
                <FontAwesomeIcon icon={emotion.icon} className="h-8 w-8" />
              </div>
              <span className="text-center text-sm" style={{ color }}>
                {emotion.name}
              </span>
            </Link>
          )
        })}
      </div>

      {/* Bottom centered row if needed */}
      {bottomRowEmotions.length > 0 && (
        <div className="flex justify-center mt-3">
          {bottomRowEmotions.map((emotion, index) => {
            // If path is provided, use it directly
            // Otherwise, construct path from category and emotion slug
            const path =
              emotion.path ||
              (categorySlug && emotion.slug
                ? `/home/mood-entry/${categorySlug}/${emotion.slug.toLowerCase()}`
                : `/home/mood-entry/${categorySlug}/${emotion.name.toLowerCase()}`)

            return (
              <Link
                key={index}
                href={path}
                className={`flex flex-col items-center justify-center aspect-square p-4 rounded-2xl overflow-hidden mx-1.5 transition-colors ${
                  bottomRowEmotions.length === 1
                    ? "w-[calc(33.333%-0.5rem)]"
                    : bottomRowEmotions.length === 2
                      ? "w-[calc(33.333%-0.5rem)]"
                      : "w-[calc(33.333%-0.5rem)]"
                }`}
                style={{
                  backgroundColor: bgColor,
                  borderColor: borderColor,
                  borderWidth: "2px",
                  borderStyle: "solid",
                  // Dark mode overrides
                  ...(typeof window !== "undefined" &&
                    document.documentElement.classList.contains("dark") && {
                      backgroundColor: "rgb(17, 24, 39)",
                    }),
                }}
              >
                <div className="mb-2" style={{ color }}>
                  <FontAwesomeIcon icon={emotion.icon} className="h-8 w-8" />
                </div>
                <span className="text-center text-sm" style={{ color }}>
                  {emotion.name}
                </span>
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}
