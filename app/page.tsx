import { redirect } from "next/navigation"

export default function Home() {
  // In a real app, you would check auth status server-side
  // For now, we'll just redirect to the auth page
  redirect("/auth")
}
