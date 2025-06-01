"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { CategoryType } from "@/data/cbt-exercises"
import { getAllCategoriesWithInfo } from "@/data/cbt-exercises"

interface CategoryFilterProps {
  categories: CategoryType[]
  selectedCategory: CategoryType | "all"
  onCategoryChange: (category: CategoryType | "all") => void
}

export default function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const categoriesWithInfo = getAllCategoriesWithInfo()

  return (
    <div className="mb-6 bg-white dark:bg-gray-900">
      <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filter by Category</h2>
      <div className="flex flex-wrap gap-2">
        <button
          className={`px-3 py-1.5 text-sm rounded-2xl transition-colors flex items-center ${
            selectedCategory === "all"
              ? "bg-evoke-purple text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
          onClick={() => onCategoryChange("all")}
        >
          All Categories
        </button>

        {categoriesWithInfo.map((categoryInfo) => (
          <button
            key={categoryInfo.name}
            className={`px-3 py-1.5 text-sm rounded-2xl transition-colors flex items-center gap-1.5 ${
              selectedCategory === categoryInfo.name ? "text-white" : "text-gray-700 hover:bg-opacity-80"
            }`}
            style={{
              backgroundColor: selectedCategory === categoryInfo.name ? categoryInfo.color : categoryInfo.bgColor,
              color: selectedCategory === categoryInfo.name ? "white" : categoryInfo.color,
              borderWidth: "1px",
              borderColor: categoryInfo.borderColor,
            }}
            onClick={() => onCategoryChange(categoryInfo.name)}
          >
            <FontAwesomeIcon icon={categoryInfo.icon} className="h-3.5 w-3.5" />
            <span>{categoryInfo.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
