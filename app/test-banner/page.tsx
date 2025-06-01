import Header from "@/components/layout/header"
import { DownloadAppBanner } from "@/components/auth/download-app-banner"

export default function TestBannerPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="pt-16">
        <DownloadAppBanner />
      </div>
      <div className="p-8 mt-4">
        <h1 className="text-2xl font-bold mb-4">Banner Test Page</h1>
        <p className="mb-4">
          This page is for testing the download app banner. You should see the purple-to-teal gradient banner below the
          header.
        </p>
        <p>
          If you don't see the banner, there might be an issue with the implementation. Check the console for any
          errors.
        </p>
      </div>
    </div>
  )
}
