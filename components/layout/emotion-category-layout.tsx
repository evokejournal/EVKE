"use client"

import type { ReactNode } from "react"
import AppLayout from "./app-layout"

interface EmotionCategoryLayoutProps {
  children: ReactNode
  title: string
  color: string
}

export default function EmotionCategoryLayout({ children, title, color }: EmotionCategoryLayoutProps) {
  return (
    <AppLayout>
      <div className="pt-4 px-4 pb-20">
        <h2 className="text-xl font-bold mb-6 dark:text-primary-400" style={{ color }}>
          {title}
        </h2>
        {children}
      </div>
    </AppLayout>
  )
}
