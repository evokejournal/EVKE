"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBalanceScale } from "@fortawesome/free-solid-svg-icons"

interface MonthlyFlowChartProps {
  entries: any[]
}

// Define emotion categories and their official colors from emotion-metadata.ts
const EMOTION_CATEGORIES = {
  "Joy / Happiness": "#4CAF50", // Green
  Sadness: "#2196F3", // Blue
  Anger: "#F44336", // Red
  "Fear / Anxiety": "#FFC107", // Amber/Yellow
  Surprise: "#FF9800", // Orange
  "Love / Connection": "#9C27B0", // Purple
  "Anticipation / Desire": "#FF80AB", // Pink
  "Shame / Guilt": "#9E9E9E", // Gray
  "Empowerment / Confidence": "#795548", // Brown
  "Calm / Stillness": "#607D8B", // Blue-Gray
  "Complex / Ambiguous": "#BDBDBD", // Light Gray
}

// Mapping of emotions to their categories
const EMOTION_TO_CATEGORY = {
  // Joy / Happiness
  content: "Joy / Happiness",
  cheerful: "Joy / Happiness",
  elated: "Joy / Happiness",
  ecstatic: "Joy / Happiness",
  amused: "Joy / Happiness",
  playful: "Joy / Happiness",
  grateful: "Joy / Happiness",
  optimistic: "Joy / Happiness",
  proud: "Joy / Happiness",
  excited: "Joy / Happiness",
  inspired: "Joy / Happiness",
  energetic: "Joy / Happiness",
  loving: "Love / Connection",
  peaceful: "Calm / Stillness",
  serene: "Calm / Stillness",
  satisfied: "Joy / Happiness",
  pleased: "Joy / Happiness",
  delighted: "Joy / Happiness",
  blissful: "Joy / Happiness",
  joy: "Joy / Happiness",
  happy: "Joy / Happiness",
  happiness: "Joy / Happiness",

  // Sadness
  disappointed: "Sadness",
  lonely: "Sadness",
  hopeless: "Sadness",
  grieving: "Sadness",
  hurt: "Sadness",
  ashamed: "Shame / Guilt",
  guilty: "Shame / Guilt",
  mournful: "Sadness",
  despairing: "Sadness",
  regretful: "Shame / Guilt",
  depressed: "Sadness",
  numb: "Complex / Ambiguous",
  downcast: "Sadness",
  isolated: "Sadness",
  heartbroken: "Sadness",
  discouraged: "Sadness",
  vulnerable: "Fear / Anxiety",
  melancholy: "Sadness",
  sorrowful: "Sadness",
  defeated: "Sadness",
  sad: "Sadness",

  // Anger
  annoyed: "Anger",
  irritated: "Anger",
  frustrated: "Anger",
  enraged: "Anger",
  resentful: "Anger",
  bitter: "Anger",
  agitated: "Anger",
  jealous: "Anger",
  vengeful: "Anger",
  hateful: "Anger",
  disgusted: "Anger",
  hostile: "Anger",
  critical: "Anger",
  defiant: "Anger",
  offended: "Anger",
  indignant: "Anger",
  outraged: "Anger",
  impatient: "Anger",
  sarcastic: "Anger",
  furious: "Anger",
  angry: "Anger",

  // Fear / Anxiety
  worried: "Fear / Anxiety",
  nervous: "Fear / Anxiety",
  anxious: "Fear / Anxiety",
  scared: "Fear / Anxiety",
  terrified: "Fear / Anxiety",
  insecure: "Fear / Anxiety",
  shy: "Fear / Anxiety",
  alarmed: "Fear / Anxiety",
  apprehensive: "Fear / Anxiety",
  panicked: "Fear / Anxiety",
  hesitant: "Fear / Anxiety",
  distrustful: "Fear / Anxiety",
  overwhelmed: "Fear / Anxiety",
  dreadful: "Fear / Anxiety",
  timid: "Fear / Anxiety",
  paranoid: "Fear / Anxiety",
  startled: "Surprise",
  conflicted: "Complex / Ambiguous",
  uneasy: "Fear / Anxiety",
  exposed: "Fear / Anxiety",
  fear: "Fear / Anxiety",
  afraid: "Fear / Anxiety",

  // Surprise
  amazed: "Surprise",
  shocked: "Surprise",
  stunned: "Surprise",
  confused: "Surprise",
  disoriented: "Surprise",
  curious: "Surprise",
  intrigued: "Surprise",
  awestruck: "Surprise",
  uncertain: "Surprise",
  baffled: "Surprise",
  dazed: "Surprise",
  surprised: "Surprise",

  // Love / Connection
  affectionate: "Love / Connection",
  compassionate: "Love / Connection",
  warm: "Love / Connection",
  intimate: "Love / Connection",
  caring: "Love / Connection",
  sympathetic: "Love / Connection",
  empathetic: "Love / Connection",
  romantic: "Love / Connection",
  devoted: "Love / Connection",
  trusting: "Love / Connection",
  protective: "Love / Connection",
  appreciative: "Love / Connection",
  forgiving: "Love / Connection",
  secure: "Love / Connection",
  comforted: "Calm / Stillness",
  love: "Love / Connection",

  // Anticipation / Desire
  hopeful: "Anticipation / Desire",
  longing: "Anticipation / Desire",
  yearning: "Anticipation / Desire",
  desirous: "Anticipation / Desire",
  passionate: "Anticipation / Desire",
  motivated: "Anticipation / Desire",
  eager: "Anticipation / Desire",
  enthusiastic: "Anticipation / Desire",
  determined: "Anticipation / Desire",
  ambitious: "Anticipation / Desire",
  focussed: "Anticipation / Desire",
  zealous: "Anticipation / Desire",
  anticipation: "Anticipation / Desire",

  // Shame / Guilt
  embarrassed: "Shame / Guilt",
  humiliated: "Shame / Guilt",
  regretful: "Shame / Guilt",
  remorseful: "Shame / Guilt",
  inadequate: "Shame / Guilt",
  unworthy: "Shame / Guilt",
  inferior: "Shame / Guilt",
  shame: "Shame / Guilt",

  // Empowerment / Confidence
  bold: "Empowerment / Confidence",
  assertive: "Empowerment / Confidence",
  confident: "Empowerment / Confidence",
  strong: "Empowerment / Confidence",
  capable: "Empowerment / Confidence",
  resilient: "Empowerment / Confidence",
  independent: "Empowerment / Confidence",
  grounded: "Calm / Stillness",
  courageous: "Empowerment / Confidence",
  brave: "Empowerment / Confidence",
  empowered: "Empowerment / Confidence",
  centered: "Calm / Stillness",
  "self-assured": "Empowerment / Confidence",
  empowerment: "Empowerment / Confidence",

  // Calm / Stillness
  relaxed: "Calm / Stillness",
  tranquil: "Calm / Stillness",
  reflective: "Calm / Stillness",
  meditative: "Calm / Stillness",
  settled: "Calm / Stillness",
  balanced: "Calm / Stillness",
  safe: "Calm / Stillness",
  open: "Calm / Stillness",
  calm: "Calm / Stillness",

  // Complex / Ambiguous
  conflicted: "Complex / Ambiguous",
  nostalgic: "Complex / Ambiguous",
  awkward: "Complex / Ambiguous",
  ambivalent: "Complex / Ambiguous",
  mixed: "Complex / Ambiguous",
  detached: "Complex / Ambiguous",
  indifferent: "Complex / Ambiguous",
  bored: "Complex / Ambiguous",
  surreal: "Complex / Ambiguous",
  pensive: "Complex / Ambiguous",
  envious: "Complex / Ambiguous",
  cynical: "Complex / Ambiguous",
  skeptical: "Complex / Ambiguous",
  distracted: "Complex / Ambiguous",
  restless: "Complex / Ambiguous",
  alienated: "Complex / Ambiguous",
  complex: "Complex / Ambiguous",
}

