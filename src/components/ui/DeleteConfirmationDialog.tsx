import { motion } from 'framer-motion'
import { useEffect } from 'react'

interface DeleteConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const DeleteConfirmationDialog = ({ isOpen, onClose, onConfirm }: DeleteConfirmationDialogProps) => {
  if (!isOpen) return null

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onConfirm()
      } else if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onConfirm, onClose])

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-[#1A1A1A] rounded-lg p-6 max-w-md w-full mx-4 shadow-xl border border-white/10 z-[101]"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Delete Chat</h3>
        <p className="text-white/70 mb-6">
          Are you sure you want to delete this chat? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default DeleteConfirmationDialog 