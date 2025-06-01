import { rtdb } from "@/lib/firebase"
import { ref, set, push, get } from "firebase/database"
import { getQuestionsForEmotion } from "./reflection-questions"

// Define emotions with their specific properties
const testEmotions = [
  // Joy category
  {
    category: "joy",
    emotion: "content",
    balanceRating: 85,
    intensityRating: 70,
    description: "Feeling satisfied and at ease",
    sampleAnswers: [
      "Had a productive day at work and completed all my tasks",
      "Warm feeling in my chest, relaxed shoulders, steady breathing",
      "Took time to appreciate my accomplishments and shared the good news",
      "I feel most content when I complete meaningful tasks and see progress",
    ],
  },
  {
    category: "joy",
    emotion: "cheerful",
    balanceRating: 80,
    intensityRating: 75,
    description: "Feeling bright and positive",
    sampleAnswers: [
      "Spent time with friends over coffee and had great conversations",
      "Light feeling in my chest, natural smile, energetic posture",
      "Shared positive energy with others and planned more social activities",
      "Social connections boost my mood significantly and give me energy",
    ],
  },
  {
    category: "joy",
    emotion: "grateful",
    balanceRating: 90,
    intensityRating: 65,
    description: "Feeling thankful and appreciative",
    sampleAnswers: [
      "Reflected on all the good things in my life and support I have",
      "Warmth in my heart, peaceful breathing, relaxed facial muscles",
      "Wrote in my gratitude journal and called someone to thank them",
      "Gratitude practice helps me maintain perspective during tough times",
    ],
  },
  // Sadness category
  {
    category: "sadness",
    emotion: "disappointed",
    balanceRating: 30,
    intensityRating: 60,
    description: "Feeling let down by unmet expectations",
    sampleAnswers: [
      "Plans fell through at the last minute and I was really looking forward to them",
      "Heaviness in my chest, slumped shoulders, low energy",
      "Allowed myself to feel the disappointment, then made alternative plans",
      "I need to be more flexible with my expectations and have backup plans",
    ],
  },
  {
    category: "sadness",
    emotion: "lonely",
    balanceRating: 25,
    intensityRating: 70,
    description: "Feeling isolated and disconnected",
    sampleAnswers: [
      "Spent the evening alone while others were busy with their own lives",
      "Emptiness in my chest, low energy, feeling disconnected from others",
      "Reached out to a friend for connection and planned to meet up soon",
      "I need to be more proactive about maintaining relationships and reaching out",
    ],
  },
  // Anger category
  {
    category: "anger",
    emotion: "frustrated",
    balanceRating: 35,
    intensityRating: 65,
    description: "Feeling blocked from achieving goals",
    sampleAnswers: [
      "Technology issues prevented me from finishing important work on deadline",
      "Tension in my jaw, clenched fists, tight shoulders",
      "Took a break and came back with fresh perspective, asked for help",
      "Stepping away often helps me solve problems better than forcing it",
    ],
  },
  {
    category: "anger",
    emotion: "annoyed",
    balanceRating: 40,
    intensityRating: 50,
    description: "Feeling mildly irritated",
    sampleAnswers: [
      "Loud construction noise during my focus time disrupted my concentration",
      "Tightness in my shoulders, shallow breathing, clenched jaw",
      "Used noise-canceling headphones and moved to a quieter space",
      "Small irritations are easier to manage with the right tools and preparation",
    ],
  },
  // Fear category
  {
    category: "fear",
    emotion: "anxious",
    balanceRating: 30,
    intensityRating: 75,
    description: "Feeling worried about future outcomes",
    sampleAnswers: [
      "Upcoming important presentation that could affect my career",
      "Butterflies in stomach, racing thoughts, difficulty concentrating",
      "Practiced deep breathing and prepared thoroughly for the presentation",
      "Preparation helps reduce anxiety but doesn't eliminate it completely",
    ],
  },
  {
    category: "fear",
    emotion: "worried",
    balanceRating: 35,
    intensityRating: 60,
    description: "Feeling concerned about potential problems",
    sampleAnswers: [
      "Waiting for important test results that could change everything",
      "Tight chest, difficulty concentrating, restless energy",
      "Distracted myself with positive activities and talked to supportive friends",
      "Worry doesn't change outcomes, but taking action and seeking support helps",
    ],
  },
  // Calm category
  {
    category: "calm",
    emotion: "peaceful",
    balanceRating: 85,
    intensityRating: 40,
    description: "Feeling tranquil and undisturbed",
    sampleAnswers: [
      "Morning meditation session in my quiet space before the day began",
      "Slow breathing, relaxed muscles throughout my body, clear mind",
      "Carried this feeling into my day by taking mindful pauses",
      "Regular meditation practice creates lasting peace that I can access anytime",
    ],
  },
  {
    category: "calm",
    emotion: "relaxed",
    balanceRating: 80,
    intensityRating: 35,
    description: "Feeling free from tension",
    sampleAnswers: [
      "Took a warm bath after a long, stressful day at work",
      "Loose limbs, easy breathing, no tension in my body",
      "Enjoyed the moment without rushing to the next task",
      "Self-care rituals are essential for my wellbeing and help me reset",
    ],
  },
  // Love category
  {
    category: "love",
    emotion: "affectionate",
    balanceRating: 85,
    intensityRating: 70,
    description: "Feeling warm and caring toward others",
    sampleAnswers: [
      "Quality time with my partner, sharing stories and being present together",
      "Warm feeling in chest, relaxed posture, gentle smile",
      "Expressed my feelings verbally and through physical touch",
      "Expressing love strengthens my relationships and makes me feel more connected",
    ],
  },
  // Empowerment category
  {
    category: "empowerment",
    emotion: "confident",
    balanceRating: 80,
    intensityRating: 75,
    description: "Feeling self-assured and capable",
    sampleAnswers: [
      "Successfully completed a challenging project that I wasn't sure I could handle",
      "Straight posture, steady voice, feeling of inner strength",
      "Took on another challenging task and shared my success with others",
      "Success builds confidence for future challenges and reminds me of my capabilities",
    ],
  },
]