// Get category for an emotion
function getEmotionCategory(emotionName: string): string {
  const lowerName = emotionName.toLowerCase()

  // Direct match in mapping
  if (EMOTION_TO_CATEGORY[lowerName]) {
    return EMOTION_TO_CATEGORY[lowerName]
  }

  // Check for partial matches
  for (const [key, value] of Object.entries(EMOTION_TO_CATEGORY)) {
    if (lowerName.includes(key)) {
      return value
    }
  }

  // Check if the emotion name itself is a category
  for (const category of Object.keys(EMOTION_CATEGORIES)) {
    if (lowerName.includes(category.toLowerCase())) {
      return category
    }
  }

  // Default to Complex / Ambiguous if no match
  return "Complex / Ambiguous"
}

const categories = Object.keys(EMOTION_CATEGORIES)

export default function MonthlyFlowChart({ entries = [] }: MonthlyFlowChartProps) {
  const { chartData, topCategories } = useMemo(() => {
    try {
      // Ensure entries is an array
      if (!Array.isArray(entries)) {
        console.error("Entries is not an array:", entries)
        return { chartData: [], topCategories: [] }
      }

      console.log("Monthly Flow Chart - Processing entries:", entries.length)

      // If we have no entries at all, create some dummy data
      if (entries.length === 0) {
        // Create dummy data with placeholder categories
        const dummyCategories = [
          { name: "Joy / Happiness", color: "#4CAF50" },
          { name: "Calm / Stillness", color: "#607D8B" },
          { name: "Anticipation / Desire", color: "#FF80AB" },
        ]

        const dummyChartData = [
          {
            week: "Week 1",
            weekNumber: 1,
            "Joy / Happiness": 0,
            "Calm / Stillness": 0,
            "Anticipation / Desire": 0,
          },
          {
            week: "Week 2",
            weekNumber: 2,
            "Joy / Happiness": 0,
            "Calm / Stillness": 0,
            "Anticipation / Desire": 0,
          },
          {
            week: "Week 3",
            weekNumber: 3,
            "Joy / Happiness": 0,
            "Calm / Stillness": 0,
            "Anticipation / Desire": 0,
          },
          {
            week: "Week 4",
            weekNumber: 4,
            "Joy / Happiness": 1,
            "Calm / Stillness": 0,
            "Anticipation / Desire": 0,
          },
        ]

        return { chartData: dummyChartData, topCategories: dummyCategories }
      }

      // Group entries by week (relative to today)
      const now = new Date()
      const currentYear = now.getFullYear()
      const currentMonth = now.getMonth()
      const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
      const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
      const daysInMonth = lastDayOfMonth.getDate()

      // Calculate week boundaries for the current month
      const weekBoundaries = [
        1, // First day of month
        Math.min(8, daysInMonth), // Start of week 2
        Math.min(15, daysInMonth), // Start of week 3
        Math.min(22, daysInMonth), // Start of week 4
        daysInMonth + 1, // One past the last day of month
      ]

      // Group entries by week of the month
      const weeklyEntriesByMonth = [[], [], [], []] // 4 weeks

      entries.forEach((entry) => {
        if (!entry || entry.type === "general") return // Skip general entries

        try {
          // If no timestamp, assign to the most recent week
          if (!entry.timestamp) {
            weeklyEntriesByMonth[3].push(entry)
            return
          }

          const entryDate = new Date(entry.timestamp)

          // Only include entries from current month
          if (entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear) {
            const dayOfMonth = entryDate.getDate()

            // Determine which week this entry belongs to
            let weekIndex = 0
            for (let i = 1; i < weekBoundaries.length - 1; i++) {
              if (dayOfMonth >= weekBoundaries[i]) {
                weekIndex = i
              }
            }

            weeklyEntriesByMonth[weekIndex].push(entry)
          }
        } catch (err) {
          console.error("Error processing entry:", err, entry)
          // If there's an error, still add the entry to the most recent week
          weeklyEntriesByMonth[3].push(entry)
        }
      })

      // Count emotion categories by week
      const categoriesByWeek = weeklyEntriesByMonth.map((weekEntries) => {
        const categoryCounts = {}

        weekEntries.forEach((entry) => {
          // Get emotion name, with fallbacks
          let emotionName = entry.emotionName

          // If no emotion name, try to get it from category or use "Unknown"
          if (!emotionName) {
            if (entry.category) {
              emotionName = entry.category
            } else {
              emotionName = "Unknown"
            }
          }

          // Get the category for this emotion
          const category = getEmotionCategory(emotionName)

          if (!categoryCounts[category]) {
            categoryCounts[category] = {
              count: 0,
              name: category,
              color: EMOTION_CATEGORIES[category] || "#BDBDBD",
            }
          }

          categoryCounts[category].count++
        })

        return Object.values(categoryCounts)
      })

      // Find top categories across the month
      const allCategories = {}
      categoriesByWeek.forEach((weekCategories: any[]) => {
        weekCategories.forEach((categoryData: any) => {
          if (!allCategories[categoryData.name]) {
            allCategories[categoryData.name] = {
              name: categoryData.name,
              color: categoryData.color,
              totalCount: 0,
            }
          }
          allCategories[categoryData.name].totalCount += categoryData.count
        })
      })

      // If we have no categories detected, create some dummy ones
      if (Object.keys(allCategories).length === 0) {
        allCategories["Joy / Happiness"] = { name: "Joy / Happiness", color: "#4CAF50", totalCount: 1 }
        allCategories["Calm / Stillness"] = { name: "Calm / Stillness", color: "#607D8B", totalCount: 1 }
        allCategories["Anticipation / Desire"] = { name: "Anticipation / Desire", color: "#FF80AB", totalCount: 1 }
      }

      const topCategories = Object.values(allCategories)
        .sort((a: any, b: any) => b.totalCount - a.totalCount)
        .slice(0, 5)

      // Create chart data
      const chartData = [
        { week: "Week 1", weekNumber: 1 },
        { week: "Week 2", weekNumber: 2 },
        { week: "Week 3", weekNumber: 3 },
        { week: "Week 4", weekNumber: 4 },
      ]

      // Fill in category counts for each week
      chartData.forEach((weekData, weekIndex) => {
        // Initialize all top categories to 0 for this week
        topCategories.forEach((category: any) => {
          weekData[category.name] = 0
        })

        // Fill in actual counts
        const weekCategories = categoriesByWeek[weekIndex] || []
        weekCategories.forEach((categoryData: any) => {
          if (topCategories.some((topCategory: any) => topCategory.name === categoryData.name)) {
            weekData[categoryData.name] = categoryData.count
          }
        })
      })

      // Ensure at least some data is visible by adding minimum values
      let hasAnyData = false
      chartData.forEach((weekData) => {
        topCategories.forEach((category: any) => {
          if (weekData[category.name] > 0) {
            hasAnyData = true
          }
        })
      })

      // If no data at all, add some minimal values to make the chart visible
      if (!hasAnyData) {
        chartData[3][topCategories[0].name] = 1 // Add a value to the most recent week
      }

      return { chartData, topCategories }
    } catch (err) {
      console.error("Error generating chart data:", err)
      return { chartData: [], topCategories: [] }
    }
  }, [entries])

  // Custom tick component for positioning Week 1 and Week 4 labels inside
  const CustomTick = (props: any) => {
    const { x, y, payload } = props

    if (!payload || !payload.value) {
      return null
    }

    const isWeek1 = payload.value === "Week 1"
    const isWeek4 = payload.value === "Week 4"
    const isEdgeWeek = isWeek1 || isWeek4

    // Adjust x position for edge weeks to move labels inside
    let adjustedX = x
    if (isWeek1) {
      adjustedX = x + 20 // Move Week 1 label to the right (inside)
    } else if (isWeek4) {
      adjustedX = x - 20 // Move Week 4 label to the left (inside)
    }

    return (
      <text x={adjustedX} y={y} textAnchor="middle" fontSize={12} fill="currentColor" className="dark:fill-gray-300">
        {payload.value}
      </text>
    )
  }

  return (
    <Card className="w-full bg-white dark:bg-gray-900 overflow-hidden">
      <CardHeader className="pb-0">
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          Monthly Flow
          <FontAwesomeIcon icon={faBalanceScale} className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 dark:text-gray-300">
          See how your top emotion categories flow throughout the month
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 bg-white dark:bg-gray-900">
        <div className="h-[450px] w-full bg-white dark:bg-gray-900">
          <ResponsiveContainer width="100%" height="100%" className="mx-auto">
            <AreaChart data={chartData} margin={{ top: 40, right: 0, left: -10, bottom: 40 }} className="w-full">
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

              {/* Perforated vertical lines for week markers */}
              <ReferenceLine x="Week 1" stroke="#999" strokeDasharray="4 4" opacity={0.6} />
              <ReferenceLine x="Week 2" stroke="#999" strokeDasharray="4 4" opacity={0.6} />
              <ReferenceLine x="Week 3" stroke="#999" strokeDasharray="4 4" opacity={0.6} />
              <ReferenceLine x="Week 4" stroke="#999" strokeDasharray="4 4" opacity={0.6} />

              <XAxis dataKey="week" tick={<CustomTick />} tickLine={false} axisLine={{ stroke: "#E0E0E0" }} />
              <YAxis
                tickFormatter={() => ""} // Remove y-axis text
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--tooltip-bg)",
                  border: "1px solid var(--tooltip-border)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value, name) => [`${value} entries`, name]}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    // Filter out zero values
                    const nonZeroPayload = payload.filter((p) => p.value > 0)

                    if (nonZeroPayload.length === 0) return null

                    return (
                      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-3 rounded-lg shadow-lg">
                        <div className="font-medium text-gray-900 dark:text-gray-100 mb-1">{label}</div>
                        <div className="h-px w-full bg-gray-200 dark:bg-gray-700 my-2"></div>
                        <div className="space-y-2">
                          {nonZeroPayload.map((entry, index) => {
                            // Find the matching category to get its color
                            const category = topCategories.find((c) => c.name === entry.name)
                            const color = category?.color || EMOTION_CATEGORIES[entry.name] || "#BDBDBD"

                            return (
                              <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color }} />
                                  <span className="text-sm text-gray-700 dark:text-gray-300">{entry.name}:</span>
                                </div>
                                <span className="font-medium text-gray-900 dark:text-gray-100">
                                  {entry.value} entries
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              {topCategories.map((category: any, index: number) => (
                <Area
                  key={index}
                  type="natural"
                  dataKey={category.name}
                  name={category.name}
                  stackId="1"
                  stroke={category.color}
                  fill={category.color}
                  fillOpacity={0.7}
                  strokeWidth={3}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
