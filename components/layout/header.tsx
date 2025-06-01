import Link from "next/link"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800/20 z-50 flex items-center px-4">
      <div className="flex flex-col">
        <Link
          href="/home"
          className="text-2xl font-bold text-evoke-purple dark:text-primary-400 font-museoModerno italic tracking-wide"
        >
          EVOKE
        </Link>
        <span className="text-xs text-gray-500 dark:text-gray-400">Flash journaling and mood tracker</span>
      </div>
    </header>
  )
}
