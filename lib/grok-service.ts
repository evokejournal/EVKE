import { generateText } from "ai"
import { createOpenAI } from "@ai-sdk/openai"
import { cbtExercises, type CBTExercise } from "@/data/cbt-exercises"

export interface MoodAnalysisRequest {
  entries: any[]
  timeframe: "week" | "month" | "year"
  userId: string
}

export interface MoodAnalysisResponse {
  insights: string
  patterns: string[]
  recommendations: string[]
  emotionalTrends: string
  balanceAssessment: string
  visualMetaphors: string[]
  moodWeather: string
  energyFlow: string
  colorPalette: string[]
  personalGrowth: string
  recommendedExercises: CBTExercise[]
}

// Grok provider with correct configuration
const grokProvider = createOpenAI({
  apiKey: process.env.GROK_API_KEY!,
  baseURL: "https://api.x.ai/v1",
})

export async function generateMoodAnalysis({
  entries,
  timeframe,
  userId,
}: MoodAnalysisRequest): Promise<MoodAnalysisResponse> {
  try {
    console.log(`Starting ${timeframe} mood analysis with Grok 3...`)
    console.log("API Key exists:", !!process.env.GROK_API_KEY)
    console.log("Raw entries received:", JSON.stringify(entries.slice(0, 3), null, 2))

    if (!process.env.GROK_API_KEY) {
      throw new Error("GROK_API_KEY environment variable is not set")
    }

    if (!entries || entries.length === 0) {
      throw new Error("No entries provided for analysis")
    }

    // More flexible emotion extraction - handle different possible structures
    const processedEntries = entries.map((entry) => {
      // Try different possible emotion field names and structures
      let emotion = null

      if (entry.emotion) {
        emotion = entry.emotion
      } else if (entry.selectedEmotion) {
        emotion = entry.selectedEmotion
      } else if (entry.mood) {
        emotion = entry.mood
      } else if (entry.feeling) {
        emotion = entry.feeling
      } else if (entry.emotionCategory) {
        emotion = entry.emotionCategory
      }

      // If no direct emotion field, try to extract from nested objects
      if (!emotion && entry.data) {
        emotion = entry.data.emotion || entry.data.selectedEmotion || entry.data.mood
      }

      return {
        ...entry,
        emotion: emotion,
        originalEntry: entry,
      }
    })

    console.log("Processed entries sample:", JSON.stringify(processedEntries.slice(0, 3), null, 2))

    // Filter out entries without valid emotions
    const validEntries = processedEntries.filter((entry) => {
      const hasValidEmotion =
        entry.emotion &&
        typeof entry.emotion === "string" &&
        entry.emotion.trim() !== "" &&
        entry.emotion.toLowerCase() !== "unknown" &&
        entry.emotion.toLowerCase() !== "null" &&
        entry.emotion.toLowerCase() !== "undefined"

      if (!hasValidEmotion) {
        console.log("Filtered out entry:", {
          emotion: entry.emotion,
          originalKeys: Object.keys(entry.originalEntry),
        })
      }

      return hasValidEmotion
    })

    console.log(`Valid entries found: ${validEntries.length} out of ${entries.length}`)

    if (validEntries.length === 0) {
      console.log("No valid emotions found. Sample entry structure:", JSON.stringify(entries[0], null, 2))
      throw new Error(
        `No valid emotions found in entries. Sample entry keys: ${Object.keys(entries[0] || {}).join(", ")}`,
      )
    }

    // Prepare comprehensive data for analysis
    const emotionSummary = validEntries.slice(0, 20).map((entry) => ({
      feeling: entry.emotion,
      category: entry.category || entry.emotionCategory || "general",
      intensity: entry.intensityRating || entry.intensity || 5,
      date: entry.timestamp
        ? new Date(entry.timestamp).toLocaleDateString()
        : entry.createdAt
          ? new Date(entry.createdAt).toLocaleDateString()
          : entry.date
            ? new Date(entry.date).toLocaleDateString()
            : "recent",
      dayOfWeek: entry.timestamp
        ? new Date(entry.timestamp).toLocaleDateString("en-US", { weekday: "long" })
        : entry.createdAt
          ? new Date(entry.createdAt).toLocaleDateString("en-US", { weekday: "long" })
          : "unknown",
      triggers: entry.triggers || [],
      bodyResponse: entry.bodyResponse || entry.physicalSensations || "",
      actionsTaken: entry.actionsTaken || entry.copingStrategies || "",
      insights: entry.insights || entry.reflection || "",
    }))

    console.log("Emotion summary for analysis:", JSON.stringify(emotionSummary.slice(0, 3), null, 2))

    // Get available CBT exercises for recommendations with more detailed information
    const availableExercises = cbtExercises.map((exercise) => ({
      id: exercise.id,
      title: exercise.title,
      category: exercise.category,
      difficulty: exercise.difficulty,
      targetEmotions: exercise.targetEmotions || [],
      description: exercise.description,
      benefits: exercise.benefits || [],
    }))

    // Create timeframe-specific prompts with improved exercise recommendation guidance
    const timeframePrompts = {
      week: `You are a professional wellness analyst and CBT specialist. Analyze this WEEKLY mood data and provide insights, then recommend specific CBT exercises.

Mood Data:
${JSON.stringify(emotionSummary, null, 2)}

Available CBT Exercises:
${JSON.stringify(availableExercises, null, 2)}

Based on the mood patterns, recommend 3 SPECIFIC and DIVERSE CBT exercises by their IDs that would be most helpful. Consider:
1. The user's emotional patterns and intensity levels
2. Variety in exercise categories (mindfulness, cognitive restructuring, behavioral activation, etc.)
3. Different difficulty levels to provide a balanced approach
4. Exercises that specifically target the emotions present in the data
5. A mix of short-term coping and long-term skill building

IMPORTANT: Choose exercises that are DIFFERENT from each other and address different aspects of the user's emotional patterns.

Respond with ONLY valid JSON in this exact format (no additional text, no markdown):
{
  "insights": "4-5 sentences about weekly patterns using you/your",
  "patterns": ["pattern 1", "pattern 2", "pattern 3"],
  "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3"],
  "emotionalTrends": "3-4 sentences about weekly progression",
  "balanceAssessment": "2-3 sentences about weekly stability",
  "visualMetaphors": ["metaphor 1", "metaphor 2", "metaphor 3"],
  "moodWeather": "Simple weather description",
  "energyFlow": "Energy pattern description",
  "colorPalette": ["#4F46E5", "#06B6D4", "#10B981"],
  "personalGrowth": "Growth observation",
  "recommendedExerciseIds": ["exercise-id-1", "exercise-id-2", "exercise-id-3"]
}`,

      month: `You are a professional wellness analyst and CBT specialist. Analyze this MONTHLY mood data and provide insights, then recommend specific CBT exercises.

Mood Data:
${JSON.stringify(emotionSummary, null, 2)}

Available CBT Exercises:
${JSON.stringify(availableExercises, null, 2)}

Based on the mood patterns, recommend 4 SPECIFIC and DIVERSE CBT exercises by their IDs that would be most helpful. Consider:
1. The user's emotional patterns and intensity levels
2. Variety in exercise categories (mindfulness, cognitive restructuring, behavioral activation, etc.)
3. Different difficulty levels to provide a balanced approach
4. Exercises that specifically target the emotions present in the data
5. A mix of short-term coping and long-term skill building

IMPORTANT: Choose exercises that are DIFFERENT from each other and address different aspects of the user's emotional patterns.

Respond with ONLY valid JSON in this exact format (no additional text, no markdown):
{
  "insights": "5-6 sentences about monthly patterns using you/your",
  "patterns": ["pattern 1", "pattern 2", "pattern 3", "pattern 4"],
  "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3", "recommendation 4"],
  "emotionalTrends": "4-5 sentences about monthly progression",
  "balanceAssessment": "3-4 sentences about monthly stability",
  "visualMetaphors": ["metaphor 1", "metaphor 2", "metaphor 3", "metaphor 4"],
  "moodWeather": "Monthly climate description",
  "energyFlow": "Monthly energy description",
  "colorPalette": ["#8B5CF6", "#F59E0B", "#EF4444", "#10B981"],
  "personalGrowth": "Monthly growth observation",
  "recommendedExerciseIds": ["exercise-id-1", "exercise-id-2", "exercise-id-3", "exercise-id-4"]
}`,

      year: `You are a professional wellness analyst and CBT specialist. Analyze this YEARLY mood data and provide insights, then recommend specific CBT exercises.

Mood Data:
${JSON.stringify(emotionSummary, null, 2)}

Available CBT Exercises:
${JSON.stringify(availableExercises, null, 2)}

Based on the mood patterns, recommend 5 SPECIFIC and DIVERSE CBT exercises by their IDs that would be most helpful. Consider:
1. The user's emotional patterns and intensity levels
2. Variety in exercise categories (mindfulness, cognitive restructuring, behavioral activation, etc.)
3. Different difficulty levels to provide a balanced approach
4. Exercises that specifically target the emotions present in the data
5. A mix of short-term coping and long-term skill building

IMPORTANT: Choose exercises that are DIFFERENT from each other and address different aspects of the user's emotional patterns.

Respond with ONLY valid JSON in this exact format (no additional text, no markdown):
{
  "insights": "6-7 sentences about yearly patterns using you/your",
  "patterns": ["pattern 1", "pattern 2", "pattern 3", "pattern 4", "pattern 5"],
  "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3", "recommendation 4", "recommendation 5"],
  "emotionalTrends": "5-6 sentences about yearly progression",
  "balanceAssessment": "4-5 sentences about yearly development",
  "visualMetaphors": ["metaphor 1", "metaphor 2", "metaphor 3", "metaphor 4", "metaphor 5"],
  "moodWeather": "Annual climate description",
  "energyFlow": "Yearly energy evolution",
  "colorPalette": ["#6366F1", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981"],
  "personalGrowth": "Yearly development insight",
  "recommendedExerciseIds": ["exercise-id-1", "exercise-id-2", "exercise-id-3", "exercise-id-4", "exercise-id-5"]
}`,
    }

    console.log(`Calling Grok 3 API for ${timeframe} analysis...`)

    const result = await generateText({
      model: grokProvider("grok-3"),
      prompt: timeframePrompts[timeframe],
      temperature: 0.7,
      maxTokens: 2000,
    })

    console.log("Grok 3 response received:", result.text.substring(0, 200))

    // More robust JSON parsing
    let responseText = result.text.trim()

    // Remove any markdown formatting
    responseText = responseText.replace(/```json\s*/g, "").replace(/\s*```/g, "")

    // Find the JSON object
    const jsonStart = responseText.indexOf("{")
    const jsonEnd = responseText.lastIndexOf("}") + 1

    if (jsonStart === -1 || jsonEnd === 0) {
      throw new Error("No valid JSON found in Grok response")
    }

    let jsonString = responseText.substring(jsonStart, jsonEnd)

    // Clean up common JSON issues
    jsonString = jsonString
      .replace(/,\s*}/g, "}") // Remove trailing commas
      .replace(/,\s*]/g, "]") // Remove trailing commas in arrays
      .replace(/\n/g, " ") // Replace newlines with spaces
      .replace(/\r/g, "") // Remove carriage returns
      .replace(/\t/g, " ") // Replace tabs with spaces
      .replace(/\s+/g, " ") // Normalize whitespace

    console.log("Cleaned JSON:", jsonString.substring(0, 200))

    let analysis: any
    try {
      analysis = JSON.parse(jsonString)
    } catch (parseError) {
      console.error("JSON parse error:", parseError)
      console.log("Failed JSON string:", jsonString)
      throw new Error("Failed to parse Grok response JSON")
    }

    // Get recommended exercises based on IDs with fallback to emotion-based if needed
    const recommendedExerciseIds = analysis.recommendedExerciseIds || []

    // Get exercises by IDs
    const recommendedExercises = recommendedExerciseIds
      .map((id: string) => cbtExercises.find((exercise) => exercise.id === id))
      .filter(Boolean) as CBTExercise[]

    // If we don't have enough recommendations, add some based on emotions
    if (recommendedExercises.length < 3) {
      console.log("Not enough exercise recommendations, adding emotion-based recommendations")
      const emotions = validEntries.map((entry) => entry.emotion).filter(Boolean)
      const emotionBasedExercises = cbtExercises.filter(
        (exercise) =>
          exercise.targetEmotions?.some((emotion) => emotions.includes(emotion)) &&
          !recommendedExercises.some((rec) => rec.id === exercise.id),
      )

      // Add emotion-based exercises until we have at least 3
      while (recommendedExercises.length < 3 && emotionBasedExercises.length > 0) {
        const randomIndex = Math.floor(Math.random() * emotionBasedExercises.length)
        recommendedExercises.push(emotionBasedExercises[randomIndex])
        emotionBasedExercises.splice(randomIndex, 1)
      }
    }

    console.log("Final recommended exercises:", recommendedExercises.map((e) => e.title).join(", "))

    // Validate and return structured response
    return {
      insights: analysis.insights || "Analysis insights not available",
      patterns: Array.isArray(analysis.patterns) ? analysis.patterns : ["Pattern analysis not available"],
      recommendations: Array.isArray(analysis.recommendations)
        ? analysis.recommendations
        : ["Recommendations not available"],
      emotionalTrends: analysis.emotionalTrends || "Emotional trends analysis not available",
      balanceAssessment: analysis.balanceAssessment || "Balance assessment not available",
      visualMetaphors: Array.isArray(analysis.visualMetaphors)
        ? analysis.visualMetaphors
        : ["Visual metaphors not available"],
      moodWeather: analysis.moodWeather || "Mood weather analysis not available",
      energyFlow: analysis.energyFlow || "Energy flow analysis not available",
      colorPalette: Array.isArray(analysis.colorPalette) ? analysis.colorPalette : ["#4F46E5", "#06B6D4", "#10B981"],
      personalGrowth: analysis.personalGrowth || "Personal growth analysis not available",
      recommendedExercises,
    }
  } catch (error) {
    console.error("Grok 3 analysis error:", error)
    throw error
  }
}

