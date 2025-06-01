"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, ReferenceLine, Tooltip } from "recharts"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBalanceScale } from "@fortawesome/free-solid-svg-icons"

interface WeeklyRhythmChartProps {
  entries: any[]
}

export default function WeeklyRhythmChart({ entries = [] }: WeeklyRhythmChartProps) {
  const chartData = useMemo(() => {
    try {
      // Ensure entries is an array
      if (!Array.isArray(entries)) {
        console.error("Entries is not an array:", entries)
        return []
      }

      // Get current date and start of week (Monday)
      const now = new Date()
      const dayOfWeek = now.getDay()
      // Adjust to make Monday the first day (1 = Monday, 0 = Sunday)
      const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
      const startOfWeek = new Date(now)
      startOfWeek.setDate(now.getDate() - daysFromMonday)

      // Initialize data for each day of the week (Monday to Sunday)
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      const data = []

      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek)
        date.setDate(startOfWeek.getDate() + i)
        const isToday = date.toDateString() === now.toDateString()

        data.push({
          day: days[i],
          shortDay: days[i].substring(0, 3),
          date: date.toISOString().split("T")[0],
          formattedDate: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          entries: 0,
          balance: 50, // Default to neutral
          intensity: 50, // Default to medium
          totalBalance: 0,
          totalIntensity: 0,
          isToday: isToday,
        })
      }

      // Process entries and calculate average balance and intensity for each day
      entries.forEach((entry) => {
        if (!entry || !entry.timestamp || entry.type === "general") return

        try {
          const entryDate = new Date(entry.timestamp)
          const dateStr = entryDate.toISOString().split("T")[0]

          // Find the day that matches this entry's date
          const dayIndex = data.findIndex((d) => d.date === dateStr)
          if (dayIndex !== -1) {
            data[dayIndex].entries++
            data[dayIndex].totalBalance += entry.balanceRating || 50
            data[dayIndex].totalIntensity += entry.intensityRating || 50
          }
        } catch (err) {
          console.error("Error processing entry:", err, entry)
        }
      })

      // Calculate average balance and intensity
      data.forEach((day) => {
        if (day.entries > 0) {
          day.balance = Math.round(day.totalBalance / day.entries)
          day.intensity = Math.round(day.totalIntensity / day.entries)
        }
      })

      return data
    } catch (err) {
      console.error("Error generating chart data:", err)
      return []
    }
  }, [entries])

  // If we have no data, show a message
  if (!chartData || chartData.length === 0) {
    return (
      <Card className="w-full bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle>Weekly Rhythm</CardTitle>
          <CardDescription>No data available for this week</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center bg-white dark:bg-gray-900">
          <p className="text-gray-500 dark:text-gray-400">Start tracking your emotions to see insights here</p>
        </CardContent>
      </Card>
    )
  }

  // Find today's index for the reference line
  const todayIndex = chartData.findIndex((day) => day.isToday)

  // Define colors
  const balanceLineColor = "#87CEFA" // Baby blue color
  const intensityLineColor = "#9C27B0" // Purple color

  return (
    <Card className="w-full bg-white dark:bg-gray-900 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          Weekly Rhythm
          <FontAwesomeIcon icon={faBalanceScale} className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 dark:text-gray-300">
          Your patterns throughout the week
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 bg-white dark:bg-gray-900">
        <div className="h-[350px] w-full bg-white dark:bg-gray-900">
          <ResponsiveContainer width="100%" height="100%" className="mx-auto">
            <LineChart data={chartData} margin={{ top: 20, right: 0, left: -10, bottom: 20 }} className="w-full">
              <defs>
                <rect id="chartBackground" width="100%" height="100%" fill="transparent" />
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis
                dataKey="shortDay"
                tick={{ fontSize: 12, fill: "currentColor" }}
                tickLine={false}
                axisLine={{ stroke: "#E0E0E0" }}
                tickMargin={10}
              />
              <YAxis
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                tickLine={false}
                axisLine={{ stroke: "#E0E0E0" }}
                tick={{ fontSize: 0 }} // Hide Y-axis text
                width={10} // Reduce Y-axis width
              />
              {/* Add horizontal reference line at "Med" (50) */}
              <ReferenceLine y={50} stroke="#E0E0E0" strokeDasharray="3 3" strokeWidth={1} />
              {todayIndex !== -1 && (
                <ReferenceLine
                  x={chartData[todayIndex].shortDay}
                  stroke="#8884d8"
                  strokeWidth={2}
                  strokeDasharray="3 3"
                />
              )}
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--tooltip-bg)",
                  border: "1px solid var(--tooltip-border)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const dayData = chartData.find((d) => d.shortDay === label)
                    return (
                      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-3 rounded-lg shadow-lg">
                        <div className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                          <span>{dayData?.day}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                            {dayData?.formattedDate}
                          </span>
                        </div>
                        <div className="h-px w-full bg-gray-200 dark:bg-gray-700 my-2"></div>
                        <div className="space-y-2">
                          {payload.map((entry, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div
                                  className="w-2 h-2 rounded-full mr-2"
                                  style={{
                                    backgroundColor:
                                      entry.dataKey === "balance" ? balanceLineColor : intensityLineColor,
                                  }}
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">{entry.name}:</span>
                              </div>
                              <span className="font-medium text-gray-900 dark:text-gray-100">{entry.value}</span>
                            </div>
                          ))}
                          <div className="flex items-center justify-between pt-1 border-t border-gray-200 dark:border-gray-700 mt-1">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Entries:</span>
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {dayData?.entries || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type="monotone"
                dataKey="balance"
                name="Balance"
                stroke={balanceLineColor}
                strokeWidth={4}
                dot={{ fill: balanceLineColor, r: 3 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="intensity"
                name="Intensity"
                stroke={intensityLineColor}
                strokeWidth={4}
                dot={{ fill: intensityLineColor, r: 3 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
