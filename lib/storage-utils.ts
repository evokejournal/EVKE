import { ref, set, get, remove, push } from "firebase/database"
import { rtdb } from "@/lib/firebase"

// Save data to Firebase Realtime Database
export async function saveToFirebase(userId: string, key: string, data: any): Promise<void> {
  if (!userId) return
  try {
    const dataRef = ref(rtdb, `users/${userId}/insights/${key}`)
    await set(dataRef, {
      ...data,
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error(`Error saving to Firebase (${key}):`, error)
  }
}

// Load data from Firebase Realtime Database
export async function loadFromFirebase<T>(userId: string, key: string, defaultValue: T): Promise<T> {
  if (!userId) return defaultValue
  try {
    const dataRef = ref(rtdb, `users/${userId}/insights/${key}`)
    const snapshot = await get(dataRef)
    if (snapshot.exists()) {
      return snapshot.val() as T
    }
    return defaultValue
  } catch (error) {
    console.error(`Error loading from Firebase (${key}):`, error)
    return defaultValue
  }
}

// Remove data from Firebase Realtime Database
export async function removeFromFirebase(userId: string, key: string): Promise<void> {
  if (!userId) return
  try {
    const dataRef = ref(rtdb, `users/${userId}/insights/${key}`)
    await remove(dataRef)
  } catch (error) {
    console.error(`Error removing from Firebase (${key}):`, error)
  }
}

// Save user preferences to Firebase
export async function saveUserPreference(userId: string, key: string, value: any): Promise<void> {
  if (!userId) return
  try {
    const prefRef = ref(rtdb, `users/${userId}/preferences/${key}`)
    await set(prefRef, value)
  } catch (error) {
    console.error(`Error saving preference to Firebase (${key}):`, error)
  }
}

// Load user preferences from Firebase
export async function loadUserPreference<T>(userId: string, key: string, defaultValue: T): Promise<T> {
  if (!userId) return defaultValue
  try {
    const prefRef = ref(rtdb, `users/${userId}/preferences/${key}`)
    const snapshot = await get(prefRef)
    if (snapshot.exists()) {
      return snapshot.val() as T
    }
    return defaultValue
  } catch (error) {
    console.error(`Error loading preference from Firebase (${key}):`, error)
    return defaultValue
  }
}

// Save analysis to history
export async function saveAnalysisToHistory(userId: string, timeframe: string, data: any): Promise<string | null> {
  if (!userId) return null
  try {
    const historyRef = ref(rtdb, `users/${userId}/analysisHistory`)
    const newEntryRef = push(historyRef)

    await set(newEntryRef, {
      ...data,
      timeframe,
      timestamp: Date.now(),
    })

    return newEntryRef.key
  } catch (error) {
    console.error(`Error saving analysis to history:`, error)
    return null
  }
}

// Get all analysis history
export async function getAnalysisHistory(userId: string): Promise<any[]> {
  if (!userId) return []
  try {
    const historyRef = ref(rtdb, `users/${userId}/analysisHistory`)
    const snapshot = await get(historyRef)

    if (snapshot.exists()) {
      const history: any[] = []
      snapshot.forEach((childSnapshot) => {
        history.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        })
      })
      // Sort by timestamp descending (newest first)
      return history.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
    }
    return []
  } catch (error) {
    console.error(`Error getting analysis history:`, error)
    return []
  }
}

// Delete a specific analysis from history
export async function deleteAnalysisFromHistory(userId: string, analysisId: string): Promise<void> {
  if (!userId) return
  try {
    const analysisRef = ref(rtdb, `users/${userId}/analysisHistory/${analysisId}`)
    await remove(analysisRef)
  } catch (error) {
    console.error(`Error deleting analysis from history:`, error)
  }
}
