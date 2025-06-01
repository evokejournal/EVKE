"use server"

import { generateMoodAnalysis } from "@/lib/grok-service"

export async function getMoodAnalysis(entries: any[], timeframe: "week" | "month" | "year") {
  try {
    console.log("Server action: getMoodAnalysis called")
    console.log("Entries received:", entries.length)
    console.log("Timeframe:", timeframe)
    console.log("Sample entry structure:", JSON.stringify(entries[0], null, 2))

    if (!entries || entries.length === 0) {
      return {
        success: false,
        error: "No mood entries available for analysis",
      }
    }

    const analysis = await generateMoodAnalysis({
      entries,
      timeframe,
      userId: "current-user", // You can replace this with actual user ID
    })

    console.log("Analysis completed successfully")
    console.log("Recommended exercises:", analysis.recommendedExercises?.map((e) => e.title).join(", "))

    return {
      success: true,
      data: analysis,
    }
  } catch (error) {
    console.error("Server action error:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      entriesLength: entries?.length || 0,
      sampleEntry: entries?.[0] ? Object.keys(entries[0]) : "No entries",
    })

    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate mood analysis",
    }
  }
}
