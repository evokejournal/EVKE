"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook, faChartLine, faHistory, faDumbbell, faCog } from "@fortawesome/free-solid-svg-icons"

const navItems = [
  { name: "Journal", href: "/home", icon: faBook },
  { name: "Insights", href: "/insights", icon: faChartLine },
  { name: "History", href: "/history", icon: faHistory },
  { name: "Practice", href: "/practice", icon: faDumbbell },
  { name: "Settings", href: "/settings", icon: faCog },
]

export default function BottomNavigation() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="mx-auto grid h-16 max-w-lg grid-cols-5">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group inline-flex flex-col items-center justify-center px-5 ${
                isActive
                  ? "text-evoke-purple dark:text-primary-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-evoke-purple dark:hover:text-primary-400"
              }`}
            >
              <FontAwesomeIcon
                icon={item.icon}
                className={`mb-1 h-5 w-5 ${isActive ? "text-evoke-purple dark:text-primary-400" : "text-gray-500 dark:text-gray-400 group-hover:text-evoke-purple dark:group-hover:text-primary-400"}`}
              />
              <span className="text-xs">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
