"use client"

import { useEffect } from "react"

// Extend Window interface to include our custom property
declare global {
  interface Window {
    deferredPrompt: any
  }
}

export function PWAHandler() {
  useEffect(() => {
    // Listen for the beforeinstallprompt event
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Store the event so it can be triggered later
      window.deferredPrompt = e
      console.log("PWA install prompt ready")
    })

    // When the app is installed, clear the prompt
    window.addEventListener("appinstalled", () => {
      // Clear the deferredPrompt
      window.deferredPrompt = null
      console.log("PWA installed")
    })

    // Register service worker
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/worker.js").then(
          (registration) => {
            console.log("Service Worker registration successful with scope: ", registration.scope)
          },
          (err) => {
            console.log("Service Worker registration failed: ", err)
          },
        )
      })
    }
  }, [])

  return null
}
