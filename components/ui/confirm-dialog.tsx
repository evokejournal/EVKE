"use client"

import { Modal } from "./modal"

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: "default" | "danger"
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  const confirmButtonClass =
    variant === "danger"
      ? "px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
      : "px-4 py-2 rounded-md bg-evoke-purple text-white hover:bg-purple-700 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-evoke-purple transition-colors"

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      actions={
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-evoke-purple transition-colors"
          >
            {cancelText}
          </button>
          <button onClick={handleConfirm} className={confirmButtonClass}>
            {confirmText}
          </button>
        </div>
      }
    >
      <p className="text-gray-700 dark:text-gray-300">{message}</p>
    </Modal>
  )
}
