"use client"

import { useState, useEffect } from "react"

interface BalanceGaugeProps {
  balanceScore: number // 0-100 where 0 is challenging, 50 is balanced, 100 is positive
  animate?: boolean
}

export default function BalanceGauge({ balanceScore = 50, animate = true }: BalanceGaugeProps) {
  // Ensure balanceScore is a valid number between 0 and 100
  const validScore = isNaN(balanceScore) ? 50 : Math.max(0, Math.min(100, balanceScore))

  const [currentScore, setCurrentScore] = useState(animate ? 50 : validScore)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    if (animate) {
      const timeout = setTimeout(() => {
        setCurrentScore(validScore)
        // Show tooltip after animation completes
        setTimeout(() => setShowTooltip(true), 500)
      }, 500)
      return () => clearTimeout(timeout)
    } else {
      setShowTooltip(true)
    }
  }, [validScore, animate])

  // Determine the position of the indicator (0-100%)
  const indicatorPosition = `${currentScore}%`

  // Determine the color gradient based on the score
  const getGradientColor = () => {
    if (currentScore < 40) return "from-red-500 via-orange-400 to-yellow-300"
    if (currentScore < 60) return "from-yellow-300 via-green-400 to-blue-300"
    return "from-blue-300 via-indigo-400 to-purple-500"
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full w-full bg-gradient-to-r ${getGradientColor()} transition-all duration-1000 ease-out`}
          style={{ clipPath: `polygon(0 0, ${indicatorPosition} 0, ${indicatorPosition} 100%, 0 100%)` }}
        />

        {/* Indicator with tooltip */}
        <div className="absolute top-0 h-full" style={{ left: indicatorPosition, transform: "translateX(-50%)" }}>
          <div className="h-full w-1 bg-white dark:bg-gray-200 shadow-md dark:shadow-none transition-all duration-1000 ease-out"></div>

          {/* Tooltip */}
          {showTooltip && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-md text-xs font-medium whitespace-nowrap">
              <div className="text-center">
                <span className="font-semibold">Mood Rating:</span> {Math.round(currentScore)}
              </div>
              <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white dark:bg-gray-800"></div>
            </div>
          )}
        </div>

        {/* Labels */}
        <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center px-4 text-xs font-medium">
          <span className="text-gray-700 dark:text-gray-200 z-10">Challenging</span>
          <span className="text-gray-700 dark:text-gray-200 z-10">Balanced</span>
          <span className="text-gray-700 dark:text-gray-200 z-10">Positive</span>
        </div>
      </div>
    </div>
  )
}
