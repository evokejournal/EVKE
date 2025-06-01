import DynamicEmotionContent from './content'

// Define all possible emotions for each category
const emotionsMap = {
  joy: ["content", "cheerful", "excited", "proud", "grateful", "inspired"],
  sadness: ["disappointed", "lonely", "grief", "hopeless", "regretful"],
  anger: ["frustrated", "irritated", "resentful", "outraged", "vengeful"],
  fear: ["worried", "nervous", "scared", "terrified", "helpless"],
  surprise: ["amazed", "confused", "startled", "shocked", "overwhelmed"],
  love: ["caring", "affectionate", "romantic", "compassionate", "connected"],
  anticipation: ["eager", "hopeful", "anxious", "determined", "motivated"],
  shame: ["embarrassed", "guilty", "remorseful", "inadequate", "humiliated"],
  empowerment: ["confident", "proud", "strong", "capable", "independent"],
  calm: ["peaceful", "relaxed", "content", "serene", "mindful"],
  complex: ["bittersweet", "nostalgic", "conflicted", "uncertain", "ambivalent"]
}

export function generateStaticParams() {
  const params: { category: string; emotion: string }[] = []
  Object.entries(emotionsMap).forEach(([category, emotions]) => {
    emotions.forEach(emotion => {
      params.push({
        category: category,
        emotion: emotion
      })
    })
  })
  return params
}

interface PageProps {
  params: {
    category: string;
    emotion: string;
  }
}

export default function Page({ params }: PageProps) {
  if (!params?.category || !params?.emotion) {
    return <div>Loading...</div>
  }
  
  return <DynamicEmotionContent params={params} />
}
