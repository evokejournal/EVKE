import { ref, set, push, get, remove, update, query, orderByChild, limitToLast } from "firebase/database"
import { rtdb, auth } from "./firebase"
import { getEmotionMetadata } from "@/data/emotion-metadata"

// Get the current user ID with better error handling
const getCurrentUserId = () => {
  const userId = auth.currentUser?.uid
  if (!userId) {
    throw new Error("User not authenticated")
  }
  return userId
}

// Save a mood entry
export const saveMoodEntry = async (entry: any) => {
  try {
    const userId = getCurrentUserId()

    // Create a reference to the user's entries
    const entriesRef = ref(rtdb, `users/${userId}/entries`)

    // Generate a new entry with a unique key
    const newEntryRef = push(entriesRef)

    // Get metadata if not already included
    if (!entry.balanceRating || !entry.intensityRating || !entry.insightTags) {
      const metadata = getEmotionMetadata(entry.emotionName)
      if (metadata) {
        entry.balanceRating = metadata.balanceRating
        entry.intensityRating = metadata.intensityRating
        entry.insightTags = metadata.insightTags
      }
    }

    // Prepare the entry data (without non-serializable properties like icons)
    const entryData = {
      ...entry,
      id: newEntryRef.key,
      timestamp: entry.timestamp || Date.now(),
      createdAt: Date.now(),
      type: "emotion", // Add type to distinguish from general entries
    }

    // Save the entry
    await set(newEntryRef, entryData)
    return entryData
  } catch (error) {
    console.error("Error saving mood entry:", error)
    throw error
  }
}

// Save a general journal entry
export const saveGeneralEntry = async (entry: any) => {
  try {
    const userId = getCurrentUserId()

    // Create a reference to the user's entries
    const entriesRef = ref(rtdb, `users/${userId}/entries`)

    // Generate a new entry with a unique key
    const newEntryRef = push(entriesRef)

    // Prepare the entry data
    const entryData = {
      ...entry,
      id: newEntryRef.key,
      timestamp: entry.timestamp || Date.now(),
      createdAt: Date.now(),
      type: "general", // Mark as general entry
    }

    // Save the entry
    await set(newEntryRef, entryData)
    return entryData
  } catch (error) {
    console.error("Error saving general entry:", error)
    throw error
  }
}

// Get all entries for the current user
export const getMoodEntries = async () => {
  try {
    const userId = getCurrentUserId()

    const entriesRef = ref(rtdb, `users/${userId}/entries`)
    const snapshot = await get(entriesRef)

    if (!snapshot.exists()) return []

    // Convert the snapshot to an array of entries
    const entries: any[] = []
    snapshot.forEach((childSnapshot) => {
      entries.push({
        id: childSnapshot.key,
        ...childSnapshot.val(),
      })
    })

    // Sort by timestamp (newest first)
    return entries.sort((a, b) => b.timestamp - a.timestamp)
  } catch (error) {
    console.error("Error getting mood entries:", error)
    throw error
  }
}

// Get only emotion entries (for insights)
export const getEmotionEntries = async () => {
  try {
    const allEntries = await getMoodEntries()
    return allEntries.filter((entry) => entry.type !== "general")
  } catch (error) {
    console.error("Error getting emotion entries:", error)
    throw error
  }
}

// Get recent entries (limited number)
export const getRecentEntries = async (limit = 5) => {
  try {
    const userId = getCurrentUserId()

    const entriesRef = query(ref(rtdb, `users/${userId}/entries`), orderByChild("timestamp"), limitToLast(limit))

    const snapshot = await get(entriesRef)

    if (!snapshot.exists()) return []

    const entries: any[] = []
    snapshot.forEach((childSnapshot) => {
      entries.push({
        id: childSnapshot.key,
        ...childSnapshot.val(),
      })
    })

    // Sort by timestamp (newest first)
    return entries.sort((a, b) => b.timestamp - a.timestamp)
  } catch (error) {
    console.error("Error getting recent entries:", error)
    throw error
  }
}

// Get entries for a specific date
export const getEntriesByDate = async (date: Date) => {
  try {
    const entries = await getMoodEntries()

    // Filter entries by date
    return entries.filter((entry) => {
      const entryDate = new Date(entry.timestamp)
      return (
        entryDate.getFullYear() === date.getFullYear() &&
        entryDate.getMonth() === date.getMonth() &&
        entryDate.getDate() === date.getDate()
      )
    })
  } catch (error) {
    console.error("Error getting entries by date:", error)
    throw error
  }
}

// Update an entry
export const updateMoodEntry = async (entryId: string, updates: any) => {
  try {
    const userId = getCurrentUserId()

    const entryRef = ref(rtdb, `users/${userId}/entries/${entryId}`)
    await update(entryRef, updates)
  } catch (error) {
    console.error("Error updating mood entry:", error)
    throw error
  }
}

// Delete an entry
export const deleteMoodEntry = async (entryId: string) => {
  try {
    const userId = getCurrentUserId()

    const entryRef = ref(rtdb, `users/${userId}/entries/${entryId}`)
    await remove(entryRef)
  } catch (error) {
    console.error("Error deleting mood entry:", error)
    throw error
  }
}

// Group entries by date for calendar view
export const getEntriesByDateMap = async () => {
  try {
    const entries = await getMoodEntries()

    // Group entries by date
    const entriesByDate: Record<string, any[]> = {}

    entries.forEach((entry) => {
      const date = new Date(entry.timestamp)
      const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`

      if (!entriesByDate[dateKey]) {
        entriesByDate[dateKey] = []
      }

      entriesByDate[dateKey].push(entry)
    })

    return entriesByDate
  } catch (error) {
    console.error("Error getting entries by date map:", error)
    throw error
  }
}
