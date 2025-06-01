"use server"

export async function testGrokConnection() {
  try {
    console.log("=== Grok 3 Connection Test ===")
    console.log("API Key exists:", !!process.env.GROK_API_KEY)
    console.log("API Key length:", process.env.GROK_API_KEY?.length || 0)

    if (!process.env.GROK_API_KEY) {
      return {
        success: false,
        error: "GROK_API_KEY not found in environment variables",
      }
    }

    // Test with correct Grok 3 model
    console.log("Testing Grok 3 API call...")

    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "grok-3", // Correct Grok 3 model name from xAI docs
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant.",
          },
          {
            role: "user",
            content:
              'Respond with valid JSON: {"message": "Hello from Grok 3!", "status": "working", "model": "grok-3"}',
          },
        ],
        max_tokens: 100,
        temperature: 0.1,
      }),
    })

    console.log("Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.log("Error response:", errorText)

      return {
        success: false,
        error: `API call failed with status ${response.status}`,
        details: errorText,
        status: response.status,
      }
    }

    const data = await response.json()
    console.log("Success response:", data)

    return {
      success: true,
      response: data,
      message: "Grok 3 API connection successful!",
      model: "grok-3",
      usage: data.usage,
    }
  } catch (error) {
    console.error("Grok 3 test error:", error)

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      details: error instanceof Error ? error.stack : undefined,
      type: "fetch_error",
    }
  }
}

// Test using AI SDK with correct Grok 3 model
export async function testGrokWithAISDK() {
  try {
    const { generateText } = await import("ai")
    const { createOpenAI } = await import("@ai-sdk/openai")

    const grok = createOpenAI({
      apiKey: process.env.GROK_API_KEY!,
      baseURL: "https://api.x.ai/v1",
    })

    const result = await generateText({
      model: grok("grok-3"), // Correct Grok 3 model name
      prompt: "Say hello and confirm you are Grok 3. Respond in a friendly way.",
      maxTokens: 50,
    })

    return {
      success: true,
      response: result.text,
      method: "ai-sdk",
      model: "grok-3",
      usage: result.usage,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "AI SDK error",
      method: "ai-sdk",
    }
  }
}
