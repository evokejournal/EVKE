// Define the emotion metadata type
export interface EmotionMetadata {
  balanceRating: number // 0-100 scale (0=challenging, 50=neutral, 100=positive)
  intensityRating: number // 0-100 scale (0=not intense, 100=extremely intense)
  insightTags: [string, string] // Two short insight tags
  category: string
  color: string
}

// This will be used to store the complete emotion data
export interface EmotionWithMetadata extends EmotionMetadata {
  name: string
  path: string
  icon: any
  slug?: string
}