export async function generatePersonalizedRecommendations(entries: any[], currentMood: string): Promise<string[]> {
  try {
    if (!process.env.GROK_API_KEY || !entries.length) {
      return [
        "Take a moment to breathe deeply and center yourself in the present",
        "Practice gratitude by noting three positive things from your recent experience",
        "Consider what you need most right now for your wellbeing",
      ]
    }

    // Filter valid emotions
    const validEntries = entries.filter(
      (entry) => entry.emotion && entry.emotion !== "unknown" && entry.emotion.trim() !== "",
    )

    const recentFeelings = validEntries.slice(0, 5).map((entry) => entry.emotion)

    const prompt = `Based on recent feelings: ${recentFeelings.join(", ")} and current mood: ${currentMood}

Respond with ONLY a valid JSON array (no additional text):
["practical recommendation 1", "practical recommendation 2", "practical recommendation 3"]`

    const result = await generateText({
      model: grokProvider("grok-3"),
      prompt,
      temperature: 0.6,
      maxTokens: 300,
    })

    let responseText = result.text.trim()
    responseText = responseText.replace(/```json\s*/g, "").replace(/\s*```/g, "")

    const arrayStart = responseText.indexOf("[")
    const arrayEnd = responseText.lastIndexOf("]") + 1

    if (arrayStart !== -1 && arrayEnd > arrayStart) {
      const arrayString = responseText.substring(arrayStart, arrayEnd)
      try {
        const recommendations = JSON.parse(arrayString)
        if (Array.isArray(recommendations)) {
          return recommendations
        }
      } catch (parseError) {
        console.error("Recommendations parse error:", parseError)
      }
    }

    throw new Error("Invalid response format")
  } catch (error) {
    console.error("Error generating recommendations:", error)
    return [
      "Take a few minutes for mindful breathing and gentle self-reflection",
      "Write down one thing you're grateful for and one thing you're looking forward to",
      "Do something nurturing for yourself that brings comfort and peace",
    ]
  }
}
