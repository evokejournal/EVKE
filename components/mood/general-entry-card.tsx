import type React from "react"

interface GeneralEntryCardProps {
  title: string
  content: string
  date?: string
}

const GeneralEntryCard: React.FC<GeneralEntryCardProps> = ({ title, content, date }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/30 overflow-hidden mb-4">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{title}</h3>
        {date && <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{date}</p>}
        <p className="text-gray-700 dark:text-gray-300">{content}</p>
      </div>
    </div>
  )
}

export default GeneralEntryCard
