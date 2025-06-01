"use client"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"

interface CalendarProps {
  entries: Record<string, any[]>
  onSelectDate: (date: Date) => void
}

export default function Calendar({ entries, onSelectDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Helper functions for calendar
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const formatDateKey = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    onSelectDate(date)
  }

  // Generate calendar days
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  const days = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null)
  }

  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i))
  }

  // Get month name
  const monthName = currentMonth.toLocaleString("default", { month: "long" })

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 mb-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <FontAwesomeIcon icon={faChevronLeft} className="h-4 w-4 text-evoke-purple" />
        </button>
        <h2 className="text-lg font-medium text-evoke-purple">
          {monthName} {year}
        </h2>
        <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4 text-evoke-purple" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-xs font-medium text-gray-700 dark:text-gray-300">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} className="h-10"></div>
          }

          const dateKey = formatDateKey(day)
          const hasEntries = entries[dateKey] && entries[dateKey].length > 0
          const isSelected =
            selectedDate &&
            day.getDate() === selectedDate.getDate() &&
            day.getMonth() === selectedDate.getMonth() &&
            day.getFullYear() === selectedDate.getFullYear()

          return (
            <div
              key={dateKey}
              className={`h-10 flex flex-col items-center justify-center rounded-full cursor-pointer relative border ${
                isSelected
                  ? "bg-evoke-purple text-white border-evoke-purple"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700"
              }`}
              onClick={() => handleDateClick(day)}
            >
              <span className="text-sm">{day.getDate()}</span>
              {hasEntries && !isSelected && (
                <div className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-evoke-purple"></div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
