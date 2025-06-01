"use client"

import { useState, useEffect } from "react"
import { Download, Info } from "lucide-react"

// Extend Window interface to include our custom property
declare global {
  interface Window {
    deferredPrompt: any
  }
}

export function DownloadAppBanner() {
  const [installable, setInstallable] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [showIOSInstructions, setShowIOSInstructions] = useState(false)

  useEffect(() => {
    // Check if we're on iOS
    const checkIsIOS = () => {
      const ua = window.navigator.userAgent
      const isIOS = /iPhone|iPad|iPod/.test(ua) && !window.MSStream
      setIsIOS(isIOS)
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Store the event so it can be triggered later
      window.deferredPrompt = e
      // Update UI to notify the user they can install the PWA
      setInstallable(true)
      console.log("PWA is installable")
    }

    checkIsIOS()

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // Clean up
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (isIOS) {
      // For iOS, show instructions
      setShowIOSInstructions(!showIOSInstructions)
    } else if (window.deferredPrompt) {
      // For Android and other platforms that support the install prompt
      try {
        // Show the install prompt
        const promptEvent = window.deferredPrompt
        promptEvent.prompt()

        // Wait for the user to respond to the prompt
        const choiceResult = await promptEvent.userChoice

        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt")
        } else {
          console.log("User dismissed the install prompt")
        }

        // Clear the saved prompt since it can't be used again
        window.deferredPrompt = null
        setInstallable(false)
      } catch (err) {
        console.error("Error installing PWA:", err)
        alert("There was an error installing the app. Please try again or install manually from your browser menu.")
      }
    } else {
      // Fallback for browsers that don't support installation or if the app is already installed
      alert("To install EVOKE: tap the browser menu (⋮) and select 'Add to Home Screen' or 'Install App'")
    }
  }

  return (
    <div className="w-full bg-gradient-to-l from-evoke-purple to-teal-500 text-white py-3 px-4 flex flex-col z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Download className="h-5 w-5 mr-2" />
          <p className="text-sm font-medium">Install the EVOKE app</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleInstallClick}
            className="text-xs bg-white text-evoke-purple px-3 py-1 rounded-full font-medium hover:bg-opacity-90 transition-colors"
          >
            {isIOS ? "How to Install" : "Install Now"}
          </button>
        </div>
      </div>

      {/* iOS Instructions */}
      {isIOS && showIOSInstructions && (
        <div className="mt-2 p-2 bg-white bg-opacity-10 rounded-md text-xs">
          <div className="flex items-start mb-1">
            <Info className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
            <p>To install on iOS:</p>
          </div>
          <ol className="list-decimal pl-5 space-y-1">
            <li>
              Tap the Share button{" "}
              <span className="inline-block w-5 h-5 text-center leading-5 bg-gray-200 text-gray-800 rounded-md">⬆</span>{" "}
              at the bottom of the screen
            </li>
            <li>Scroll down and tap "Add to Home Screen"</li>
            <li>Tap "Add" in the top right corner</li>
          </ol>
        </div>
      )}
    </div>
  )
}
