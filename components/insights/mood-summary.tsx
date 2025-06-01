"use client"

import { useMemo } from "react"
import { getEmotionMetadata } from "@/data/emotion-metadata"

interface MoodSummaryProps {
  timeframe: "week" | "month" | "year"
  entries: any[]
}

export default function MoodSummary({ timeframe, entries = [] }: MoodSummaryProps) {
  // Filter entries based on timeframe
  const filteredEntries = useMemo(() => {
    try {
      if (!Array.isArray(entries)) return []

      const now = new Date()
      let cutoffDate: Date

      switch (timeframe) {
        case "week":
          cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          break
        case "month":
          cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          break
        case "year":
          cutoffDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
          break
      }

      return entries.filter((entry) => entry && entry.timestamp && new Date(entry.timestamp) >= cutoffDate)
    } catch (err) {
      console.error("Error filtering entries in MoodSummary:", err)
      return []
    }
  }, [entries, timeframe])

  // Calculate average balance score
  const averageBalance = useMemo(() => {
    try {
      if (!filteredEntries.length) return 50

      let totalBalance = 0
      let count = 0

      filteredEntries.forEach((entry) => {
        if (!entry) return

        if (entry.balanceRating) {
          totalBalance += entry.balanceRating
          count++
        } else if (entry.emotionName) {
          const metadata = getEmotionMetadata(entry.emotionName)
          if (metadata?.balanceRating) {
            totalBalance += metadata.balanceRating
            count++
          }
        }
      })

      return count > 0 ? Math.round(totalBalance / count) : 50
    } catch (err) {
      console.error("Error calculating average balance in MoodSummary:", err)
      return 50
    }
  }, [filteredEntries])

  // Generate summary text based on entries and balance score
  const summaryText = useMemo(() => {
    try {
      if (!filteredEntries.length) {
        return `No mood entries found for this ${timeframe}. Start tracking your emotions to see insights here.`
      }

      // Count emotions by category
      const categoryCounts: Record<string, number> = {}
      filteredEntries.forEach((entry) => {
        if (!entry || !entry.emotionName) return

        const metadata = getEmotionMetadata(entry.emotionName)
        if (metadata?.category) {
          categoryCounts[metadata.category] = (categoryCounts[metadata.category] || 0) + 1
        }
      })

      // Get top categories
      const categoriesArray = Object.keys(categoryCounts).map((category) => ({
        category,
        count: categoryCounts[category],
      }))

      const topCategories = categoriesArray
        .sort((a, b) => b.count - a.count)
        .slice(0, 2)
        .map((item) => item.category)

      // Get most frequent emotions
      const emotionCounts: Record<string, number> = {}
      filteredEntries.forEach((entry) => {
        if (!entry || !entry.emotionName) return
        emotionCounts[entry.emotionName] = (emotionCounts[entry.emotionName] || 0) + 1
      })

      const emotionsArray = Object.keys(emotionCounts).map((emotion) => ({
        emotion,
        count: emotionCounts[emotion],
      }))

      const topEmotions = emotionsArray
        .sort((a, b) => b.count - a.count)
        .slice(0, 3)
        .map((item) => item.emotion)

      // Generate summary based on balance score and top emotions/categories
      let balanceDescription = ""
      if (averageBalance < 30) {
        balanceDescription = "challenging"
      } else if (averageBalance < 45) {
        balanceDescription = "somewhat challenging"
      } else if (averageBalance < 55) {
        balanceDescription = "balanced"
      } else if (averageBalance < 70) {
        balanceDescription = "somewhat positive"
      } else {
        balanceDescription = "very positive"
      }

      // Generate different summaries for different timeframes
      switch (timeframe) {
        case "week":
          return `Your emotional landscape this ${timeframe} has been predominantly ${balanceDescription}. ${
            topEmotions.length > 0 ? `You've frequently experienced ${topEmotions.join(", ")}, ` : ""
          }with most entries falling in the ${topCategories.length > 0 ? topCategories.join(" and ") : "various"} categories. ${
            averageBalance < 40
              ? "Consider exploring the CBT exercises that might help address these challenging emotions."
              : "Your reflection responses show good emotional awareness and self-regulation."
          }`

        case "month":
          return `This ${timeframe} shows a ${balanceDescription} emotional pattern. ${
            topEmotions.length > 0 ? `Your most frequent emotions were ${topEmotions.join(", ")}, ` : ""
          }primarily in the ${topCategories.length > 0 ? topCategories.join(" and ") : "various"} categories. ${
            averageBalance < 40
              ? "The data suggests you might benefit from more regular practice of mood-boosting activities."
              : "Your entries demonstrate consistent emotional processing and reflection."
          } ${
            filteredEntries.length > 10
              ? "Your regular tracking is providing valuable insights into your emotional patterns."
              : "More consistent tracking would provide even deeper insights into your emotional patterns."
          }`

        case "year":
          return `Your ${timeframe}-long emotional journey reveals a ${balanceDescription} overall pattern. ${
            topEmotions.length > 0 ? `You've most commonly experienced ${topEmotions.join(", ")}, ` : ""
          }with a predominance of entries in the ${topCategories.length > 0 ? topCategories.join(" and ") : "various"} categories. ${
            averageBalance < 40
              ? "Looking at long-term patterns may help identify situations that consistently challenge your emotional wellbeing."
              : "The data suggests you've developed effective emotional regulation strategies over time."
          } ${
            filteredEntries.length > 50
              ? "Your consistent tracking provides a comprehensive view of your emotional health journey."
              : "More regular tracking would provide a more complete picture of your emotional patterns over time."
          }`
      }
    } catch (err) {
      console.error("Error generating summary text in MoodSummary:", err)
      return `Unable to generate insights for this ${timeframe}. Please try again later.`
    }
  }, [filteredEntries, timeframe, averageBalance])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">AI Mood Analysis</h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{summaryText}</p>
    </div>
  )
}
