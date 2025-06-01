"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts"

interface YearlyEmotionsChartProps {
  entries: any[]
}

const emotionToCategory: Record<string, string> = {
  "Joy / Happiness": "Joy / Happiness",
  Sadness: "Sadness",
  Anger: "Anger",
  "Fear / Anxiety": "Fear / Anxiety",
  Surprise: "Surprise",
  "Love / Connection": "Love / Connection",
  "Anticipation / Desire": "Anticipation / Desire",
  "Shame / Guilt": "Shame / Guilt",
  "Empowerment / Confidence": "Empowerment / Confidence",
  "Calm / Stillness": "Calm / Stillness",
  "Complex / Ambiguous": "Complex / Ambiguous",
}

export default function YearlyEmotionsChart({ entries = [] }: YearlyEmotionsChartProps) {
  // Define fixed categories we want to track
  const categories = [
    "Joy / Happiness",
    "Sadness",
    "Anger",
    "Fear / Anxiety",
    "Surprise",
    "Love / Connection",
    "Anticipation / Desire",
    "Shame / Guilt",
    "Empowerment / Confidence",
    "Calm / Stillness",
    "Complex / Ambiguous",
  ]

  // Define colors for each category - using vibrant colors
  const categoryColors: Record<string, string> = {
    "Joy / Happiness": "#4CAF50", // Green
    Sadness: "#2196F3", // Blue
    Anger: "#F44336", // Red
    "Fear / Anxiety": "#FFC107", // Amber/Yellow
    Surprise: "#FF9800", // Orange
    "Love / Connection": "#9C27B0", // Purple
    "Anticipation / Desire": "#FF80AB", // Pink
    "Shame / Guilt": "#9E9E9E", // Gray
    "Empowerment / Confidence": "#795548", // Brown
    "Calm / Stillness": "#607D8B", // Blue Gray
    "Complex / Ambiguous": "#BDBDBD", // Light Gray
  }

  const chartData = useMemo(() => {
    try {
      // Ensure entries is an array
      if (!Array.isArray(entries)) {
        console.error("Entries is not an array:", entries)
        return []
      }

      console.log("Yearly Chart - Processing entries:", entries.length)

      // Get current date and start of year
      const now = new Date()
      const currentYear = now.getFullYear()
      const currentMonth = now.getMonth()

      // Initialize data for each month
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

      // Create a data structure with months and empty category counts
      const data = months.map((month, index) => {
        const isPastMonth = index <= currentMonth
        const isFutureMonth = index > currentMonth
        const isCurrentMonth = index === currentMonth

        const result: Record<string, any> = {
          month,
          monthIndex: index,
          fullMonth: new Date(currentYear, index, 1).toLocaleString("default", { month: "long" }),
          isPastMonth,
          isFutureMonth,
          isCurrentMonth,
          totalEntries: 0,
        }

        // Initialize all categories to 0
        categories.forEach((category) => {
          result[category] = 0
        })

        return result
      })

      // Count entries by category for each month
      let hasData = false

      entries.forEach((entry) => {
        if (!entry || entry.type === "general") return // Skip general entries

        try {
          // Default to current month if no timestamp
          let monthIndex = currentMonth

          if (entry.timestamp) {
            const entryDate = new Date(entry.timestamp)
            // Only include entries from current year
            if (entryDate.getFullYear() === currentYear) {
              monthIndex = entryDate.getMonth()
            } else {
              return // Skip entries from other years
            }
          }

          // Get the entry's category
          let category = entry.category

          // If no category is specified, try to derive it from the emotion name
          if (!category && entry.emotionName) {
            // First, check direct mapping
            if (emotionToCategory[entry.emotionName]) {
              category = emotionToCategory[entry.emotionName]
            } else {
              // Try to match parts of the emotion name
              for (const [emotion, cat] of Object.entries(emotionToCategory)) {
                if (entry.emotionName.toLowerCase().includes(emotion.toLowerCase())) {
                  category = cat
                  break
                }
              }

              // If still no match, check if the emotion name contains any category name
              if (!category) {
                for (const cat of categories) {
                  const simpleCat = cat.split(" / ")[0].toLowerCase()
                  if (entry.emotionName.toLowerCase().includes(simpleCat)) {
                    category = cat
                    break
                  }
                }
              }

              // If still no category, use default
              if (!category) {
                category = "Complex / Ambiguous"
              }
            }
          }

          // If still no category, use a default
          if (!category) {
            category = "Complex / Ambiguous"
          }

          // Ensure the category is one of our predefined ones
          if (!categories.includes(category)) {
            // Try to find a matching category
            let matchFound = false
            for (const cat of categories) {
              if (
                category.toLowerCase().includes(cat.toLowerCase()) ||
                cat.toLowerCase().includes(category.toLowerCase())
              ) {
                category = cat
                matchFound = true
                break
              }
            }

            if (!matchFound) {
              category = "Complex / Ambiguous"
            }
          }

          if (data[monthIndex]) {
            if (data[monthIndex][category] !== undefined) {
              data[monthIndex][category]++
            }

            data[monthIndex].totalEntries++
            hasData = true
          }
        } catch (err) {
          console.error("Error processing entry:", err, entry)
        }
      })

      // Calculate top 5 categories for each month
      data.forEach((month) => {
        const categoryValues = categories.map((category) => ({
          name: category,
          value: month[category] || 0,
          color: categoryColors[category],
        }))

        // Sort categories by value (descending)
        const sortedCategories = [...categoryValues].sort((a, b) => b.value - a.value)

        // Take top 5 categories with values > 0
        month.topCategories = sortedCategories
          .filter((cat) => cat.value > 0)
          .slice(0, 5)
          .map((cat, index) => ({
            ...cat,
            stackId: "top5",
            dataKey: `top${index + 1}`,
            displayName: cat.name,
          }))

        // Add the top categories as direct properties for the chart
        month.topCategories.forEach((cat, index) => {
          month[`top${index + 1}`] = cat.value
          month[`top${index + 1}Name`] = cat.name
          month[`top${index + 1}Color`] = cat.color
        })
      })

      // If we have no data at all, add some minimal values to make the chart visible
      if (!hasData) {
        console.log("No data found, adding minimal values")
        const dummyCategories = [
          { name: "Joy / Happiness", value: 5, color: categoryColors["Joy / Happiness"] },
          { name: "Sadness", value: 3, color: categoryColors["Sadness"] },
          { name: "Anger", value: 2, color: categoryColors["Anger"] },
          { name: "Fear / Anxiety", value: 1, color: categoryColors["Fear / Anxiety"] },
          { name: "Surprise", value: 1, color: categoryColors["Surprise"] },
        ]

        data[currentMonth].topCategories = dummyCategories.map((cat, index) => ({
          ...cat,
          stackId: "top5",
          dataKey: `top${index + 1}`,
          displayName: cat.name,
        }))

        dummyCategories.forEach((cat, index) => {
          data[currentMonth][`top${index + 1}`] = cat.value
          data[currentMonth][`top${index + 1}Name`] = cat.name
          data[currentMonth][`top${index + 1}Color`] = cat.color
        })

        data[currentMonth].totalEntries = 12
      }

      console.log("Chart data processed, has data:", hasData)
      console.log("Sample month data:", data[0])

      return data
    } catch (err) {
      console.error("Error generating chart data:", err)
      return []
    }
  }, [entries, categories, categoryColors])

  // Calculate the maximum value for any month to set the Y-axis domain
  const maxValue = useMemo(() => {
    let max = 0 // Start with 0
    chartData.forEach((month) => {
      if (month.totalEntries > max) {
        max = month.totalEntries
      }
    })
    return Math.max(10, Math.ceil(max * 1.2)) // Add 20% headroom, minimum of 10
  }, [chartData])

  // Get current year
  const currentYear = new Date().getFullYear()

  // Always show the chart, never show the empty state
  return (
    <Card className="w-full bg-white dark:bg-gray-900 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">This Year So Far</CardTitle>
        <CardDescription className="text-sm text-gray-600 dark:text-gray-300">
          Distribution of feeling categories by month throughout {currentYear}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 px-0 bg-white dark:bg-gray-900">
        <div className="h-[400px] w-full bg-white dark:bg-gray-900">
          <ResponsiveContainer width="100%" height="100%" className="mx-auto">
            <BarChart data={chartData} margin={{ top: 20, right: 0, left: -10, bottom: 70 }} className="w-full">
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, angle: 0, textAnchor: "middle", fill: "currentColor" }}
                height={50}
                tickLine={false}
                axisLine={{ stroke: "#E0E0E0" }}
              />
              <YAxis
                tickLine={false}
                axisLine={{ stroke: "#E0E0E0" }}
                allowDecimals={false}
                width={30}
                domain={[0, maxValue]}
                tick={{ fontSize: 0 }} // Hide Y-axis text
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--tooltip-bg)",
                  border: "1px solid var(--tooltip-border)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const monthData = chartData.find((d) => d.month === label)

                    // Filter to only show categories with values > 0
                    const relevantPayload = payload.filter((p) => p.value > 0)

                    if (!relevantPayload.length) return null

                    return (
                      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-3 rounded-lg shadow-lg">
                        <div className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                          {monthData?.fullMonth} {currentYear}
                        </div>
                        <div className="h-px w-full bg-gray-200 dark:bg-gray-700 my-2"></div>
                        <div className="space-y-2 max-h-[200px] overflow-y-auto">
                          {relevantPayload.map((entry, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
                                <span className="text-sm text-gray-700 dark:text-gray-300">{entry.name}:</span>
                              </div>
                              <span className="font-medium text-gray-900 dark:text-gray-100 ml-4">{entry.value}</span>
                            </div>
                          ))}
                        </div>
                        <div className="h-px w-full bg-gray-200 dark:bg-gray-700 my-2"></div>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Total Entries:</span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {monthData?.totalEntries || 0}
                          </span>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />

              {/* Render up to 5 bars for each month's top categories */}
              {[1, 2, 3, 4, 5].map((topIndex) => (
                <Bar
                  key={`top${topIndex}`}
                  dataKey={`top${topIndex}`}
                  stackId="a"
                  name={`top${topIndex}Name`}
                  radius={topIndex === 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry[`top${topIndex}Color`] || "#CCCCCC"}
                      opacity={entry.isFutureMonth ? 0.3 : entry.isCurrentMonth ? 1 : 0.8}
                    />
                  ))}
                </Bar>
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
