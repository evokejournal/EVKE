"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallButton, setShowInstallButton] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event so it can be triggered later
      setDeferredPrompt(e)
      // Update UI to notify the user they can install the PWA
      setShowInstallButton(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice

    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null)

    // Hide the install button
    setShowInstallButton(false)

    console.log(`User ${outcome === "accepted" ? "accepted" : "dismissed"} the install prompt`)
  }

  if (!showInstallButton) return null

  return (
    <div className="fixed bottom-20 left-0 right-0 flex justify-center z-50 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center gap-3 max-w-md">
        <div className="flex-1">
          <h3 className="font-medium">Install EVOKE</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Add to home screen for quick access</p>
        </div>
        <Button onClick={handleInstallClick} className="bg-primary-600">
          <Download className="h-4 w-4 mr-2" />
          Install
        </Button>
      </div>
    </div>
  )
}
