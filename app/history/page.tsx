"use client"

import { useState, useEffect } from "react"
import AppLayout from "@/components/layout/app-layout"
import Calendar from "@/components/mood/calendar"
import EntryCard from "@/components/mood/entry-card"
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
import { getMoodEntries, getEntriesByDateMap } from "@/lib/realtime-db"

// Add these imports and functions to handle edit and delete actions
import { useRouter } from "next/navigation"
import { deleteMoodEntry } from "@/lib/realtime-db"

// Map emotion categories to their icons and colors
const emotionIcons: Record<string, any> = {
  "Joy / Happiness": { icon: faSmile, color: "#4CAF50" },
  Sadness: { icon: faSadTear, color: "#2196F3" },
  Anger: { icon: faAngry, color: "#F44336" },
  "Fear / Anxiety": { icon: faFaceFrown, color: "#FFC107" },
  Surprise: { icon: faSurprise, color: "#FF9800" },
  "Love / Connection": { icon: faHeart, color: "#9C27B0" },
  "Anticipation / Desire": { icon: faFire, color: "#FF80AB" },
  "Shame / Guilt": { icon: faMask, color: "#9E9E9E" },
  "Empowerment / Confidence": { icon: faPerson, color: "#795548" },
  "Calm / Stillness": { icon: faWater, color: "#607D8B" },
  "Complex / Ambiguous": { icon: faCodeBranch, color: "#BDBDBD" },
}

// Define the reflection questions for each emotion
const reflectionQuestions = {
  default: [
    { id: "feeling", text: "How does this emotion feel in your body?" },
    { id: "trigger", text: "What triggered this emotion?" },
    { id: "response", text: "How did you respond to this emotion?" },
  ],
}

export default function HistoryPage() {
  const [entries, setEntries] = useState<any[]>([])
  const [entriesByDate, setEntriesByDate] = useState<Record<string, any[]>>({})
  const [selectedDateEntries, setSelectedDateEntries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true)

        // Get all entries
        const allEntries = await getMoodEntries()
        setEntries(allEntries)

        // Group entries by date
        const groupedEntries = await getEntriesByDateMap()
        setEntriesByDate(groupedEntries)
      } catch (error) {
        console.error("Error fetching entries:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEntries()
  }, [])

  const handleSelectDate = (date: Date) => {
    const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
    setSelectedDateEntries(entriesByDate[dateKey] || [])
  }

  // Add these handler functions
  const handleEditEntry = (id: string) => {
    // For now, just log the action - we'll implement editing later
    console.log(`Edit entry with ID: ${id}`)
    // In a real implementation, you would navigate to an edit page
    // router.push(`/edit-entry/${id}`)
  }

  const handleDeleteEntry = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        await deleteMoodEntry(id)

        // Update the UI by removing the deleted entry
        const updatedEntries = entries.filter((entry) => entry.id !== id)
        setEntries(updatedEntries)

        // Update the selected date entries
        const updatedSelectedEntries = selectedDateEntries.filter((entry) => entry.id !== id)
        setSelectedDateEntries(updatedSelectedEntries)

        // Update the entries by date map
        const updatedEntriesByDate = { ...entriesByDate }
        Object.keys(updatedEntriesByDate).forEach((dateKey) => {
          updatedEntriesByDate[dateKey] = updatedEntriesByDate[dateKey].filter((entry) => entry.id !== id)
          if (updatedEntriesByDate[dateKey].length === 0) {
            delete updatedEntriesByDate[dateKey]
          }
        })
        setEntriesByDate(updatedEntriesByDate)
      } catch (error) {
        console.error("Error deleting entry:", error)
        alert("Failed to delete entry. Please try again.")
      }
    }
  }

  // Update the return statement to include the new handlers
  return (
    <AppLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-evoke-purple mb-6">Your Mood History</h1>

        <Calendar entries={entriesByDate} onSelectDate={handleSelectDate} />

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-evoke-purple"></div>
          </div>
        ) : selectedDateEntries.length > 0 ? (
          <div>
            <h2 className="text-lg font-medium mb-4 text-evoke-purple">Entries on this day</h2>
            {selectedDateEntries.map((entry) => (
              <EntryCard
                key={entry.id}
                id={entry.id}
                emotionName={entry.emotionName}
                emotionCategory={entry.emotionCategory}
                emotionIcon={emotionIcons[entry.emotionCategory]?.icon || faSmile}
                emotionColor={entry.emotionColor}
                timestamp={new Date(entry.timestamp)}
                answers={entry.answers}
                questions={reflectionQuestions.default}
                onEdit={handleEditEntry}
                onDelete={handleDeleteEntry}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-600">
            {entries.length > 0
              ? "Select a date to view entries"
              : "No entries yet. Start tracking your moods to see them here."}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