// Function to generate incremental test data (7 days at a time)
export async function generateIncrementalTestData(userId: string): Promise<{ count: number; daysBack: number }> {
  if (!userId) {
    throw new Error("User ID is required")
  }

  try {
    // Get existing entries to determine how many days back we should start
    const entriesRef = ref(rtdb, `users/${userId}/entries`)
    const snapshot = await get(entriesRef)

    let existingDates: string[] = []
    if (snapshot.exists()) {
      const entries = snapshot.val()
      existingDates = Object.values(entries).map((entry: any) => {
        const date = new Date(entry.timestamp)
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
      })
    }

    // Find the earliest date we should start from
    let daysBack = 0
    const today = new Date()

    // Check each day going backwards to find where to start
    for (let i = 0; i < 365; i++) {
      // Check up to a year back
      const checkDate = new Date(today)
      checkDate.setDate(checkDate.getDate() - i)
      const dateKey = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, "0")}-${String(checkDate.getDate()).padStart(2, "0")}`

      if (!existingDates.includes(dateKey)) {
        daysBack = i
        break
      }
    }

    // Generate 7 entries starting from daysBack
    const entriesToGenerate = 7
    let entriesCreated = 0

    for (let i = 0; i < entriesToGenerate; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - (daysBack + i))

      // Random hour between 8am and 9pm
      const hour = Math.floor(Math.random() * 13) + 8
      date.setHours(hour, Math.floor(Math.random() * 60), 0, 0)

      // Select random emotion
      const randomEmotion = testEmotions[Math.floor(Math.random() * testEmotions.length)]

      // Get the actual reflection questions for this emotion
      const questions = getQuestionsForEmotion(randomEmotion.category, randomEmotion.emotion)

      // Create entry reference
      const newEntryRef = push(entriesRef)

      // Create entry data that matches exactly what a real entry would have
      const entryData = {
        id: newEntryRef.key,
        timestamp: date.getTime(),
        date: date.toISOString(),
        category: randomEmotion.category,
        emotion: randomEmotion.emotion,
        intensityRating: randomEmotion.intensityRating,
        balanceRating: randomEmotion.balanceRating,
        description: randomEmotion.description,
        reflectionAnswers: randomEmotion.sampleAnswers,
        questions: questions,
        createdAt: Date.now(),
        type: "emotion",
      }

      // Save entry
      await set(newEntryRef, entryData)
      entriesCreated++
    }

    return { count: entriesCreated, daysBack: daysBack + entriesToGenerate - 1 }
  } catch (error) {
    console.error("Error generating incremental test data:", error)
    throw error
  }
}

// Function to delete all user data
export async function deleteAllUserData(userId: string): Promise<void> {
  if (!userId) {
    throw new Error("User ID is required")
  }

  try {
    // Delete entries
    const entriesRef = ref(rtdb, `users/${userId}/entries`)
    await set(entriesRef, null)

    console.log("Successfully deleted user entries")
    return
  } catch (error) {
    console.error("Error in deleteAllUserData:", error)
    throw error
  }
}
